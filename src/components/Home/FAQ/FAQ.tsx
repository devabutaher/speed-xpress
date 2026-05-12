"use client";

import { fadeUp, inViewProps } from "@/lib/motion";
import { Accordion, AccordionItem, Tab, Tabs } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const customerFAQs = [
  {
    q: "How long does it take for my package to be delivered?",
    a: "Delivery times vary depending on the destination and the service you choose. We offer standard and express options, and our team will provide you with accurate estimates based on your specific requirements.",
  },
  {
    q: "Can I request a quote for my shipping needs?",
    a: "Absolutely! Use our online quote request form to provide shipment details such as origin, destination, weight, and dimensions. Our team will respond with a customized quote.",
  },
  {
    q: "How do you ensure the safety and security of my goods?",
    a: "We have robust security measures including surveillance systems, trained personnel, and secure facilities. We work with trusted partners to ensure safe handling and transportation.",
  },
  {
    q: "Can you accommodate special handling requirements or sensitive items?",
    a: "Yes — whether you have fragile goods, hazardous materials, temperature-sensitive products, or oversized items, we have the expertise and resources to handle them safely.",
  },
];

const riderFAQs = [
  {
    q: "How do I sign up to become a rider?",
    a: "Visit our Sign Up page and register as a Rider. Follow the on-screen instructions, provide the necessary information, and submit required documents. Once approved, you can start taking assignments.",
  },
  {
    q: "What types of vehicles are accepted for deliveries?",
    a: "We accept bicycles, scooters, motorbikes, and cars. Vehicle requirements may vary by location. Ensure your vehicle meets our safety and reliability criteria.",
  },
  {
    q: "How and when do I get paid for deliveries?",
    a: "Payments are processed on a regular schedule based on distance, delivery time, and applicable bonuses. You'll receive earnings through the payment method set up in your rider account.",
  },
  {
    q: "What support is available if I encounter issues during a delivery?",
    a: "Our support team is available through the app or website to assist with any delivery issues. We also provide training resources to help you handle common challenges effectively.",
  },
];

const FAQAccordion = ({ items }: { items: typeof customerFAQs }) => (
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
            FAQ
          </p>
        </div>
        <h2 className="text-3xl lg:text-5xl font-extrabold">
          Get Your <span className="text-primary">Queries Solved</span>
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
            <Tab key="customer" title="For Customers" />
            <Tab key="rider" title="For Riders" />
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
                items={tab === "customer" ? customerFAQs : riderFAQs}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
