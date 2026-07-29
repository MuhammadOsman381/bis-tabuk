import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function BistConnectPage() {
  return (
    <SchoolPageShell
      eyebrow="Alumni"
      title="BIST-Network"
      heroImage="https://picsum.photos/id/1027/1920/980"
      heroAlt="Alumni gathering and graduation event"
      intro={[
        'BIST Connect is the BIST alumni network, bringing former students together with each other and with the school community.',
        'Our alumni carry BIST values into universities, careers and communities around the world, and we are proud to keep those connections alive.',
      ]}
      quote='"BIST gave me friendships, confidence and a global perspective that stayed with me long after graduation." - BIST alumnus'
      sections={[
        {
          title: 'Benefits of joining BIST-Network',
          bullets: ['Reconnect with classmates and staff', 'Attend alumni events', 'Share career stories and mentor students', 'Celebrate BIST milestones and community news'],
          image: 'https://picsum.photos/id/1031/900/1000',
          imageAlt: 'Alumni networking event',
        },
      ]}
      ctaTitle="Join BIST-Network"
      ctaLabel="Join BIST-Network"
    />
  );
}
