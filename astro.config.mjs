import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://gaulatti.com',
  integrations: [
    tailwind({
      configFile: './tailwind.config.js',
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
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