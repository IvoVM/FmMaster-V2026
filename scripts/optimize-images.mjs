import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  carouselFiles,
  mediaSlug,
  slidePaths,
  team,
  teamPhoto,
} from "../src/data/library.js";

const root = path.resolve(import.meta.dirname, "..");
const source = path.resolve(root, "..", "Fm-master", "src", "assets", "images");
const publicDir = path.join(root, "public");

const SLIDE_W = 1600;
const SLIDE_H = 900;

function diskPath(urlPath) {
  return path.join(publicDir, urlPath.replace(/^\//, ""));
}

async function readOriented(file) {
  return sharp(file, { failOn: "none" }).rotate().toBuffer();
}

async function blurredCover(buffer) {
  const pipeline = sharp(buffer).resize(SLIDE_W, SLIDE_H, {
    fit: "cover",
    position: "attention",
  });

  try {
    return await pipeline
      .blur(28)
      .modulate({ brightness: 0.58, saturation: 1.12 })
      .toBuffer();
  } catch {
    return sharp(buffer)
      .resize(SLIDE_W, SLIDE_H, { fit: "cover", position: "centre" })
      .blur(28)
      .modulate({ brightness: 0.58, saturation: 1.12 })
      .toBuffer();
  }
}

async function makeSlide(input, output) {
  const original = await readOriented(input);
  const foreground = await sharp(original)
    .resize(SLIDE_W - 48, SLIDE_H - 48, { fit: "inside" })
    .toBuffer();
  const fg = await sharp(foreground).metadata();
  const background = await blurredCover(original);
  const tint = await sharp({
    create: {
      width: SLIDE_W,
      height: SLIDE_H,
      channels: 4,
      background: { r: 233, g: 49, b: 115, alpha: 0.38 },
    },
  })
    .png()
    .toBuffer();

  const left = Math.round((SLIDE_W - fg.width) / 2);
  const top = Math.round((SLIDE_H - fg.height) / 2);

  await sharp(background)
    .composite([
      { input: tint, blend: "over" },
      { input: foreground, left, top },
    ])
    .webp({ quality: 76, effort: 4 })
    .toFile(output);
}

async function main() {
  const carouselDir = path.join(publicDir, "media", "carousel");
  const teamDir = path.join(publicDir, "media", "team");
  const brandDir = path.join(publicDir, "media", "brand");
  await mkdir(carouselDir, { recursive: true });
  await mkdir(teamDir, { recursive: true });
  await mkdir(brandDir, { recursive: true });

  for (const [index, file] of carouselFiles.entries()) {
    const input = path.join(source, "carousel", file);
    const { src, thumb } = slidePaths(index);
    const slidePath = diskPath(src);
    const thumbPath = diskPath(thumb);
    await makeSlide(input, slidePath);
    await sharp(slidePath).resize(360, 202, { fit: "cover" }).webp({ quality: 66 }).toFile(thumbPath);
    const stat = await sharp(slidePath).metadata();
    console.log(`slide ${file} → ${path.basename(slidePath)} ${stat.width}x${stat.height}`);
  }

  for (const person of team) {
    const input = path.join(source, "TeamCards", person.file);
    const output = diskPath(teamPhoto(person.file));
    await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output);
    console.log(`team  ${person.file} → ${mediaSlug(person.file)}.webp`);
  }

  await sharp(path.join(source, "grupo-master-logo.jpeg"))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(brandDir, "grupo-master.webp"));

  await copyFile(
    path.join(source, "semanario-logo.png"),
    path.join(brandDir, "semanario.png"),
  );

  console.log("Listo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
