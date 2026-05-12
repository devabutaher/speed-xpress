"use client";

import { fadeLeft, fadeRight } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  return (
    <section className="container-xl py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Info card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-card max-w-xl w-full space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold">
              PROFILE <span className="text-primary">INFO</span>
            </h1>
            <UpdateProfileModal />
          </div>
          <ProfileInfo />
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          className="flex items-center justify-center lg:flex-1"
        >
          <Image
            src="/assets/images/profile.png"
            width={480}
            height={480}
            alt="Profile illustration"
            className="w-full max-w-sm drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
