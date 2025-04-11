// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gaulatti.com',
  integrations: [
    tailwind({
      configFile: './tailwind.config.js',
    }),
  ],
  compressHTML: true,
  build: {
    assets: 'assets',
  },
  experimental: {
    svg: true,
  },
});
