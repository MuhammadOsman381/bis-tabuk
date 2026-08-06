import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SchoolPageShell from '@/components/layout/SchoolPageShell';

export default function LocalBenefitsPage() {
  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Local Hire Benefits"
      heroImage="/images/employment/local-hire-benefits-title.jpg"
      heroAlt="Local hire benefits illustration with employment documents"
      showVideo={false}
      sections={[
        { title: 'Compensation & Financial Security', bullets: ['Tax-Free Salary', 'End-of-Service Gratuity'] },
        { title: 'Ongoing Financial Support', bullets: ['Discounted Children Tuition Fees', 'Interest-Free Car Loan'] },
        { title: 'Professional Development', bullets: ['Training opportunities', 'Collaborative planning and coaching', 'Pathways for career growth'] },
      ]}
      ctaTitle="Apply Now"
      ctaLabel="Apply Now"
    >
      <div className="mt-14 border-t border-zinc-200 pt-10 text-center dark:border-white/10">
        <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Ready to apply?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base font-semibold leading-7 text-zinc-600 dark:text-zinc-300">Send your details and CV to the BIST recruitment team.</p>
        <Link
          href="/employment/local-hire-benefits/apply"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-6 py-3 text-sm font-black text-white shadow-[0_18px_38px_rgba(200,16,46,0.26)] transition hover:-translate-y-0.5"
        >
          Apply
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SchoolPageShell>
  );
}
