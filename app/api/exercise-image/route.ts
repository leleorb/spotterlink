import { NextRequest, NextResponse } from "next/server";

// Proxies a single exercise GIF from ExerciseDB so the API key stays server-side.
// Called on demand (only when a user opens the exercise detail), keeping
// the 50 req/day free quota under control.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const resolution = searchParams.get("resolution") || "360";

  if (!id) {
    return NextResponse.json({ error: "Missing exercise id" }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${encodeURIComponent(
    id
  )}&resolution=${encodeURIComponent(resolution)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    });

    const contentType = response.headers.get("content-type") || "";

    // If ExerciseDB returns an image, stream the bytes back to the browser.
    if (response.ok && contentType.startsWith("image")) {
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          // Cache for a day on the client — the GIF for an id never changes.
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });
    }

    // Not an image (error JSON, plan limit, wrong id): report so the
    // <img> onError fallback can show the icon instead.
    const text = await response.text();
    console.error(`exercise-image ${response.status} for id=${id}:`, text.slice(0, 200));
    return NextResponse.json(
      { error: "Image not available", status: response.status },
      { status: 404 }
    );
  } catch (error) {
    console.error("exercise-image fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
