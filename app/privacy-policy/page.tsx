import PolicyPageShell, { PolicySection } from '@/components/layout/PolicyPageShell';

const sections: PolicySection[] = [
  {
    title: '1. Data Controller & Activity',
    paragraphs: [
      'The British International School of Tabuk (BIST) is committed to protecting the personal data of students, parents, guardians, employees, and members of the school community. We process personal data responsibly and in accordance with the Personal Data Protection Law (PDPL) of the Kingdom of Saudi Arabia.',
      'BIST acts as the Data Controller for the personal information that we collect, store, use, and process.',
      'BIST is an independent international school dedicated to providing high-quality education from Early Years through Secondary education. Our mission is to promote academic excellence, personal development, leadership, and global citizenship within a safe, inclusive, and supportive learning environment.',
      'As part of our educational services, we provide teaching and learning programmes, examinations, extracurricular activities, pastoral care, educational visits, safeguarding services, and community events.',
    ],
  },
  {
    title: '2. Contact Details',
    paragraphs: [
      'British International School of Tabuk (BIST) can be contacted at: Phone: +966 (14) 4411088 x 83103. Email: admin@bis-tabuk.org. Postal Address: British International School of Tabuk, P.O. Box 100, Tabuk, Kingdom of Saudi Arabia.',
      'If you would like more information about how your personal data is used, or if you wish to exercise any of your data protection rights, you may contact the School Administration.',
    ],
  },
  {
    title: '3. Personal Data to Be Collected',
    paragraphs: [
      'BIST collects different types of personal data to provide education, support student wellbeing, ensure safeguarding, and fulfil legal and regulatory obligations. Families are informed about the collection of personal data before or at the time of collection.',
      'General personal data may include student, parent, and guardian names, residential addresses, telephone numbers and email addresses, passport copies, National IDs, Iqama details, admission and enrolment records, academic assessments, attendance records, pastoral records, fee records, school system accounts, photographs, videos, and CCTV recordings.',
      'Sensitive personal data may include medical and health information, allergies, medications, vaccinations, emergency medical details, Special Educational Needs records, safeguarding and child protection information, nationality, religion, biometric information where used, and other information considered sensitive under applicable legislation.',
      'BIST may also collect information from previous schools, educational authorities, regulatory bodies, school websites, digital platforms, cookies, login records, and usage analytics.',
    ],
  },
  {
    title: '4. How We Collect and Use Personal Data',
    paragraphs: [
      'Personal data may be collected directly from students, parents, or guardians through admission and enrolment forms, school records, meetings, interviews, emails, written correspondence, telephone conversations, online forms, and portals.',
      'Personal data may also be collected indirectly through school websites, digital learning platforms, cookies, analytics, CCTV, security systems, previous schools, educational institutions, government bodies, and regulatory authorities where required.',
      'BIST processes personal data for lawful purposes including delivering education, managing admissions and enrolment, producing reports, communicating with parents, protecting student welfare, supporting safeguarding, managing finances, meeting legal obligations, and maintaining school security.',
      'BIST may seek consent for student photographs and videos in school publications, promotional materials, newsletters, websites, and official social media channels. Consent may be withdrawn at any time.',
      'BIST collects only the personal data necessary for the purposes described in this policy and encourages parents and guardians to notify the school promptly of any changes.',
    ],
  },
  {
    title: '5. Personal Data Processing',
    paragraphs: [
      'Personal data is processed only for purposes directly related to education, student welfare, safeguarding, administration, communication, and the safe operation of the school.',
      'Processing may include collecting, recording, storing, organising, using, sharing, updating, archiving, and securely deleting personal data. All processing activities are conducted lawfully under the PDPL and limited to what is necessary.',
    ],
  },
  {
    title: '6. Data Sharing and Use of Processors',
    paragraphs: [
      'BIST may share personal data where necessary and lawful, including with the Ministry of Education, relevant educational authorities, Noor, MADARES, approved educational platforms, previous or future schools, universities, examination boards, government departments, regulatory authorities, and safeguarding agencies where required by law.',
      'BIST may engage approved service providers for information technology support, cloud storage, learning management systems, payment processing, and professional advisory services. Providers are required to protect personal data and comply with applicable requirements.',
      'Where personal data is transferred outside the Kingdom of Saudi Arabia, BIST will ensure that appropriate safeguards are implemented in accordance with PDPL requirements.',
    ],
  },
  {
    title: '7. Data Storage, Retention and Destruction',
    paragraphs: [
      'Personal data is stored securely either on school systems or through approved service providers.',
      'Personal data is retained only for as long as necessary to fulfil educational, legal, regulatory, safeguarding, or administrative purposes. CCTV recordings may be retained for a limited period before automatic deletion unless required for investigation or legal purposes.',
      'When personal data is no longer required, it will be securely deleted, destroyed, or anonymised.',
    ],
  },
  {
    title: '8. Security Measures',
    paragraphs: [
      'BIST implements appropriate technical, organisational, and administrative safeguards to protect personal data from unauthorised access, loss, misuse, alteration, or disclosure.',
      'These safeguards may include secure storage systems, user authentication, access controls, password protection, encryption technologies, monitoring and auditing, staff training, confidentiality requirements, and secure disposal of records.',
    ],
  },
  {
    title: '9. Your Rights',
    paragraphs: [
      'Under the Saudi Personal Data Protection Law (PDPL), students, parents, and guardians may have the right to be informed, access personal data held by the school, request correction, request deletion where legally permissible, withdraw consent for optional processing, and submit complaints.',
      'Some rights may be limited where legal, safeguarding, or regulatory obligations apply. Students will be informed, where appropriate, about how their personal data is used in a manner suitable to their age and understanding.',
    ],
  },
  {
    title: '10. Complaints and Objections',
    paragraphs: [
      'If you have concerns regarding the handling of your personal data, you should first contact the School Administration or the Data Protection Officer.',
      'If you are not satisfied with the school response, you may submit a complaint to the Saudi Data & AI Authority (SDAIA) through the National Data Governance Platform.',
    ],
  },
  {
    title: '11. Updates',
    paragraphs: [
      'This Privacy Policy will be reviewed periodically and updated whenever necessary to reflect legal, operational, or regulatory changes.',
      'Any significant updates will be communicated to parents, guardians, staff, and other relevant stakeholders through official school communication channels.',
      'British International School of Tabuk (BIST), Kingdom of Saudi Arabia. Privacy Policy - 2026.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      subtitle="How BIST collects, uses, protects, stores, and shares personal data in accordance with Saudi PDPL requirements."
      effectiveLabel="Privacy Policy - 2026"
      pdfHref="/policies/privacy-policy.pdf"
      sections={sections}
    />
  );
}
