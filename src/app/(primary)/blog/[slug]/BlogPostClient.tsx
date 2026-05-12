"use client";

import { fadeUp, inViewProps } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import SecondaryButton from "@/ui/SecondaryButton";

interface BlogPostClientProps {
  slug: string;
}

const BlogPostClient = ({ slug }: BlogPostClientProps) => {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-xl py-10 lg:py-16">
      <motion.div {...inViewProps} variants={fadeUp} className="mb-8">
        <Link href="/blog">
          <SecondaryButton size="sm">← Back to Blog</SecondaryButton>
        </Link>
      </motion.div>

      <motion.article {...inViewProps} variants={fadeUp} className="max-w-3xl mx-auto">
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <span>{post.author}</span>
          <span>•</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none leading-relaxed text-gray-600 dark:text-gray-400 space-y-4">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-xl font-bold text-dark dark:text-light mt-8 mb-3"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-1">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPostClient;
