import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function OverseasBenefitsPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Overseas Hire Benefits"
      heroImage="https://picsum.photos/id/1018/1920/980"
      heroAlt="Red Sea lifestyle and Tabuk city"
      sections={[
        { title: 'Compensation & Financial Security', bullets: ['Tax-Free Salary', 'End-of-Service Gratuity', 'Medical & Life Insurance'] },
        { title: 'Relocation & Accommodation', bullets: ['Fully Furnished Accommodation', 'Utilities', 'Flights', 'Relocation Support'] },
        { title: 'Other benefits', bullets: ['Tuition fees for children', 'Professional learning opportunities', 'Supportive international community'] },
      ]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    />
  );
}
