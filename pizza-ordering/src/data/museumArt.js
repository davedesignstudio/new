import { MUSEUM_RECORDS, MUSEUM_KEY_MAP, MUSEUM_SOURCES } from './museumRegistry';
import { getStoryVariant } from './images';

export { MUSEUM_RECORDS, MUSEUM_KEY_MAP, MUSEUM_SOURCES };

export function getMuseumRecord(variant) {
  const key = MUSEUM_KEY_MAP[variant] ?? variant;
  return MUSEUM_RECORDS[key] ?? null;
}

export function getMuseumRecordForStory(storyId) {
  return getMuseumRecord(getStoryVariant(storyId));
}

export function getMuseumImageUrl(variant, size = 'full') {
  const rec = getMuseumRecord(variant);
  if (!rec) return null;
  if (size === 'thumb') return rec.thumb || rec.image;
  return rec.image;
}

export function getMuseumAttribution(variant) {
  const rec = getMuseumRecord(variant);
  if (!rec) return null;
  const artist = rec.artist ? `${rec.artist}` : 'Artista sconosciuto';
  const date = rec.date ? `, ${rec.date}` : '';
  return `${rec.title} — ${artist}${date}. ${rec.museum}.`;
}

export function listAllMuseumRecords() {
  return Object.entries(MUSEUM_RECORDS)
    .filter(([key]) => !key.endsWith('-alt'))
    .map(([key, record]) => ({ key, ...record }));
}

export function listMuseumRecordsByMuseum() {
  const grouped = {};
  for (const source of MUSEUM_SOURCES) {
    grouped[source.id] = { ...source, works: [] };
  }
  for (const { key, ...record } of listAllMuseumRecords()) {
    const bucket = grouped[record.museumId];
    if (bucket) bucket.works.push({ key, ...record });
  }
  return Object.values(grouped);
}
