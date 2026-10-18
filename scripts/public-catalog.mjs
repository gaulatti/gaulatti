import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { publicCatalog, approvedHomeSystems } from '../app/data/project-publication.ts';

export async function writePublicCatalog() {
  const catalog = publicCatalog();
  const content =
    '// Generated from approved project content. Do not edit.\nimport type { ProjectFact } from "./projects";\nexport const approvedProjects: ProjectFact[] = ' +
    JSON.stringify(catalog, null, 2) +
    ';\nexport const approvedHomeSystemIds: string[] = ' +
    JSON.stringify(approvedHomeSystems(catalog)) +
    ';\n';
  await fs.writeFile(fileURLToPath(new URL('../app/data/public-projects.generated.ts', import.meta.url)), content);
  return catalog;
}
