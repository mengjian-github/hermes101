import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin || 'https://hermes101.dev';
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n\n# LLM-friendly site summary\nLLMs-txt: ${origin}/llms.txt\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
