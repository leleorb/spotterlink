/* eslint-disable @next/next/no-img-element */

// Logo oficial do Spotter — imagem real do usuário (tridente).
// A arte original é branca.
// tone="auto" (padrão): escura no modo claro, branca no modo escuro (via CSS + data-theme).
// tone="light": sempre branca (para fundos escuros fixos, ex: footer).
// tone="dark": sempre escura (via filtro CSS).
export function SpotterLogo({ size = 32, tone = "auto" }: { size?: number; tone?: "auto" | "dark" | "light" }) {
  const darkFilter = "brightness(0) saturate(100%) invert(9%) sepia(6%) saturate(700%) hue-rotate(190deg)";
  return (
    <img
      src="/spotter-logo.png"
      width={size}
      height={size}
      alt="Spotter"
      className={tone === "auto" ? "spotter-logo-auto" : undefined}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        filter: tone === "dark" ? darkFilter : tone === "light" ? "none" : "var(--spotter-logo-filter)",
      }}
    />
  );
}
