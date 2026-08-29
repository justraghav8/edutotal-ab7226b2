import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    content: `Welcome to Edu-Total ("Edu-Total", "Company", "we", "our", or "us"). We are committed to protecting the privacy, confidentiality, and security of the personal information entrusted to us. This Privacy Policy explains how we collect, use, disclose, store, and protect your personal information when you visit our website, contact us through our website or other communication channels, register for our educational consulting services, events, webinars, or training programs, apply for educational opportunities, or engage with our institutional consulting services.\n\nBy accessing or using our website and services, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    title: "2. About Edu-Total",
    content: `Edu-Total is an educational consulting organization that partners with students, universities, colleges, schools, educational institutions, corporate organizations, and industry partners. Our services include educational consulting, academic advisory, career guidance, university partnerships, institutional consulting, professional development programs, workshops, conferences, corporate & faculty training, and student support services.`,
  },
  {
    title: "3. Information We Collect",
    content: `We collect information that you voluntarily provide as well as certain information automatically collected through your interaction with our website.\n\nPersonal Information: Depending on the services you use, we may collect your full name, email address, mobile number, postal address, date of birth, gender, educational qualifications, employment details, identity documents, passport or visa information, photographs, and resume/CV.\n\nAcademic Information: We may collect educational background, academic records, certificates, transcripts, entrance examination details, course preferences, career interests, university preferences, and scholarship information.\n\nInstitutional Information: If you represent an educational institution or organization, we may collect institution name, organization name, department, designation, official email address, business contact information, and partnership details.\n\nInformation Submitted Through Forms: When you complete forms on our website, we may collect contact form submissions, admission enquiries, partnership enquiries, event registrations, webinar registrations, training registrations, support requests, and feedback forms.\n\nAutomatically Collected Information: When you visit our website, we may automatically collect your IP address, browser type, browser version, device information, operating system, pages visited, date and time of access, time spent on pages, referral URLs, clickstream data, session information, cookies, and analytics data.`,
  },
  {
    title: "4. How We Use Your Information",
    content: `We use your information for legitimate educational and business purposes, including to provide educational consulting services, respond to enquiries, process applications, recommend educational opportunities, arrange meetings and consultations, conduct webinars, workshops, and training programs, improve our website and services, provide customer support, communicate important service updates, maintain business records, comply with applicable legal obligations, detect fraud or misuse, protect our legal rights, improve user experience, and send newsletters, educational updates, and promotional communications where permitted by law.`,
  },
  {
    title: "5. Legal Basis for Processing",
    content: `Where applicable, we process personal information based on one or more of the following lawful grounds: your consent, performance of a contract, compliance with legal obligations, legitimate business interests, and protection of vital interests.`,
  },
  {
    title: "6. Cookies and Similar Technologies",
    content: `Our website uses cookies and similar technologies to ensure proper website functionality, remember user preferences, improve website performance, analyse website traffic, enhance user experience, and maintain website security.\n\nWe may use essential cookies, functional cookies, analytics cookies, performance cookies, and preference cookies. You may disable cookies through your browser settings; however, certain website features may not function properly.`,
  },
  {
    title: "7. Third-Party Services",
    content: `We may use trusted third-party service providers to support our operations and improve our services. These may include services for website hosting, website analytics, email communications, customer relationship management (CRM), webinar platforms, online forms, cloud storage, educational platforms, video conferencing, and payment processing where applicable. These providers process information only for authorized purposes and in accordance with applicable privacy laws.`,
  },
  {
    title: "8. How We Share Information",
    content: `We do not sell your personal information. We may share your information only when necessary with universities, colleges, educational institutions, scholarship providers, corporate training partners, professional advisors, auditors, legal consultants, technology service providers, and government authorities where required by law. All disclosures are limited to what is necessary for the intended purpose.`,
  },
  {
    title: "9. International Data Transfers",
    content: `Where necessary, your personal information may be transferred to or processed in countries outside India for educational admissions, institutional collaborations, cloud hosting, or other legitimate business purposes. Where such transfers occur, we implement reasonable safeguards to protect your information in accordance with applicable laws.`,
  },
  {
    title: "10. Data Security",
    content: `We implement appropriate technical, administrative, and organizational safeguards to protect personal information, including secure servers, encryption where appropriate, access controls, password protection, firewall protection, secure cloud infrastructure, regular monitoring, and employee confidentiality obligations. While we strive to protect your information, no method of electronic transmission or storage is completely secure.`,
  },
  {
    title: "11. Data Retention",
    content: `We retain personal information only for as long as necessary to deliver our services, complete admissions or consulting processes, fulfil contractual obligations, maintain business records, comply with legal requirements, resolve disputes, and enforce our legal rights. When information is no longer required, it is securely deleted or anonymized where appropriate.`,
  },
  {
    title: "12. Your Privacy Rights",
    content: `Subject to applicable law, including the Digital Personal Data Protection Act, 2023 (India), you may have the right to access your personal information, correct inaccurate information, update incomplete information, request deletion of personal data, withdraw consent, object to certain processing activities, request a copy of your personal information where applicable, and lodge a grievance regarding the processing of your personal data.\n\nTo exercise your rights, please contact us using the details provided below.`,
  },
  {
    title: "13. Children's Privacy",
    content: `Our services are intended primarily for students, educational institutions, and professionals. Where we collect personal information relating to individuals under the age of 18, we do so in accordance with applicable laws and, where required, with appropriate consent from a parent, guardian, or authorized educational institution.`,
  },
  {
    title: "14. Third-Party Websites",
    content: `Our website may contain links to external websites operated by third parties. We are not responsible for the privacy practices, content, or security of those websites. We encourage users to review the privacy policies of any third-party websites before providing personal information.`,
  },
  {
    title: "15. Email Communications",
    content: `If you contact us or subscribe to our communications, we may send educational updates, newsletters, event invitations, training announcements, service notifications, and marketing communications where permitted. You may opt out of promotional emails at any time by using the unsubscribe link included in our emails or by contacting us directly.`,
  },
  {
    title: "16. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy periodically to reflect changes in our services, legal obligations, or business practices. The revised version will be posted on this page with an updated Last Updated date. We encourage users to review this Privacy Policy periodically. Your continued use of our website after changes become effective constitutes your acceptance of the updated Privacy Policy.`,
  },
  {
    title: "17. Grievance Officer",
    content: `For questions, concerns, or complaints regarding this Privacy Policy or the processing of your personal information, please contact our Grievance Officer at nishit@edu-total.com.`,
  },
  {
    title: "18. Contact Us",
    content: `If you have any questions regarding this Privacy Policy, please contact us:\n\nWebsite: https://edu-total.com\nEmail: nishit@edu-total.com\nPhone: +91-11-41526734\nAddress: 904, Indraprakash Building, 21 Barakhamba Road, New Delhi – 110001, India`,
  },
  {
    title: "19. Governing Law",
    content: `This Privacy Policy shall be governed by and construed in accordance with the laws of India, including the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and other applicable laws. Any disputes arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts located in New Delhi, India.`,
  },
  {
    title: "20. Consent",
    content: `By using our website and services, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy. If you do not agree with this Privacy Policy, please discontinue the use of our website and services.`,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="privacy-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#62AD4E]" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#privacy-grid)" />
          </svg>
        </div>
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[#62AD4E]/20 p-4">
              <Shield className="h-8 w-8 text-[#62AD4E]" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Last updated: August 29, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border bg-card p-8 shadow-sm md:p-12">
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="scroll-mt-24"
                  >
                    <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 rounded-xl bg-muted p-6 md:p-8">
                <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Contact Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <a href="mailto:nishit@edu-total.com" className="flex items-center gap-3 text-muted-foreground hover:text-[#62AD4E] transition-colors">
                    <Mail className="h-5 w-5 text-[#62AD4E]" />
                    <span>nishit@edu-total.com</span>
                  </a>
                  <a href="tel:+911141526734" className="flex items-center gap-3 text-muted-foreground hover:text-[#62AD4E] transition-colors">
                    <Phone className="h-5 w-5 text-[#62AD4E]" />
                    <span>+91-11-41526734</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground md:col-span-2">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-[#62AD4E]" />
                    <span>904, Indraprakash Building, 21 Barakhamba Road, New Delhi – 110001, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
