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
};

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
            <div className="relative min-h-[58vh] overflow-hidden sm:min-h-[64vh]">
              <Image src={item.imageUrl} alt={item.title} fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/28 to-black/75" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.20),transparent_32%)]" />

              <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center text-white sm:min-h-[64vh] sm:px-6">
                <span className="rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f4d77a] shadow-2xl shadow-black/25 backdrop-blur-md">
                  {item.category}
                </span>
                <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight drop-shadow-2xl sm:text-6xl lg:text-7xl">{item.title}</h1>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6fbff] to-transparent dark:from-zinc-950" />
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
