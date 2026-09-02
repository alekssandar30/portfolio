// Renders scripts/og/card.html to public/og.png (1200x630) with system Chrome.
// Run after changing the card: `pnpm og`. Requires Google Chrome installed.
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const card = path.join(here, "card.html");
const out = path.resolve(here, "../../public/og.png");

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(card).href);
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();

await sharp(png).png({ compressionLevel: 9, palette: true }).toFile(out);
console.log("wrote", out);
