"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (hasVisited) {
        setShow(false);
      } else {
        sessionStorage.setItem("hasVisited", "true");
        document.body.style.overflow = "hidden";
      }
    } catch (e) {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .preloader-container { display: flex; }
          html.has-visited .preloader-container { display: none !important; }
        `
      }} />
      <script dangerouslySetInnerHTML={{
        __html: `
          try {
            if (sessionStorage.getItem("hasVisited")) {
              document.documentElement.classList.add("has-visited");
            }
          } catch(e) {}
        `
      }} />
      
      <AnimatePresence>
        {show && (
          <motion.div
            key="preloader"
            className="preloader-container fixed inset-0 z-50 flex-col items-center justify-center bg-[#0a0a0a]"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              document.body.style.overflow = "";
            }}
          >
            <motion.div
              className="text-h2 font-semibold text-white mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {siteData.name}
            </motion.div>
            
            <div className="w-64 h-[2px] bg-[var(--color-surface)] relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[var(--color-accent)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
