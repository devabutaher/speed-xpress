import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and updates from the Speed Xpress team — parcel management tips, merchant guides, and logistics news.",
};

export default function BlogPage() {
  return <BlogClient />;
}
