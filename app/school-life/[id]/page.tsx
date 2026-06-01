'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';

type SchoolLifeItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageGallery?: GalleryImage[];
};

type GalleryImage = {
  url: string;
  publicId?: string;
};

function getGallery(item: SchoolLifeItem) {
  if (Array.isArray(item.imageGallery) && item.imageGallery.length) return item.imageGallery.slice(0, 3);
  return item.imageUrl ? [{ url: item.imageUrl }] : [];
}

export default function SchoolLifeDetailPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<SchoolLifeItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadItem() {
      try {
        const response = await fetch('/api/school-life');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? 'Unable to load school life item.');
        const dbItems = result.items as SchoolLifeItem[] | undefined;
        const selected = dbItems?.find((candidate) => candidate.id === params.id) ?? null;
        if (isActive) setItem(selected);
      } catch {
        if (isActive) setItem(null);
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadItem();
    return () => {
      isActive = false;
    };
  }, [params.id]);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] pb-16 dark:bg-zinc-950">
        <div className="px-4 pt-28 sm:px-6 lg:px-10">
          <Link href="/#school-life" className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]">
            <ArrowLeft className="h-4 w-4" />
            Back to School Life
          </Link>
        </div>

        {isLoading ? (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
              <div className="h-80 rounded-2xl bg-zinc-100 dark:bg-white/10" />
              <div className="mt-8 h-6 w-2/3 rounded-full bg-zinc-100 dark:bg-white/10" />
              <div className="mt-4 h-4 w-full rounded-full bg-zinc-100 dark:bg-white/10" />
            </div>
          </div>
        ) : item ? (
          <article>
            <div className="relative overflow-hidden px-4 pb-4 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-12 lg:px-10">
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C8102E]/10 blur-3xl dark:bg-[#C9A84C]/10" />
              <div className="relative mx-auto max-w-5xl">
                <span className="inline-flex rounded-full border border-[#C8102E]/15 bg-white/80 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E] shadow-lg shadow-zinc-900/5 backdrop-blur-md dark:border-[#C9A84C]/20 dark:bg-white/[0.06] dark:text-[#C9A84C]">
                  {item.category}
                </span>
                <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl lg:text-7xl">{item.title}</h1>
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
              <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
                {getGallery(item).map((image, index) => (
                  <motion.div
                    key={`${image.url}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className={`group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl shadow-zinc-900/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/30 ${
                      index === 0 ? 'aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto' : 'aspect-[4/3]'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${item.title} gallery image ${index + 1}`}
                      fill
                      sizes={index === 0 ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/24 to-transparent opacity-70" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
              <div
                className="text-lg leading-9 text-zinc-700 dark:text-zinc-300 [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-zinc-950 [&_h2]:dark:text-zinc-50 [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:my-5 [&_strong]:font-black [&_strong]:text-zinc-950 [&_strong]:dark:text-zinc-50 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-7"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </article>
        ) : (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.04]">
              <h1 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">School life item not found</h1>
              <p className="mt-3 text-zinc-500 dark:text-zinc-400">This card may have been removed by an administrator.</p>
            </div>
          </div>
        )}
      </section>
    </motion.main>
  );
}
