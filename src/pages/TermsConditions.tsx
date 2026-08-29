import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Mail, Phone, MapPin } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `Welcome to Edu-Total ("Edu-Total", "Company", "we", "our", or "us"). These Terms & Conditions ("Terms") govern your access to and use of our website, educational consulting services, training programs, events, and related services. By accessing our website or using our services, you agree to be legally bound by these Terms. If you do not agree with any part of these Terms, please discontinue using our website and services.`,
  },
  {
    title: "2. About Edu-Total",
    content: `Edu-Total is an educational consulting organization providing services including, but not limited to, educational consulting, academic advisory, career guidance, university & institutional partnerships, student counselling, corporate training, faculty development programs, workshops & seminars, conferences, professional development programs, and educational support services.`,
  },
  {
    title: "3. Eligibility",
    content: `By using our website or services, you confirm that you are at least 18 years of age, or you are accessing our services under the supervision or consent of a parent, guardian, or authorized educational institution, and that the information you provide is accurate and complete.`,
  },
  {
    title: "4. Use of Our Website",
    content: `You agree to use our website only for lawful purposes. You must not violate any applicable laws or regulations, attempt unauthorized access to our systems, upload malicious software or harmful code, interfere with website functionality, copy, reproduce, or distribute website content without permission, or use automated tools to extract website data without authorization.`,
  },
  {
    title: "5. Educational Consulting Services",
    content: `Edu-Total provides consulting and advisory services intended to assist students, educational institutions, and organizations. While we strive to provide accurate guidance, admission decisions remain solely with the respective educational institutions, scholarship approvals are determined by the awarding organizations, visa approvals are subject to the decisions of the relevant government authorities, and employment opportunities cannot be guaranteed. Our recommendations are advisory in nature and should not be considered legal, financial, or immigration advice.`,
  },
  {
    title: "6. User Responsibilities",
    content: `You agree to provide accurate and up-to-date information, maintain the confidentiality of your account credentials if applicable, promptly notify us of unauthorized account use, use our services responsibly and ethically, and comply with all applicable laws.`,
  },
  {
    title: "7. Intellectual Property",
    content: `Unless otherwise stated, all content on this website, including text, graphics, images, logos, icons, documents, training materials, videos, software, and website design, is the intellectual property of Edu-Total or its licensors and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, modify, distribute, publish, or commercially exploit any content without our prior written consent.`,
  },
  {
    title: "8. User Content",
    content: `If you submit documents, feedback, testimonials, comments, or other content to Edu-Total, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content for providing our services and improving our offerings, unless otherwise agreed. You remain responsible for the legality and accuracy of any content you submit.`,
  },
  {
    title: "9. Fees and Payments",
    content: `Where applicable, fees for consulting, training programs, workshops, or other services will be communicated in advance. Payments must be made using approved payment methods. All applicable taxes are payable by the user unless stated otherwise. Failure to make payment may result in suspension or cancellation of services.`,
  },
  {
    title: "10. Cancellation and Refund Policy",
    content: `Refunds and cancellations are governed by the specific terms applicable to the service or program purchased. Unless otherwise stated, registration fees may be non-refundable, refund requests will be reviewed on a case-by-case basis, and approved refunds may take 7–14 business days to process. Certain third-party charges, government fees, or institutional fees may not be refundable.`,
  },
  {
    title: "11. Third-Party Services",
    content: `Our website may contain links to third-party websites, educational institutions, service providers, or payment gateways. We do not control or endorse the content, policies, or practices of these third parties and are not responsible for their services or actions. Users should review the terms and privacy policies of any third-party websites they access.`,
  },
  {
    title: "12. Privacy",
    content: `Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to the practices described in our Privacy Policy.`,
  },
  {
    title: "13. Disclaimer",
    content: `The information provided on our website is for general informational and educational purposes only. While we make reasonable efforts to ensure accuracy, we do not warrant that information is complete or error-free, services will be uninterrupted, website content will always be current, educational institutions will accept applications, or scholarships, admissions, visas, or employment opportunities will be granted. Users rely on the information at their own risk.`,
  },
  {
    title: "14. Limitation of Liability",
    content: `To the maximum extent permitted by law, Edu-Total shall not be liable for any direct, indirect, incidental, special, consequential damages, loss of profits, loss of business, loss of data, or business interruption arising from the use of our website or services. Our total liability shall not exceed the amount paid by the user for the specific service giving rise to the claim.`,
  },
  {
    title: "15. Indemnification",
    content: `You agree to indemnify and hold harmless Edu-Total, its directors, employees, consultants, and affiliates from any claims, damages, liabilities, losses, or expenses arising from your misuse of our services, your violation of these Terms, or your infringement of any third-party rights.`,
  },
  {
    title: "16. Suspension or Termination",
    content: `We reserve the right to suspend or terminate access to our website or services without prior notice if these Terms are violated, fraudulent or unlawful activity is suspected, or user conduct adversely affects our operations or other users. Termination does not affect any rights or obligations that accrued before termination.`,
  },
  {
    title: "17. Force Majeure",
    content: `Edu-Total shall not be liable for any delay or failure in performing its obligations due to events beyond its reasonable control, including but not limited to natural disasters, government actions, war, civil unrest, internet outages, power failures, and pandemic-related disruptions.`,
  },
  {
    title: "18. Changes to These Terms",
    content: `We reserve the right to update these Terms & Conditions at any time. Any revisions will be posted on this page with an updated Last Updated date. Continued use of our website after changes become effective constitutes acceptance of the revised Terms.`,
  },
  {
    title: "19. Governing Law and Jurisdiction",
    content: `These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts located in New Delhi, India.`,
  },
  {
    title: "20. Contact Information",
    content: `If you have any questions regarding these Terms & Conditions, please contact us:\n\nEdu-Total\nWebsite: https://edu-total.com\nEmail: nishit@edu-total.com\nPhone: +91-11-41526734\nAddress: 904, Indraprakash Building, 21 Barakhamba Road, New Delhi - 110001, India`,
  },
  {
    title: "21. Entire Agreement",
    content: `These Terms & Conditions, together with our Privacy Policy and any additional policies published on our website, constitute the entire agreement between you and Edu-Total regarding your use of our website and services. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: "22. Acceptance",
    content: `By accessing our website or using our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions.`,
  },
];

export default function TermsConditions() {
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
              <pattern id="terms-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#62AD4E]" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#terms-grid)" />
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
              <FileText className="h-8 w-8 text-[#62AD4E]" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Terms & Conditions
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
