"use client";

import { fadeUp, inViewProps, staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";

const BlogClient = () => {
  return (
    <div className="container-xl py-10 lg:py-16">
      <motion.div {...inViewProps} variants={fadeUp} className="space-y-3 mb-12">
        <h1 className="text-3xl font-bold uppercase lg:text-4xl">
          Our <span className="text-primary">Blog</span>
        </h1>
        <div className="flex items-center gap-1">
          <span className="inline-block w-16 h-1 bg-primary rounded-full" />
          <span className="inline-block w-4 h-1 bg-primary rounded-full" />
          <span className="inline-block w-2 h-1 bg-primary rounded-full" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
          Insights, guides, and updates from the Speed Xpress team.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        {...inViewProps}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.slug}
            variants={staggerItem}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogClient;
