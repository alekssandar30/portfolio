// Derives favicon.ico and apple-touch-icon.png from public/favicon.svg. Run: `pnpm icons`.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const svg = await readFile(path.join(pub, "favicon.svg"));
const render = (size) => sharp(svg, { density: 72 * (size / 64) * 4 }).resize(size, size).png().toBuffer();

await sharp(await render(180)).flatten({ background: "#0d110d" }).png({ compressionLevel: 9 })
  .toFile(path.join(pub, "apple-touch-icon.png"));

// ICO container holding PNG-encoded images (supported by every current browser).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(render));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
const dir = Buffer.alloc(16 * images.length);
let offset = header.length + dir.length;
images.forEach((img, i) => {
  const e = i * 16;
  dir.writeUInt8(sizes[i], e);
  dir.writeUInt8(sizes[i], e + 1);
  dir.writeUInt8(0, e + 2);
  dir.writeUInt8(0, e + 3);
  dir.writeUInt16LE(1, e + 4);
  dir.writeUInt16LE(32, e + 6);
  dir.writeUInt32LE(img.length, e + 8);
  dir.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
await writeFile(path.join(pub, "favicon.ico"), Buffer.concat([header, dir, ...images]));
console.log("wrote favicon.ico, apple-touch-icon.png");
