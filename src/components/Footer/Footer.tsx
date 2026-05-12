"use client";

import { interpolate, useTranslation } from "@/lib/i18n";
import Link from "next/link";

// ── Social icons ──────────────────────────────────────────────────────────────
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
    <circle cx="15" cy="15" r="4" />
    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
  </svg>
);

// ── Footer link ───────────────────────────────────────────────────────────────
const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
    >
      {label}
    </Link>
  </li>
);

// ── Social link ───────────────────────────────────────────────────────────────
const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    aria-label={label}
    className="text-gray-400 hover:text-primary transition-colors duration-200"
  >
    {children}
  </Link>
);

// ── Footer ────────────────────────────────────────────────────────────────────
// NOTE: This is a Server Component — no "use client" needed.
// ThemeSwitch has been moved to the Navbar where it's more accessible.
const Footer = () => {
  const t = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* ── Brand column ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block text-3xl font-extrabold tracking-tight"
            >
              Speed<span className="text-primary">Xpress</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              {t.app.description}
            </p>
            {/* Contact info */}
            <div className="space-y-1 pt-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {t.footer.needHelp}
              </p>
              <a
                href="tel:+8801905043478"
                className="block text-sm text-primary font-medium hover:underline"
              >
                +880 1905-043478
              </a>
              <a
                href="mailto:teamcodeartisans@gmail.com"
                className="block text-sm text-primary font-medium hover:underline"
              >
                teamcodeartisans@gmail.com
              </a>
            </div>
          </div>

          {/* ── Link columns ── */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {t.footer.company}
              </h3>
              <ul className="space-y-2">
                <FooterLink href="/about-us" label={t.footer.links.aboutUs} />
                <FooterLink
                  href="/contact-us"
                  label={t.footer.links.contactUs}
                />
                <FooterLink href="/features" label={t.footer.links.careers} />
                <FooterLink href="/features" label={t.footer.links.faq} />
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {t.footer.services}
              </h3>
              <ul className="space-y-2">
                <FooterLink
                  href="/features"
                  label={t.footer.links.airFreight}
                />
                <FooterLink
                  href="/features"
                  label={t.footer.links.droneFreight}
                />
                <FooterLink
                  href="/features"
                  label={t.footer.links.groundFreight}
                />
                <FooterLink
                  href="/features"
                  label={t.footer.links.projectLogistics}
                />
              </ul>
            </div>

            {/* Get in touch */}
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {t.footer.getInTouch}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/register"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {interpolate(t.footer.copyright, { year })}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <SocialLink href="#" label="Twitter">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="#" label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="#" label="Facebook">
              <FacebookIcon />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
