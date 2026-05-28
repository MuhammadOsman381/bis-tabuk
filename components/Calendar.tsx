import Image from 'next/image';

const Calendar = () => {
  return (
    <section id="calendar" className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,16,46,0.08),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(201,168,76,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(201,168,76,0.10),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.05),transparent_30%)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#C8102E] dark:text-[#C9A84C]">School Calendar</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-5xl">Key Dates at a Glance</h2>
        </div>

        <div className="relative mx-auto max-w-3xl rounded-[2rem] bg-gradient-to-br from-white via-[#fff8f8] to-[#f5fbff] p-3 shadow-2xl shadow-zinc-900/12 ring-1 ring-zinc-200/80 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 dark:shadow-black/40 dark:ring-white/10 sm:p-4">
          <div className="absolute -inset-1 -z-10 rounded-[2.25rem] bg-gradient-to-br from-[#C8102E]/18 via-[#C9A84C]/18 to-sky-400/12 blur-2xl dark:from-[#C9A84C]/16 dark:via-white/8 dark:to-[#C8102E]/12" />
          <div className="rounded-[1.5rem] border border-white/80 bg-white/70 p-2 shadow-inner shadow-white/50 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20 sm:p-3">
            <div className="overflow-hidden rounded-[1.15rem] border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-950">
              <Image
                src="/images/calendar.jpg"
                alt="BIST school calendar"
                width={900}
                height={1000}
                sizes="(max-width: 768px) 92vw, 768px"
                className="h-auto w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar
