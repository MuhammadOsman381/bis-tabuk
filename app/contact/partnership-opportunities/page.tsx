import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function PartnershipOpportunitiesPage() {
  return (
    <SchoolPageShell
      eyebrow="Contact"
      title="Partnership Opportunities"
      heroImage="https://picsum.photos/id/1031/1920/980"
      heroAlt="School and community partnership event"
      intro={['BIST welcomes thoughtful partnerships that enrich learning, strengthen community connections and create meaningful opportunities for students.']}
      sections={[
        { title: 'Why Partner with BIST?', paragraphs: ['Partners connect with a diverse international school community and support programmes that have a lasting educational impact.'] },
        { title: 'Current Partnership Areas', bullets: ['Student learning experiences', 'Community service', 'Careers and mentoring', 'Arts, sport and enrichment', 'Sustainability initiatives'], image: 'https://picsum.photos/id/1048/900/1000', imageAlt: 'Partnership collaboration example' },
        { title: 'How to Get in Touch', paragraphs: ['Please contact the school with a short overview of your organisation, proposed partnership idea and preferred contact details.'] },
      ]}
      ctaTitle="Express Interest"
      ctaLabel="Contact Us"
      ctaHref="/contact/contact-us"
    />
  );
}
