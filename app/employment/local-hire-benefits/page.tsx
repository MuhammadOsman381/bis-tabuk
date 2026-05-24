import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function LocalBenefitsPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Local Hire Benefits"
      heroImage="https://picsum.photos/id/1076/1920/980"
      heroAlt="Local staff working in a school environment"
      sections={[
        { title: 'Compensation & Financial Security', bullets: ['Tax-Free Salary', 'End-of-Service Gratuity'] },
        { title: 'Ongoing Financial Support', bullets: ['Discounted Children Tuition Fees', 'Interest-Free Car Loan'] },
        { title: 'Professional Development', bullets: ['Training opportunities', 'Collaborative planning and coaching', 'Pathways for career growth'] },
      ]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    />
  );
}
