"use client";

import { useTranslation } from "@/lib/i18n";
import { fadeUp, inViewProps } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

// ── Types ─────────────────────────────────────────────────────────────────────
type FAQItem = { q: string; a: string };

// ── Single accordion item ─────────────────────────────────────────────────────
const AccordionItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={[
      "rounded-xl border transition-colors duration-200 overflow-hidden",
      isOpen
        ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
    ].join(" ")}
  >
    {/* Question row — button for full a11y */}
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
      id={`faq-question-${index}`}
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl"
    >
      <span className="text-sm sm:text-base font-medium leading-snug">
        {item.q}
      </span>

      {/* Animated chevron */}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="shrink-0 text-primary"
        aria-hidden="true"
      >
        <MdKeyboardArrowDown size={22} />
      </motion.span>
    </button>

    {/* Answer — AnimatePresence handles mount/unmount; motion.div handles height */}
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: "hidden" }}
        >
          <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── Accordion list — one open at a time ───────────────────────────────────────
const Accordion = ({ items }: { items: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={`faq-${i}`}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
};

// ── Tab button ────────────────────────────────────────────────────────────────
const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
      active
        ? "bg-primary text-white shadow-sm"
        : "text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-gray-700",
    ].join(" ")}
  >
    {label}
  </button>
);

// ── Main FAQ section ──────────────────────────────────────────────────────────
const FAQ = () => {
  const t = useTranslation();
  const faq = t.home.faq;
  const [tab, setTab] = useState<"customer" | "rider" | "merchant">("customer");

  const items =
    tab === "customer"
      ? (faq.customer as FAQItem[])
      : tab === "rider"
        ? (faq.rider as FAQItem[])
        : (faq.merchant as FAQItem[]);

  return (
    <section className="container-xl pb-24">
      {/* Section header */}
      <motion.div
        {...inViewProps}
        variants={fadeUp}
        className="text-center space-y-2 mb-10"
      >
        <div className="flex justify-center items-center gap-2">
          <span
            className="w-1 h-5 bg-primary rounded-full"
            aria-hidden="true"
          />
          <p className="text-sm font-bold tracking-widest uppercase text-primary">
            {faq.badge}
          </p>
        </div>
        <h2 className="text-3xl lg:text-5xl font-extrabold leading-snug">
          {faq.title} <span className="text-primary">{faq.titleHighlight}</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Illustration */}
        <motion.div
          {...inViewProps}
          variants={fadeUp}
          className="max-md:order-last place-self-center"
        >
          <Image
            src="/assets/images/faq.png"
            width={480}
            height={480}
            alt="FAQ illustration"
            className="w-full max-w-xl mx-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Tabs + Accordion */}
        <motion.div
          {...inViewProps}
          variants={fadeUp}
          custom={0.1}
          className="space-y-4"
        >
          {/* Tab switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
            <TabButton
              label={faq.customerTab}
              active={tab === "customer"}
              onClick={() => setTab("customer")}
            />
            <TabButton
              label={faq.riderTab}
              active={tab === "rider"}
              onClick={() => setTab("rider")}
            />
            <TabButton
              label={faq.merchantTab}
              active={tab === "merchant"}
              onClick={() => setTab("merchant")}
            />
          </div>

          {/* Accordion with tab-switch animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion items={items} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
