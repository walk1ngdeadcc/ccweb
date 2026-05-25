import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';

async function generate() {
  const notes = await getCollection('notes');
  const published = notes.filter(n => !n.data.draft);
  
  const index = published.map(note => ({
    title: note.data.title,
    slug: note.slug,
    summary: note.data.summary || '',
    category: note.data.category,
    tags: note.data.tags,
    date: note.data.date,
  }));
  
  const outPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2));
  console.log(`Search index generated: ${index.length} notes`);
}

generate();
