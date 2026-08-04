'use client';

import { useEffect, useMemo, useState } from 'react';
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

function getDescriptionPreview(description: string, wordLimit = 4) {
  const plainText = description
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  const words = plainText.split(' ').filter(Boolean);
  if (words.length <= wordLimit) return plainText;
  return `${words.slice(0, wordLimit).join(' ')}...`;
}

export default function SchoolLife() {
  const [items, setItems] = useState<SchoolLifeItem[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxGalleryLength = useMemo(() => Math.max(1, ...items.map((item) => getGallery(item).length)), [items]);

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

  useEffect(() => {
    if (!items.length) return;
    const interval = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % maxGalleryLength);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [items.length, maxGalleryLength]);

  return (
    <section id="school-life" className="relative overflow-hidden bg-[#fffaf2] py-20 text-[#1A1F4B] dark:bg-zinc-950 dark:text-white sm:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#C8102E]/8 blur-3xl dark:bg-[#C9A84C]/10" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C9A84C]/14 blur-3xl dark:bg-[#C9A84C]/10" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center sm:mb-16">
          <span className="inline-flex rounded-full border border-[#C8102E]/10 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-[#C8102E] shadow-sm shadow-[#1A1F4B]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:text-[#C9A84C]">Life at BIST</span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">School Life & <span className="text-[#C8102E] dark:text-[#C9A84C]">Enrichment</span></h2>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-600 dark:text-white/70">
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
              const gallery = getGallery(item);
              const activeImageIndex = gallery.length ? carouselIndex % gallery.length : 0;

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
                    className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-[#1A1F4B]/10 bg-white shadow-[0_22px_70px_rgba(26,31,75,0.12)] outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 dark:border-white/10 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-black/20 dark:focus-visible:ring-[#C9A84C]/25"
                  >
                    {gallery.map((image, imageIndex) => (
                      <Image
                        key={`${image.url}-${imageIndex}`}
                        src={image.url}
                        alt={`${item.title} image ${imageIndex + 1}`}
                        fill
                        sizes={isLarge ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'}
                        className={`object-cover transition-all duration-1000 group-hover:scale-105 ${imageIndex === activeImageIndex ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/22 to-transparent dark:from-black/88 dark:via-black/34" />
                    {gallery.length > 1 && (
                      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
                        {gallery.map((image, imageIndex) => (
                          <span
                            key={`dot-${image.url}-${imageIndex}`}
                            className={`h-1.5 rounded-full transition-all ${imageIndex === activeImageIndex ? 'w-5 bg-[#C9A84C]' : 'w-1.5 bg-white/50'}`}
                          />
                        ))}
                      </div>
                    )}
                    {gallery.length > 1 && (
                      <div className="absolute left-4 bottom-4 z-10 rounded-full bg-black/45 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                        {activeImageIndex + 1} / {gallery.length}
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-xs font-bold text-[#C8102E] shadow-lg shadow-black/10 backdrop-blur-md dark:bg-[#C9A84C]/95 dark:text-zinc-950">
                      {item.category}
                    </div>
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-[#1A1F4B] shadow-lg shadow-black/10 backdrop-blur-sm transition-all group-hover:bg-[#C8102E] group-hover:text-white dark:bg-white/20 dark:text-white dark:group-hover:bg-white dark:group-hover:text-[#1A1F4B]">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <h3 className="mb-2 text-2xl font-bold leading-tight">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-white/86 dark:text-white/80">{getDescriptionPreview(item.description)}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-[#C8102E]/20 bg-white/80 p-10 text-center text-zinc-600 shadow-sm shadow-[#1A1F4B]/5 dark:border-white/15 dark:bg-white/5 dark:text-white/70">
            <p className="text-sm font-bold">No school life cards have been added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
