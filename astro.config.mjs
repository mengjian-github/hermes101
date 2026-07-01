// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hermes101.dev',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        // Keep every public indexable tutorial/legal route in the sitemap;
        // only exclude the generated error page.
        return path !== '/404/';
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN'
        }
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
