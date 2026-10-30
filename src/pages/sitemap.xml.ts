import type { APIRoute } from 'astro';
import { getWork, withBase } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const root = site || new URL('https://example.com');
  const entries = await getWork();
  const paths = ['', 'writing/', 'about/', ...entries.map(entry => `writing/${entry.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${new URL(withBase(path), root).href.replace(/&/g, '&amp;')}</loc></url>`).join('')}</urlset>`, { headers:{'Content-Type':'application/xml; charset=utf-8'} });
};
