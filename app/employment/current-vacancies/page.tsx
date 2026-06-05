import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function CurrentVacanciesPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Current Vacancies"
      intro={['Under Maintenance']}
      showVideo={false}
      // sections={[
      //   { title: 'Whole School Positions', cards: vacancies.filter((job) => job.tag === 'Whole School') },
      //   { title: 'Primary Section Positions', cards: vacancies.filter((job) => job.tag === 'Primary') },
      //   { title: 'Secondary Section Positions', cards: vacancies.filter((job) => job.tag === 'Secondary') },
      // ]}
      // ctaTitle="Apply Now"
      // ctaLabel="Apply Now"
    />
  );
}
