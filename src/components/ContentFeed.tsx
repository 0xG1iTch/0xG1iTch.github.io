import { useEffect, useState } from 'react';
import { primaryTopics } from '../lib/topics';

type Entry = { id: string; title: string; description: string; type: string; topics: string[]; date: string; dateLabel: string; minutes: number; href: string };
const types = ['All work', 'Articles', 'Projects', 'Experiments', 'Notes'] as const;
const typeMap: Record<string, string> = { Articles: 'Article', Projects: 'Project', Experiments: 'Experiment', Notes: 'Note' };
function Arrow() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>;
}
export default function ContentFeed({ entries }: { entries: Entry[] }) {
  const [type, setType] = useState('All work');
  const [topic, setTopic] = useState('all');
  const topics = [...new Set([...primaryTopics, ...entries.flatMap(entry => entry.topics)])].sort();
  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    const nextType = params.get('type') || 'All work';
    const nextTopic = params.get('topic') || 'all';
    setType(types.includes(nextType as typeof types[number]) ? nextType : 'All work');
    setTopic(nextTopic === 'all' || topics.includes(nextTopic) ? nextTopic : 'all');
  }
  useEffect(() => {
    readUrl();
    window.addEventListener('popstate', readUrl);
    return () => window.removeEventListener('popstate', readUrl);
  }, []);
  function update(nextType: string, nextTopic: string) {
    setType(nextType);
    setTopic(nextTopic);
    const url = new URL(window.location.href);
    nextType === 'All work' ? url.searchParams.delete('type') : url.searchParams.set('type', nextType);
    nextTopic === 'all' ? url.searchParams.delete('topic') : url.searchParams.set('topic', nextTopic);
    window.history.pushState({}, '', url);
  }
  const filtered = entries.filter(entry => (type === 'All work' || entry.type === typeMap[type]) && (topic === 'all' || entry.topics.includes(topic)));
  return <div className="content-feed">
    <div className="feed-controls flex justify-between items-center gap-5">
      <div className="filter-tabs flex" role="group" aria-label="Filter by content type">
        {types.map(label => <button key={label} type="button" aria-pressed={type === label} onClick={() => update(label, topic)}>{label}{label === 'All work' ? <sup>{entries.length.toString().padStart(2, '0')}</sup> : null}</button>)}
      </div>
      <label className="topic-filter">Topic <select name="topic" value={topic} onChange={event => update(type, event.target.value)}><option value="all">All topics</option>{topics.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    <div className="feed-list">
      {filtered.length ? filtered.map(entry => <article className="feed-entry" key={entry.id}>
        <div className="entry-date"><time dateTime={entry.date}>{entry.dateLabel}</time><span className={`content-type type-${entry.type.toLowerCase()}`}><span aria-hidden="true"/>{entry.type}</span></div>
        <div className="entry-content"><h3><a className="entry-link" href={entry.href}>{entry.title}</a></h3><p>{entry.description}</p><div className="entry-topics">{entry.topics.map(item => <a key={item} href={`?topic=${encodeURIComponent(item)}`} onClick={event => { event.preventDefault(); update('All work', item); }}>{item}</a>)}<span className="reading-time">{entry.minutes} min read</span></div></div>
        <a className="entry-arrow" href={entry.href} aria-label={`Read ${entry.title}`}><Arrow/></a>
      </article>) : <div className="empty-state"><h3>Still in the making.</h3><p>No {type === 'All work' ? 'stories' : type.toLowerCase()} {topic !== 'all' ? `about ${topic} ` : ''}here yet. Explore the rest of the notebook.</p><button className="text-link" type="button" onClick={() => update('All work', 'all')}>View all work <Arrow/></button></div>}
    </div>
    <p className="feed-status" role="status">{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}{type !== 'All work' ? ` · ${type}` : ''}{topic !== 'all' ? ` · ${topic}` : ''}</p>
  </div>;
}
