import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function WhyWorkPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Why Work at BIST"
      heroImage="https://picsum.photos/id/1031/1920/980"
      heroAlt="Happy teachers and students on campus"
      intro={['Join the British International School of Tabuk (BIST) and take your career to new heights in a warm, ambitious and internationally minded school community.']}
      sections={[
        {
          title: 'Discover Tabuk - A City of Opportunity',
          paragraphs: ['Tabuk offers a rich quality of life on the Red Sea, combining culture, hospitality, international connections and access to coastal experiences.'],
        },
        {
          title: 'Professional Learning',
          paragraphs: ['BIST invests in professional growth through collaboration, coaching, training and leadership development. Staff are supported to keep learning and to contribute meaningfully to school improvement.'],
          image: 'https://picsum.photos/id/1048/900/1000',
          imageAlt: 'Staff collaborating in professional development',
        },
        // {
        //   title: 'Explore opportunities',
        //   cards: [y
        //     { title: 'Rewards and Benefits', description: 'Learn more about the benefits available to overseas and local hires.', cta: 'View our Rewards and Benefits', href: '/employment/overseas-hire-benefits' },
        //   ],
        // },
      ]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    />
  );
}
