import SchoolPageShell from '@/components/layout/SchoolPageShell';

const events = [
  ['September 7', 'First Day of Term', '7:30 AM', 'Academic'],
  ['September 23', 'Saudi National Day', 'All day', 'Holiday'],
  ['October 14', 'Primary Sports Morning', '8:30 AM', 'Sports'],
  ['November 6', 'Performing Arts Showcase', '6:00 PM', 'Arts'],
  ['December 10', 'Winter Community Event', '4:00 PM', 'Community'],
  ['January 18', 'IGCSE Options Evening', '5:30 PM', 'Academic'],
];

export default function SchoolCalendarPage() {
  return (
    <SchoolPageShell
      eyebrow="News & Media"
      title="School Calendar"
      heroImage="https://picsum.photos/id/1044/1920/980"
      heroAlt="School events calendar collage"
      intro={['Browse key school events, activities and important dates. Families should always refer to official school communications for the latest updates.']}
      sections={[
        {
          title: 'Upcoming events',
          bullets: ['Academic', 'Sports', 'Arts', 'Community'],
          table: { headers: ['Date', 'Event', 'Time', 'Category'], rows: events },
        },
      ]}
    />
  );
}
