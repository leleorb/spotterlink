/* eslint-disable @next/next/no-img-element */

// Logo oficial do Spotter — imagem real do usuário (tridente).
// Recortada das margens transparentes em /public/spotter-logo.png.
export function SpotterLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/spotter-logo.png"
      width={size}
      height={size}
      alt="Spotter"
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}
