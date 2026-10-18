import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';
import { lightColors, fontFamilies } from '@gaulatti/bleecker/tokens';
import { projectPath } from '../app/data/projects.ts';
import { writePublicCatalog } from './public-catalog.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
if (!GlobalFonts.registerFromPath(path.join(root, 'assets/fonts/EncodeSans.ttf'), fontFamilies.primary)) {
  throw new Error('The bundled Encode Sans font could not be loaded.');
}
const logo = await loadImage(path.join(root, 'public/icons/gaulatti.svg'));
const output = path.join(root, 'public/og/projects');
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

function lines(context, text, maxWidth) {
  const result = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? line + ' ' + word : word;
    if (line && context.measureText(next).width > maxWidth) {
      result.push(line);
      line = word;
    } else line = next;
  }
  if (line) result.push(line);
  return result;
}

const catalog = await writePublicCatalog();
for (const project of catalog) {
  const canvas = createCanvas(1200, 630);
  const context = canvas.getContext('2d');
  context.fillStyle = lightColors.lightSand;
  context.fillRect(0, 0, 1200, 630);
  context.fillStyle = lightColors.desert;
  context.fillRect(0, 0, 12, 630);
  context.drawImage(logo, 72, 55, 45, 58);
  context.fillStyle = lightColors.textSecondary;
  context.font = '500 20px "' + fontFamilies.primary + '"';
  context.fillText('JAVIER GODOY / ENGINEERING', 143, 91);
  context.strokeStyle = lightColors.sand;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(72, 147);
  context.lineTo(1128, 147);
  context.stroke();
  context.fillStyle = lightColors.deepSea;
  context.font = '500 76px "' + fontFamilies.primary + '"';
  const titleLines = lines(context, project.name, 1050);
  if (titleLines.length > 2) throw new Error(project.id + ': project name exceeds the social-card layout.');
  titleLines.forEach((line, index) => context.fillText(line, 72, 250 + index * 83));
  const subtitleY = titleLines.length > 1 ? 390 : 320;
  context.font = '400 33px "' + fontFamilies.primary + '"';
  context.fillStyle = lightColors.sea;
  context.fillText(project.subtitle, 72, subtitleY);
  context.font = '400 25px "' + fontFamilies.primary + '"';
  context.fillStyle = lightColors.textSecondary;
  const summaryLines = lines(context, project.summary, 1040);
  if (summaryLines.length > 3) throw new Error(project.id + ': summary exceeds the social-card layout.');
  summaryLines.forEach((line, index) => context.fillText(line, 72, subtitleY + 59 + index * 38));
  context.strokeStyle = lightColors.sand;
  context.beginPath();
  context.moveTo(72, 542);
  context.lineTo(1128, 542);
  context.stroke();
  context.font = '400 21px "' + fontFamilies.primary + '"';
  context.fillStyle = lightColors.deepSea;
  context.fillText('gaulatti.com' + projectPath(project), 72, 589);
  await fs.writeFile(path.join(output, project.id + '.png'), canvas.toBuffer('image/png'));
}
const quote = (value) => '"' + value.replaceAll('"', '""') + '"';
await fs.writeFile(
  path.join(root, 'public/project-links.csv'),
  'Project,URL\n' +
    catalog.map((project) => quote(project.name) + ',' + quote('https://gaulatti.com' + projectPath(project))).join('\n') +
    '\n'
);
console.log('Generated ' + catalog.length + ' project preview images and project-links.csv.');
