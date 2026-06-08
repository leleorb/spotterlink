import sharp from "sharp";

const src = "C:\\Users\\leleo\\Downloads\\image (1).png";
const out = "C:\\Users\\leleo\\Documents\\spotter\\public\\spotter-logo.png";

const img = sharp(src);
const meta = await img.metadata();
console.log("source:", meta.width + "x" + meta.height, "channels:", meta.channels);

// Recorta as bordas transparentes para o tridente preencher o quadro
const cropped = await sharp(src)
  .trim({ threshold: 10 })
  .toBuffer();

const cropMeta = await sharp(cropped).metadata();
console.log("cropped:", cropMeta.width + "x" + cropMeta.height);

// Padroniza num quadrado com pequena margem, fundo transparente
const size = Math.max(cropMeta.width, cropMeta.height);
const pad = Math.round(size * 0.06);
await sharp(cropped)
  .extend({
    top: pad, bottom: pad, left: pad, right: pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(out);

console.log("saved:", out);
