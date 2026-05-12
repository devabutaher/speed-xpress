"use client";

import { reviewsData } from "@/data/reviewsData";
import { fadeUp, inViewProps } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const AUTOPLAY_INTERVAL = 4000;

const Review = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const total = reviewsData.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(((next % total) + total) % total);
    },
    [total],
  );

  const prev = () => go(current - 1, -1);
  const next = useCallback(() => go(current + 1, 1), [current, go]);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const review = reviewsData[current];

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

  return (
    <section className="container-xl pb-20 space-y-10">
      <motion.h2
        {...inViewProps}
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center"
      >
        What Our <span className="text-primary">Clients</span> Say
      </motion.h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Review card */}
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
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-card"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Avatar */}
                <div className="shrink-0">
                  <Image
                    src={review.img}
                    width={100}
                    height={100}
                    alt={review.Name}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/30"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <AiFillStar key={i} className="text-primary text-lg" />
                      ))}
                    </div>
                    <FaQuoteRight className="text-primary/40 text-2xl shrink-0" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {review.ReviewDetails}
                  </p>

                  <div>
                    <p className="font-semibold">
                      By <span className="text-primary">{review.Name}</span>
                    </p>
                    <p className="text-sm text-gray-500">{review.Profession}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex gap-2">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to review ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary/50",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Arrow buttons */}
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
