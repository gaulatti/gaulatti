import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishedProjects, projectPath } from '../app/data/projects.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const client = path.join(root, 'build/client');
const output = path.join(root, 'build/static-pages');
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
const paths = [];
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name === 'index.html') {
      const route = '/' + path.relative(client, directory).split(path.sep).join('/');
      paths.push(route);
      if (route !== '/') {
        // Separate path depths: S3 permits both "portfolio" and
        // "portfolio/colombo" as keys, while a filesystem does not.
        const depth = route.split('/').filter(Boolean).length;
        const target = path.join(output, String(depth), route.slice(1));
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.copyFile(file, target);
      }
    }
  }
}
await walk(client);
for (const project of publishedProjects()) {
  if (!paths.includes(projectPath(project))) throw new Error('Missing pre-rendered project: ' + project.id);
}
const xml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await fs.writeFile(
  path.join(client, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths
      .sort()
      .map((route) => '<url><loc>' + xml('https://gaulatti.com' + route) + '</loc></url>')
      .join('\n') +
    '\n</urlset>\n'
);
console.log('Prepared ' + paths.length + ' static pages. Publish build/static-pages as text/html after build/client.');
