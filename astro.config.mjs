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
        const legacyChinesePaths = [
          '/setup/',
          '/faq/',
          '/migrate/',
          '/resources/',
          '/7-days/',
          '/7-days/day-1/',
          '/7-days/day-2/',
          '/7-days/day-3/',
          '/7-days/day-4/',
          '/7-days/day-5/',
          '/7-days/day-6/',
          '/7-days/day-7/'
        ];
        return !legacyChinesePaths.includes(path);
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
