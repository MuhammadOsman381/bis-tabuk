export const fallbackYearGroups = [
  'Nursery',
  'FS1',
  'FS2',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
  'Year 7',
  'Year 8',
  'Year 9',
  'Year 10',
  'Year 11',
  'A Levels',
];

export const yearGroups = fallbackYearGroups;

export async function fetchExternalYearGroups() {
  try {
    const response = await fetch('https://isksafh.vercel.app/api/public/years', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch year groups.');
    const data = (await response.json()) as { years?: string[] };
    const years = Array.isArray(data.years) ? data.years.filter((year): year is string => typeof year === 'string' && Boolean(year.trim())) : [];
    return years.length ? Array.from(new Set(years.map((year) => year.trim()))) : fallbackYearGroups;
  } catch {
    return fallbackYearGroups;
  }
}
