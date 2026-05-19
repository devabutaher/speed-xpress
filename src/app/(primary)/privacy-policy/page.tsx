import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Speed Xpress collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-xl py-10 lg:py-16">
      <h1 className="text-3xl font-bold uppercase lg:text-4xl mb-2">
        Privacy <span className="text-primary">Policy</span>
      </h1>
      <div className="flex items-center gap-1 mb-10">
        <span className="inline-block w-16 h-1 bg-primary rounded-full" />
        <span className="inline-block w-4 h-1 bg-primary rounded-full" />
        <span className="inline-block w-2 h-1 bg-primary rounded-full" />
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-3xl space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
        <p>
          <strong>Last updated:</strong> May 2026
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          1. Information We Collect
        </h2>
        <p>
          We collect information you provide directly to us, including your
          name, email address, phone number, shipping address, and payment
          information when you create an account or place an order. We also
          automatically collect certain technical information such as IP
          address, browser type, and usage data.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          2. How We Use Your Information
        </h2>
        <p>
          We use the information we collect to process and deliver your parcels,
          communicate with you about your shipments, improve our services, and
          send you relevant updates and promotional materials (with your
          consent).
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          3. Data Sharing & Disclosure
        </h2>
        <p>
          We do not sell your personal information. We may share your data with
          trusted third parties such as delivery partners, payment processors,
          and service providers who help us operate our platform, subject to
          strict confidentiality agreements.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          4. Data Security
        </h2>
        <p>
          We implement industry-standard security measures including SSL
          encryption, secure data storage, and regular security audits to
          protect your personal information from unauthorized access,
          alteration, or disclosure.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          5. Your Rights
        </h2>
        <p>
          You have the right to access, update, or delete your personal
          information at any time. You can manage your data through your account
          settings or by contacting us directly. You may also opt out of
          marketing communications at any time.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          6. Cookies
        </h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience, analyze site traffic, and understand where our
          visitors come from. You can control cookie preferences through your
          browser settings.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          7. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:code.abutaher@gmail.com"
            className="text-primary hover:underline"
          >
            code.abutaher@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
