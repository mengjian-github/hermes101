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
        // Exclude noindex legacy/internal pages from sitemap.
        const noindexPaths = [
          '/migrate/',
          '/resources/',
          '/7-days/day-1/',
          '/7-days/day-2/',
          '/7-days/day-3/',
          '/7-days/day-4/',
          '/7-days/day-5/',
          '/7-days/day-6/',
          '/7-days/day-7/',
          '/zh/setup/',
          '/zh/faq/',
          '/zh/migrate/',
          '/zh/resources/',
          '/zh/7-days/',
          '/zh/7-days/day-1/',
          '/zh/7-days/day-2/',
          '/zh/7-days/day-3/',
          '/zh/7-days/day-4/',
          '/zh/7-days/day-5/',
          '/zh/7-days/day-6/',
          '/zh/7-days/day-7/',
          '/privacy/',
          '/terms/',
          '/404/'
        ];
        return !noindexPaths.includes(path);
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
