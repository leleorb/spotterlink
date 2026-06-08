import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetMuscle = searchParams.get("muscle");
  const equipment = searchParams.get("equipment");
  const search = searchParams.get("search");

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error("RAPIDAPI_KEY is not set in environment variables");
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const options: RequestInit = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    let url = "https://exercisedb.p.rapidapi.com/exercises";

    if (search) {
      // Search by exercise name — use limit param
      url = `https://exercisedb.p.rapidapi.com/exercises/name/${search.toLowerCase()}?limit=50`;
    } else if (targetMuscle) {
      // Filter by target muscle
      url = `https://exercisedb.p.rapidapi.com/exercises/target/${targetMuscle.toLowerCase()}?limit=50`;
    } else if (equipment) {
      // Filter by equipment
      url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment.toLowerCase()}?limit=50`;
    }

    console.log("Fetching from ExerciseDB:", url);
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ExerciseDB API error ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `ExerciseDB API error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`ExerciseDB returned ${Array.isArray(data) ? data.length : 0} exercises`);

    // Return exercises with full detail (instructions, description, muscles)
    const exercises = Array.isArray(data) ? data : [];
    const formatted = exercises.map((ex: any) => ({
      id: ex.id,
      name: ex.name,
      target: ex.target,
      equipment: ex.equipment,
      bodyPart: ex.bodyPart,
      gifUrl: ex.gifUrl,
      instructions: Array.isArray(ex.instructions) ? ex.instructions : [],
      description: ex.description ?? "",
      secondaryMuscles: Array.isArray(ex.secondaryMuscles) ? ex.secondaryMuscles : [],
      difficulty: ex.difficulty ?? "",
      category: ex.category ?? "",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("ExerciseDB fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercises", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
