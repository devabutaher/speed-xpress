"use client";

import { useTranslation } from "@/lib/i18n";
import { fadeDown, fadeUp, inViewProps, staggerContainer } from "@/lib/motion";
import TrackParcel from "@/ui/TrackParcel";
import { motion } from "framer-motion";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  const t = useTranslation();

  return (
    <section className="section-padding pt-12 md:pt-16">
      <div className="container-xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Badge */}
          <motion.div variants={fadeDown} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              <span className="live-dot" aria-hidden="true" />
              {t.home.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={0.05}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          >
            {t.home.hero.title}{" "}
            <span className="text-gradient-brand block sm:inline">
              {t.home.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed"
          >
            {t.home.hero.description}
          </motion.p>

          {/* Track parcel input */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            className="flex justify-center pt-2"
          >
            <TrackParcel />
          </motion.div>
        </motion.div>

        {/* Hero video */}
        <motion.div {...inViewProps} variants={fadeUp} className="mt-14">
          <HeroVideo />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
