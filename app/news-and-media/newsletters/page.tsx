import SchoolPageShell from '@/components/layout/SchoolPageShell';

const newsletters = [
  { title: 'BIST Newsletter - Term 1 2025', date: 'October 2025', tag: '2025-2026', description: 'Highlights from the start of the academic year, community events and student achievements.', cta: 'Download PDF' },
  { title: 'BIST Newsletter - Term 2 2025', date: 'January 2026', tag: '2025-2026', description: 'Learning celebrations, sports updates, arts events and key notices for families.', cta: 'Download PDF' },
  { title: 'BIST Newsletter - Term 3 2025', date: 'June 2026', tag: '2025-2026', description: 'A year-end round-up of achievements, events and community milestones.', cta: 'Download PDF' },
];

export default function NewslettersPage() {
  return (
    <SchoolPageShell
      eyebrow="News & Media"
      title="Newsletters"
      intro={['Our newsletters keep families connected with school life, celebrating student achievements, upcoming events and important community updates.']}
      sections={[
        {
          title: 'Latest newsletters',
          image: 'https://picsum.photos/id/1011/900/1000',
          imageAlt: 'Parent reading a school newsletter',
          cards: newsletters,
        },
      ]}
    />
  );
}
