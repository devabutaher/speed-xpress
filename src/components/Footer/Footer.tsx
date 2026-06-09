"use client";

import { interpolate, useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";

// 1. SocialLink Component
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
    target={href.startsWith("mailto:") ? undefined : "_blank"} // Email chada baki gulo notun tab-e open hobe
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-primary transition-colors duration-200 display-inline-block"
  >
    {children}
  </Link>
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

// ── Footer ────────────────────────────────────────────────────────────────────
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
                +880 1626441900
              </a>
              <a
                href="mailto:code.abutaher@gmail.com"
                className="block text-sm text-primary font-medium hover:underline"
              >
                code.abutaher@gmail.com
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
                <FooterLink href="/blog" label={t.nav.blog} />
                <FooterLink
                  href="/privacy-policy"
                  label={t.footer.links.privacyPolicy}
                />
                <FooterLink
                  href="/terms"
                  label={t.footer.links.termsOfService}
                />
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
            {/* GitHub */}
            <SocialLink href="https://github.com/devabutaher" label="GitHub">
              <FaGithub className="w-5 h-5" />
            </SocialLink>

            {/* LinkedIn */}
            <SocialLink
              href="https://linkedin.com/in/devabutaher"
              label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </SocialLink>

            {/* Portfolio */}
            <SocialLink href="https://abutaher.vercel.app" label="Portfolio">
              <IoGlobeOutline className="w-5.5 h-5.5" />
            </SocialLink>

            {/* Email */}
            <SocialLink href="mailto:code.abutaher@gmail.com" label="Email">
              <FaRegEnvelope className="w-5 h-5" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
