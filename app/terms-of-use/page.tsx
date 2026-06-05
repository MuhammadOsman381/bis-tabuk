import PolicyPageShell, { PolicySection } from '@/components/layout/PolicyPageShell';

const sections: PolicySection[] = [
  {
    title: 'Important Notice',
    paragraphs: [
      'Your access to this website is subject to legally binding terms and conditions. Please read these terms carefully. By accessing and using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use.',
      'If you do not agree with these terms, please discontinue use of this website immediately.',
    ],
  },
  {
    title: 'Agreement',
    paragraphs: [
      "This Agreement is entered into between You ('User') and British International School of Tabuk, Kingdom of Saudi Arabia ('the School'). References to 'We', 'Us', and 'Our' mean both the User and the School.",
      'This Agreement becomes effective upon your acceptance through accessing and using this website. You consent to the electronic exchange of information and documents between you and the School through the Internet and email. This electronic agreement shall have the same force and effect as a written agreement.',
    ],
  },
  {
    title: '1. Ownership and Copyright',
    paragraphs: [
      'All information, content, reports, databases, graphics, interfaces, webpages, text, files, software, trademarks, logos, trade names and materials displayed on this website are the property of the School, its licensors, or respective owners and are protected by applicable intellectual property and copyright laws.',
    ],
  },
  {
    title: '2. Permitted Use',
    paragraphs: [
      'The School grants you a personal, non-transferable, non-exclusive license to access, view and download one copy of the Content for personal, educational and non-commercial use.',
    ],
  },
  {
    title: '3. Restrictions of Use',
    paragraphs: [
      'You shall not reproduce, distribute, publish, modify, reverse engineer, decompile, disassemble, sublicense, sell, lease, transfer, create derivative works from, or otherwise exploit any Content without prior written permission from the School.',
    ],
  },
  {
    title: '4. License for Submitted Content',
    paragraphs: [
      'Except for personal information, any suggestions, ideas, comments, concepts or materials submitted through this website may be used by the School on a perpetual, worldwide, royalty-free, non-exclusive basis for educational, administrative, operational and promotional purposes.',
    ],
  },
  {
    title: '5. Personal Information',
    paragraphs: [
      'The School may collect, store, process and use personal information for educational and administrative purposes in accordance with applicable laws, School policies and data protection requirements.',
      'Users may request access to, correction of, or deletion of personal information by contacting the School in writing.',
    ],
  },
  {
    title: '6. Disclaimer and Limitation of Liability',
    paragraphs: [
      "The School makes reasonable efforts to ensure that website information is accurate and current; however, no guarantees are provided regarding completeness, reliability or suitability. The website and all content are provided on an 'as is' and 'as available' basis.",
      'The School shall not be liable for any direct, indirect, incidental, consequential, special or punitive damages arising from use of, or inability to use, this website. External links are provided for convenience only and do not constitute endorsement by the School.',
    ],
  },
  {
    title: '7. Termination',
    paragraphs: [
      'The School reserves the right to suspend or terminate access to the website at any time, with or without notice, where necessary to protect the School, its users or its systems.',
    ],
  },
  {
    title: '8. Indemnification',
    paragraphs: [
      'You agree to indemnify and hold harmless the School, its officers, employees, affiliates and representatives against all claims, damages, liabilities, losses, costs and expenses arising from your use of the website or violation of these Terms.',
    ],
  },
  {
    title: '9. Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws and regulations of the Kingdom of Saudi Arabia. Any dispute arising from the use of this website shall be subject to the exclusive jurisdiction of the competent courts of the Kingdom of Saudi Arabia.',
    ],
  },
  {
    title: '10. Interpretation',
    paragraphs: [
      'Section headings are provided for convenience only and shall not affect the interpretation of these Terms. Words in the singular include the plural and vice versa where the context permits.',
    ],
  },
  {
    title: '11. Entire Agreement',
    paragraphs: [
      'These Terms of Use, together with any notices and policies published on this website, constitute the entire agreement between the User and the School regarding the use of this website.',
    ],
  },
  {
    title: '12. Severability',
    paragraphs: [
      'If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions shall remain valid and enforceable to the fullest extent permitted by law.',
    ],
  },
  {
    title: '13. Successors and Assigns',
    paragraphs: [
      'These Terms shall be binding upon and benefit the parties, their successors and permitted assigns.',
      'British International School of Tabuk, Kingdom of Saudi Arabia. Effective Year: 2026. All Rights Reserved.',
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <PolicyPageShell
      title="Terms of Use"
      subtitle="The legally binding terms and conditions for accessing and using the BIST website."
      effectiveLabel="Effective Year: 2026"
      pdfHref="/policies/terms-of-use.pdf"
      sections={sections}
    />
  );
}
