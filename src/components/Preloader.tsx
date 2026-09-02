import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  images: string[];
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ images, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = images.length;

    if (total === 0) {
      setProgress(100);
      setIsFading(true);
      setTimeout(onComplete, 800);
      return;
    }

    const uniqueImages = Array.from(new Set(images.filter(Boolean))) as string[];
    const totalUnique = uniqueImages.length;

    if (totalUnique === 0) {
      setProgress(100);
      setIsFading(true);
      setTimeout(onComplete, 800);
      return;
    }

    const handleLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / totalUnique) * 100));
      if (loadedCount === totalUnique) {
        setIsFading(true);
        setTimeout(onComplete, 800);
      }
    };

    uniqueImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleLoad; // proceed even on error
    });
  }, [images, onComplete]);

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf9f6]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-10 relative flex items-center justify-center"
          >
            {/* Premium minimal spinner rings */}
            <div className="absolute w-28 h-28 rounded-full border-[1px] border-transparent border-t-gold-600/60 border-b-gold-600/60 animate-[spin_3s_linear_infinite]" />
            <div className="absolute w-24 h-24 rounded-full border-[1px] border-transparent border-l-gold-500/50 border-r-gold-500/50 animate-[spin_4s_linear_reverse_infinite]" />
            <div className="absolute w-20 h-20 rounded-full border-[1px] border-transparent border-t-gold-400/40 animate-[spin_2s_linear_infinite]" />
            
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold-600 animate-pulse shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
            </div>
          </motion.div>
          
          <div className="text-center mb-8">
            <h2 className="font-display text-xl text-royal-red-950 tracking-[0.25em] uppercase font-bold mb-3">
              Loading Invitation
            </h2>
            <p className="font-sans text-[10px] text-gold-700 uppercase tracking-[0.3em] font-semibold animate-pulse">
              Please Wait
            </p>
          </div>

          <div className="w-64 h-[2px] bg-gray-200/50 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
