import { notFound } from 'next/navigation';
import BeyondClassroomPageClient from '../_components/BeyondClassroomPageClient';
import { beyondPages, beyondSlugs } from '../_components/content';

export function generateStaticParams() {
  return beyondSlugs.map((slug) => ({ slug }));
}

export default async function BeyondClassroomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = beyondPages[slug];

  if (!page) {
    notFound();
  }

  return <BeyondClassroomPageClient page={page} />;
}
