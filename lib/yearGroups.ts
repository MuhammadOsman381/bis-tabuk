export const getYearGroups = async (): Promise<string[]> => {
  try {
    const res = await fetch('https://isksafh.vercel.app/api/public/years');
    if (!res.ok) {
      throw new Error('Failed to fetch year groups');
    }
    const data = await res.json();
    return data.years;
  } catch (error) {
    console.error(error);
    return [
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
  }
};

export const yearGroups = await getYearGroups();