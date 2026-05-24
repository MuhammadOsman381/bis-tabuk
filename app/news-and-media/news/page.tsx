import SchoolPageShell from '@/components/layout/SchoolPageShell';

const newsCards = [
  { title: 'International Day Celebration', date: 'May 12, 2025', tag: 'Community', image: 'https://picsum.photos/id/1067/640/420', description: 'Students and families celebrated the cultures and traditions that make BIST a vibrant international community.', cta: 'Read More' },
  { title: 'Primary IPC Showcase', date: 'April 28, 2025', tag: 'Academic', image: 'https://picsum.photos/id/1080/640/420', description: 'Primary learners shared inquiry-led projects with confidence, creativity and collaboration.', cta: 'Read More' },
  { title: 'BIST Sports Finals', date: 'April 18, 2025', tag: 'Sports', image: 'https://picsum.photos/id/1058/640/420', description: 'Students represented their houses and teams with energy, sportsmanship and pride.', cta: 'Read More' },
  { title: 'MUN Delegates Debate Global Issues', date: 'March 30, 2025', tag: 'Leadership', image: 'https://picsum.photos/id/1027/640/420', description: 'Secondary students developed diplomacy, research and public speaking through Model United Nations.', cta: 'Read More' },
  { title: 'Performing Arts Evening', date: 'March 12, 2025', tag: 'Arts', image: 'https://picsum.photos/id/1035/640/420', description: 'Drama and music students performed with creativity, courage and technical skill.', cta: 'Read More' },
  { title: 'Outdoor Education Expedition', date: 'February 22, 2025', tag: 'Outdoor', image: 'https://picsum.photos/id/1018/640/420', description: 'Students built resilience and teamwork through a challenging outdoor learning experience.', cta: 'Read More' },
];

export default function NewsPage() {
  return (
    <SchoolPageShell
      eyebrow="News & Media"
      title="News"
      subtitle="Latest News & Events"
      heroImage="https://picsum.photos/id/1026/1920/980"
      heroAlt="School event and students celebrating"
      sections={[{ title: 'Latest News & Events', cards: newsCards }]}
      ctaLabel="Join Our School"
    >
      <div className="mt-12 text-center">
        <button className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-black text-[#1A1F4B] shadow-sm transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
          Load More
        </button>
      </div>
    </SchoolPageShell>
  );
}
