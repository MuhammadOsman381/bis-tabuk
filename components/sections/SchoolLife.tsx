'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, Reveal, staggerContainer } from '../ui/Motion';

type SchoolLifeItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
};

export default function SchoolLife() {
  const [items, setItems] = useState<SchoolLifeItem[]>([]);

  useEffect(() => {
    let isActive = true;

    async function loadItems() {
      try {
        const response = await fetch('/api/school-life');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? 'Unable to load school life items.');
        if (isActive) setItems(result.items ?? []);
      } catch {
        if (isActive) setItems([]);
      }
    }

    loadItems();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section id="school-life" className="relative overflow-hidden bg-[#0f1434] py-20 text-white dark:bg-zinc-950 sm:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#C8102E]/16 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center sm:mb-16">
          <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-[#C9A84C] backdrop-blur-xl">Life at BIST</span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">School Life & <span className="text-[#C9A84C]">Enrichment</span></h2>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/70">
            Education at BIST extends far beyond the classroom. We develop the whole person through extraordinary co-curricular experiences.
          </p>
        </Reveal>

        {items.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((item, index) => {
              const isLarge = index === 0;

              return (
                <motion.div
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 23 }}
                  className={isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}
                >
                  <Link
                    href={`/school-life/${item.id}`}
                    className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/20 outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/25"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes={isLarge ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/34 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-[#C8102E]/90 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      {item.category}
                    </div>
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-[#1A1F4B]">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <h3 className="mb-2 text-2xl font-bold leading-tight">{item.title}</h3>
                      <div
                        className="line-clamp-3 text-sm leading-relaxed text-white/80 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_strong]:font-black [&_ul]:list-disc [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/5 p-10 text-center text-white/70">
            <p className="text-sm font-bold">No school life cards have been added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
