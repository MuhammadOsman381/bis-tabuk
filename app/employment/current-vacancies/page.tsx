import SchoolPageShell from '@/components/layout/SchoolPageShell';

const vacancies = [
  { title: 'Primary Class Teacher', tag: 'Primary', description: 'A teaching role for an enthusiastic practitioner committed to excellent learning and pastoral care.', cta: 'View Job Description' },
  { title: 'Secondary Science Teacher', tag: 'Secondary', description: 'A specialist teaching position supporting high-quality learning across the Secondary School.', cta: 'View Job Description' },
  { title: 'Whole School Counsellor', tag: 'Whole School', description: 'A student wellbeing role working collaboratively across sections and support teams.', cta: 'View Job Description' },
];

export default function CurrentVacanciesPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Current Vacancies"
      intro={['Explore career opportunities at BIST. We welcome both overseas and local hire candidates.']}
      sections={[
        { title: 'Whole School Positions', cards: vacancies.filter((job) => job.tag === 'Whole School') },
        { title: 'Primary Section Positions', cards: vacancies.filter((job) => job.tag === 'Primary') },
        { title: 'Secondary Section Positions', cards: vacancies.filter((job) => job.tag === 'Secondary') },
      ]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    />
  );
}
