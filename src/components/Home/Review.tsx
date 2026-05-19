"use client";

import { reviewsData } from "@/data/reviewsData";
import { useTranslation } from "@/lib/i18n";
import { fadeUp, inViewProps } from "@/lib/motion";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const AUTOPLAY_INTERVAL = 4000;

// ── Single card ───────────────────────────────────────────────────────────────
const ReviewCard = ({ review }: { review: (typeof reviewsData)[0] }) => {
  const t = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-card h-full flex flex-col gap-4 mx-2">
      {/* Stars + quote */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <AiFillStar key={i} className="text-primary text-base" />
          ))}
        </div>
        <FaQuoteRight className="text-primary/30 text-xl" aria-hidden="true" />
      </div>

      {/* Review text */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 line-clamp-4">
        {review.ReviewDetails}
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <Image
          src={review.img}
          width={44}
          height={44}
          alt={review.Name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
        />
        <div>
          <p className="font-semibold text-sm leading-tight">
            {t.home.review.by}{" "}
            <span className="text-primary">{review.Name}</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {review.Profession}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const Review = () => {
  const t = useTranslation();

  // Create autoplay plugin instance using useRef to maintain reference
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_INTERVAL, stopOnInteraction: false }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [autoplay.current],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Pause/play autoplay on hover
  const handleMouseEnter = useCallback(() => {
    autoplay.current.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    autoplay.current.play();
  }, []);

  return (
    <section className="container-xl pb-24 space-y-10">
      <motion.h2
        {...inViewProps}
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center"
      >
        {t.home.review.title}
      </motion.h2>

      <div
        className="space-y-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Embla Carousel */}
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {reviewsData.map((review, index) => (
              <div
                key={index}
                className="embla__slide sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-1">
          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Reviews">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Go to review ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary/50",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous reviews"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <MdKeyboardArrowLeft size={22} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next reviews"
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
