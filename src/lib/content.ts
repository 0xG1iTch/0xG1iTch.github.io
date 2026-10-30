import { getCollection } from 'astro:content';

export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en', {
  day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(date);
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 210));
export async function getWork() {
  const entries = await getCollection('work');
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
export async function getFeed() {
  return (await getWork()).map(({ id, data, body }) => ({
    id, title: data.title, description: data.description, type: data.type,
    topics: data.topics, date: data.date.toISOString(), dateLabel: formatDate(data.date),
    minutes: readingTime(body), href: withBase(`writing/${id}/`),
  }));
}
