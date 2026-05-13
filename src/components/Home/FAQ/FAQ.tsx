"use client";

import { useTranslation } from "@/lib/i18n";
import { fadeUp, inViewProps } from "@/lib/motion";
import { Accordion, AccordionItem, Tab, Tabs } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type FAQItem = { q: string; a: string };

const FAQAccordion = ({ items }: { items: FAQItem[] }) => (
  <Accordion
    variant="shadow"
    defaultExpandedKeys={["0"]}
    className="dark:bg-gray-900 rounded-xl"
    itemClasses={{
      title: "font-medium text-sm sm:text-base",
      content: "text-gray-500 dark:text-gray-400 text-sm pb-3",
    }}
  >
    {items.map((item, i) => (
      <AccordionItem key={String(i)} aria-label={item.q} title={item.q}>
        {item.a}
      </AccordionItem>
    ))}
  </Accordion>
);

const FAQ = () => {
  const t = useTranslation();
  const faq = t.home.faq;
  const [tab, setTab] = useState("customer");

  return (
    <section className="container-xl pb-20">
      {/* Header */}
      <motion.div
        {...inViewProps}
        variants={fadeUp}
        className="text-center space-y-2 mb-10"
      >
        <div className="flex justify-center items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full" />
          <p className="text-sm font-bold tracking-widest uppercase text-primary">
            {faq.badge}
          </p>
        </div>
        <h2 className="text-3xl lg:text-5xl font-extrabold">
          {faq.title} <span className="text-primary">{faq.titleHighlight}</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Image */}
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
            className="w-full max-w-sm mx-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Accordion */}
        <motion.div {...inViewProps} variants={fadeUp} custom={0.1}>
          <Tabs
            fullWidth
            color="primary"
            radius="sm"
            aria-label="FAQ tabs"
            selectedKey={tab}
            onSelectionChange={(k) => setTab(String(k))}
            className="mb-4"
          >
            <Tab key="customer" title={faq.customerTab} />
            <Tab key="rider" title={faq.riderTab} />
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FAQAccordion
                items={(tab === "customer" ? faq.customer : faq.rider) as FAQItem[]}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
