import React from "react";
import { motion } from "framer-motion";
import Connect from "./Connect";

function Banner() {
  return (
    <div className="banner h-[90vh] flex flex-col justify-center items-center">
      <div className="md:text-[80px] text-[32px] font-bold tracking-[12px]">
        UNILINKS<span className="text-[#1DB954]">.</span>
      </div>
      <div className="whitespace-nowrap">
        Connect Everywhere with One{" "}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.5,
            delay: 0.25,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="inline text-[#1DB954]"
        >
          Click
        </motion.div>{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 inline"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
          />
        </svg>
      </div>

      <Connect />
    </div>
  );
}

export default Banner;
