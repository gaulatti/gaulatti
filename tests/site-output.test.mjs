import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { publishedProjects, projectPath, PUBLIC_REPOSITORIES } from '../app/data/projects.ts';

const client = path.resolve('build/client');
const catalog = publishedProjects();
const meta = (html, property) => (html.match(/<meta\b[^>]*>/g) ?? []).filter((tag) => tag.includes('property="' + property + '"'));

for (const project of catalog) {
  test(project.name + ': the initial HTML is ready for a link-preview crawler', async () => {
    const route = projectPath(project);
    const html = await fs.readFile(path.join(client, route, 'index.html'), 'utf8');
    assert.ok(html.includes('<h1>' + project.name + '</h1>'), 'project heading must exist without JavaScript');
    assert.ok(html.includes('Engineering decisions'));
    assert.ok(html.includes('Where it stands'));
    assert.ok(!html.includes('Copy project link'));
    const resources = html.match(/<section class="project-intro-meta" aria-label="Project resources">([\s\S]*?)<\/section>/)?.[1];
    assert.ok(resources, 'project resources must be visible in the introduction');
    for (const link of project.links)
      assert.ok(resources.includes('href="' + link.href + '"'), 'missing introductory resource: ' + link.href);
    if (project.repository) assert.ok(resources.includes(project.repository), 'the repository name must be readable');
    if (project.visibility === 'private')
      assert.ok(!resources.includes('href='), 'private projects must not acquire public source or demo links');
    assert.ok(html.includes('<h2>Evidence and outcomes</h2>'));
    if (project.story.study.workflow) assert.ok(html.includes('<h2>Architecture and workflow</h2>'));
    for (const reference of project.story.study.references) assert.ok(html.includes('href="' + reference.href + '"'));
    assert.equal(meta(html, 'og:title').length, 1);
    assert.equal(meta(html, 'og:description').length, 1);
    assert.equal(meta(html, 'og:url').length, 1);
    assert.ok(meta(html, 'og:url')[0].includes('https://gaulatti.com' + route));
    assert.ok(meta(html, 'og:image')[0].includes('/og/projects/' + project.id + '.png'));
    const canonical = (html.match(/<link\b[^>]*>/g) ?? []).filter((tag) => tag.includes('rel="canonical"'));
    assert.equal(canonical.length, 1);
    assert.ok(canonical[0].includes('https://gaulatti.com' + route));
    const object = await fs.readFile(path.resolve('build/static-pages/2', route.slice(1)), 'utf8');
    assert.equal(object, html, 'the canonical S3 object must contain the same project-specific HTML');
    const png = await fs.readFile(path.join(client, 'og/projects', project.id + '.png'));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    const allowed = new Set(PUBLIC_REPOSITORIES.map((name) => 'https://github.com/' + name));
    for (const [, href] of html.matchAll(/href="(https:\/\/github\.com\/gaulatti\/[^"#?]+)"/g)) {
      const repositoryUrl = new URL(href).origin + '/' + new URL(href).pathname.split('/').slice(1, 3).join('/');
      assert.ok(allowed.has(repositoryUrl), 'unapproved repository link: ' + href);
    }
  });
}

test('the résumé contains the corrected employment and degree status before JavaScript', async () => {
  const html = await fs.readFile(path.join(client, 'journey/index.html'), 'utf8');
  assert.ok(html.includes('Medsender'));
  assert.ok(html.includes('LLM Gateway'));
  assert.ok(html.includes('MCP services'));
  assert.ok(html.includes('Jun 2025 – Mar 2026'));
  assert.ok(!html.includes('Senior Software Engineer II'));
  assert.ok(!html.includes('Tecla'));
  assert.ok(!html.includes('IdoSoft'));
  assert.ok(!html.includes('Acting GM'));
  assert.ok(html.includes('Degree conferral pending'));
  assert.ok(html.includes('CompTIA Project+'));
  assert.ok(html.includes('Feb 2017 – Jan 2023'));
  assert.equal(await fs.readFile('build/static-pages/1/journey', 'utf8'), html);
});

test('the index, sitemap, and LinkedIn link export cover every approved project', async () => {
  const index = await fs.readFile(path.join(client, 'portfolio/index.html'), 'utf8');
  const sitemap = await fs.readFile(path.join(client, 'sitemap.xml'), 'utf8');
  const csv = await fs.readFile(path.join(client, 'project-links.csv'), 'utf8');
  for (const project of catalog) {
    assert.ok(index.includes('href="' + projectPath(project) + '"'));
    assert.ok(sitemap.includes('https://gaulatti.com' + projectPath(project)));
    assert.ok(csv.includes('https://gaulatti.com' + projectPath(project)));
  }
  assert.equal(await fs.readFile('build/static-pages/1/portfolio', 'utf8'), index);
});

test('Medsender uses a vector asset rather than a raster image inside SVG', async () => {
  const svg = await fs.readFile(path.join(client, 'icons/medsender.svg'), 'utf8');
  assert.ok(svg.includes('<path'));
  assert.ok(!svg.includes('<image'));
  assert.ok(!svg.includes('base64'));
  assert.ok(svg.includes('Medsender'));
});

test('the actual production preview serves project HTML for direct links', { timeout: 30000 }, async (context) => {
  const pkg = JSON.parse(await fs.readFile('package.json', 'utf8'));
  const servePkg = JSON.parse(await fs.readFile('node_modules/serve/package.json', 'utf8'));
  const command = pkg.scripts.start.split(/\s+/);
  assert.equal(command[0], 'serve', 'update this test if the supported static preview changes');
  const binary = typeof servePkg.bin === 'string' ? servePkg.bin : servePkg.bin.serve;
  const child = spawn(
    process.execPath,
    [path.resolve('node_modules/serve', binary), ...command.slice(1), '--listen', 'tcp://127.0.0.1:0', '--no-clipboard'],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  context.after(async () => {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await once(child, 'close');
    }
  });
  const origin = await new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error('Static preview did not start: ' + output)), 12000);
    child.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.once('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error('Static preview exited: ' + code + ' ' + output));
    });
    const inspect = (chunk) => {
      output += chunk.toString();
      const match = output.match(/Accepting connections at (http:\/\/[^\s\u001b]+)/);
      if (match) {
        clearTimeout(timeout);
        resolve(match[1]);
      }
    };
    child.stdout.on('data', inspect);
    child.stderr.on('data', inspect);
  });
  for (const project of catalog) {
    const response = await fetch(origin + projectPath(project));
    assert.equal(response.status, 200, project.id + ' did not load');
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.ok(html.includes('<h1>' + project.name + '</h1>'), project.id + ' returned the wrong initial HTML');
    assert.ok(meta(html, 'og:url')[0].includes('https://gaulatti.com' + projectPath(project)));
  }
  const data = await fetch(origin + '/portfolio/mistify.data');
  assert.equal(data.status, 200, 'client navigation data is missing');
  const missing = await fetch(origin + '/portfolio/does-not-exist');
  assert.equal(missing.status, 404);
});
