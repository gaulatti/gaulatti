import type { Config } from "@react-router/dev/config";
import { projectPath } from './app/data/projects';
import { publicCatalog } from './app/data/project-publication';

export default {
  ssr: false,
  prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...publicCatalog().map(projectPath)];
  },
} satisfies Config;
