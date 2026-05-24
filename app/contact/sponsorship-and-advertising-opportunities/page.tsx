import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function SponsorshipPage() {
  return (
    <SchoolPageShell
      eyebrow="Contact"
      title="Sponsorship & Advertising Opportunities"
      heroImage="https://picsum.photos/id/1067/1920/980"
      heroAlt="School event with sponsorship banners"
      intro={['BIST offers sponsorship and advertising opportunities for organisations wishing to support school events, community initiatives and student experiences.']}
      sections={[
        { title: 'Sponsorship Opportunities', bullets: ['Community events', 'Sports tournaments', 'Performing arts showcases', 'Student leadership initiatives'] },
        { title: 'Advertising Opportunities', bullets: ['Website placements', 'Newsletter features', 'Event programmes', 'Campus event visibility'], image: 'https://picsum.photos/id/1026/900/1000', imageAlt: 'Sponsored school event branding' },
        { title: 'Benefits for sponsors', bullets: ['Connect with an international community', 'Support education and enrichment', 'Build brand visibility with families', 'Contribute to meaningful student opportunities'] },
      ]}
      ctaTitle="Become a Sponsor"
      ctaLabel="Get in Touch"
      ctaHref="/contact/contact-us"
    />
  );
}
