import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing the use of the Speed Xpress parcel management platform.",
};

export default function TermsPage() {
  return (
    <div className="container-xl py-10 lg:py-16">
      <h1 className="text-3xl font-bold uppercase lg:text-4xl mb-2">
        Terms of <span className="text-primary">Service</span>
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
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using the Speed Xpress platform, you agree to be bound
          by these Terms of Service. If you do not agree with any part of these
          terms, you may not use our services.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          2. Account Registration
        </h2>
        <p>
          You must provide accurate and complete information when creating an
          account. You are responsible for maintaining the confidentiality of
          your login credentials and for all activities that occur under your
          account. Notify us immediately of any unauthorized use.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          3. Services
        </h2>
        <p>
          Speed Xpress provides a parcel management platform that connects
          senders, recipients, merchants, and delivery riders. We facilitate the
          creation, tracking, and management of parcels but are not liable for
          the actions of independent delivery partners.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          4. User Obligations
        </h2>
        <p>
          You agree not to use the platform for any unlawful purpose, to not
          upload prohibited items, to provide accurate shipment information, and
          to comply with all applicable laws and regulations regarding the
          shipment of goods.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          5. Payment Terms
        </h2>
        <p>
          All fees for services are clearly displayed before you confirm a
          shipment. Payments are processed securely through our payment
          partners. Refunds are handled in accordance with our refund policy,
          which is available upon request.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          6. Limitation of Liability
        </h2>
        <p>
          Speed Xpress shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages arising from your use of
          the platform. Our total liability is limited to the amount paid for
          the specific service giving rise to the claim.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          7. Termination
        </h2>
        <p>
          We reserve the right to suspend or terminate your account at any time
          for violation of these terms or for any other reason. Upon
          termination, your right to use the platform immediately ceases.
        </p>

        <h2 className="text-xl font-bold text-dark dark:text-light">
          8. Contact
        </h2>
        <p>
          For questions about these terms, contact us at{" "}
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
