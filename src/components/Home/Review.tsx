"use client";

import { reviewsData } from "@/data/reviewsData";
import { fadeUp, inViewProps } from "@/lib/motion";
import { useTranslation } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const AUTOPLAY_INTERVAL = 4000;

const Review = () => {
  const t = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [step, setStep] = useState(1);
  const total = reviewsData.length;

  useEffect(() => {
    const check = () => setStep(window.innerWidth >= 768 ? 2 : 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const maxStart = useMemo(() => Math.max(0, total - step), [total, step]);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(Math.min(Math.max(0, next), maxStart));
    },
    [maxStart],
  );

  const prev = () => go(current - step, -1);
  const next = useCallback(() => go(current + step, 1), [current, step, go]);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const visibleReviews = useMemo(
    () => reviewsData.slice(current, current + step),
    [current, step],
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const card = (review: (typeof reviewsData)[0]) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-card h-full">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center h-full">
        <div className="shrink-0">
          <Image
            src={review.img}
            width={80}
            height={80}
            alt={review.Name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-primary/30"
          />
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar key={i} className="text-primary text-base" />
              ))}
            </div>
            <FaQuoteRight className="text-primary/40 text-xl shrink-0" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
            {review.ReviewDetails}
          </p>
          <div>
            <p className="font-semibold text-sm">
              {t.home.review.by} <span className="text-primary">{review.Name}</span>
            </p>
            <p className="text-xs text-gray-500">{review.Profession}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="container-xl pb-20 space-y-10">
      <motion.h2
        {...inViewProps}
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center"
      >
        {t.home.review.title}
      </motion.h2>

      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {visibleReviews.map((review) => (
                <div key={`${current}-${review.Name}`}>{card(review)}</div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(total / step) }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i * step, i > current / step ? 1 : -1)}
                aria-label={`Go to review group ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  Math.floor(current / step) === i
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary/50",
                ].join(" ")}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <MdKeyboardArrowLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <MdKeyboardArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
