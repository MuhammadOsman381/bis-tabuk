import SchoolPageShell from '@/components/layout/SchoolPageShell';

const termRows = [
  ['Term 1', 'September 7, 2025', 'December 11, 2025', '14 weeks', 'Saudi National Day'],
  ['Term 2', 'January 4, 2026', 'March 26, 2026', '12 weeks', 'Mid-term break'],
  ['Term 3', 'April 12, 2026', 'June 25, 2026', '11 weeks', 'Eid break'],
];

const holidayRows = [
  ['Saudi National Day', 'September 23, 2025'],
  ['Winter Break', 'December 12, 2025 - January 3, 2026'],
  ['Eid Break', 'Dates confirmed by official announcement'],
  ['Last Day of School', 'June 25, 2026'],
];

export default function TermDatesPage() {
  return (
    <SchoolPageShell
      eyebrow="News & Media"
      title="Term Dates 2025-2026"
      heroImage="https://picsum.photos/id/1041/1920/980"
      heroAlt="School building and students during term time"
      intro={['Term dates help families plan the academic year. Dates may be updated in line with official announcements and school communications.']}
      sections={[
        { title: 'Academic Year 2025-2026', table: { headers: ['Term', 'Start Date', 'End Date', 'Duration', 'Holidays'], rows: termRows } },
        { title: 'Important Dates & Holidays', table: { headers: ['Date', 'Details'], rows: holidayRows } },
      ]}
    />
  );
}
