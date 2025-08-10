import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://quistra.com',
  integrations: [
    sitemap()
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: true
    }
  }
});
