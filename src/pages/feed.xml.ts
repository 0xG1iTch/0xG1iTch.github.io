import type { APIRoute } from 'astro';
import { getWork, withBase } from '../lib/content';
import { profile } from '../config';
const escape = (value: string) => value.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const GET: APIRoute = async ({ site }) => {
  const root = site || new URL('https://example.com');
  const entries = await getWork();
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(profile.name)} — Fieldnotes</title><link>${new URL(withBase(''), root)}</link><description>${escape(profile.description)}</description><language>en</language>${entries.map(entry => {
    const link = new URL(withBase(`writing/${entry.id}/`), root).href;
    return `<item><title>${escape(entry.data.title)}</title><link>${escape(link)}</link><guid>${escape(link)}</guid><description>${escape(entry.data.description)}</description><pubDate>${entry.data.date.toUTCString()}</pubDate></item>`;
  }).join('')}</channel></rss>`;
  return new Response(xml, { headers:{ 'Content-Type':'application/rss+xml; charset=utf-8' } });
};
