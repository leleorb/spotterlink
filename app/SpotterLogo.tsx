/* eslint-disable @next/next/no-img-element */

// Logo oficial do Spotter — imagem real do usuário (tridente).
// A arte original é branca; no tema claro renderizamos em quase-preto via filtro.
// Passe `tone="light"` para mantê-la branca sobre fundos escuros/coloridos.
export function SpotterLogo({ size = 32, tone = "dark" }: { size?: number; tone?: "dark" | "light" }) {
  // brightness(0) -> preto puro; o leve realce devolve o cinza-tinta Apple (#1d1d1f).
  const darkFilter = "brightness(0) saturate(100%) invert(9%) sepia(6%) saturate(700%) hue-rotate(190deg)";
  return (
    <img
      src="/spotter-logo.png"
      width={size}
      height={size}
      alt="Spotter"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        filter: tone === "dark" ? darkFilter : undefined,
      }}
    />
  );
}
