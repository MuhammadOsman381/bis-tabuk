import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function AboutTabukPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="About Tabuk"
      heroImage="https://picsum.photos/id/1015/1920/980"
      heroAlt="Saudi landscape and city view"
      intro={['Tabuk is a growing region in northwest Saudi Arabia, known for natural beauty, heritage and proximity to major national development projects.']}
      sections={[{ title: 'Living and working in the region', paragraphs: ['Staff joining BIST become part of a welcoming school community while experiencing life in a dynamic and changing part of Saudi Arabia.'] }]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    />
  );
}
