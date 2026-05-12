"use client";

import { motion } from "framer-motion";

const HeroVideo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800"
    >
      {/* autoPlay + muted + playsInline is the correct cross-browser combo.
          No need for a useRef + video.play() hack — the browser handles it. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src="/assets/videos/logistics.mp4"
        className="w-full object-cover sm:h-[40rem]"
        aria-label="Speed Xpress logistics showcase video"
      />
    </motion.div>
  );
};

export default HeroVideo;
