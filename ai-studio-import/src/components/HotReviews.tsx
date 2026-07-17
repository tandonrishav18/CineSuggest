import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ReviewItem } from "../types";

interface HotReviewsProps {
  reviews: ReviewItem[];
  onWriteReviewClick: () => void;
}

export default function HotReviews({ reviews, onWriteReviewClick }: HotReviewsProps) {
  return (
    <section 
      id="reviews" 
      className="py-16 px-6 md:px-12 lg:pl-32 max-w-7xl mx-auto w-full relative border-t border-neutral-900/50"
    >
      {/* Decorative leak */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Hot Reviews
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "#36ffdb", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-[#142337] bg-[#070f19] flex items-center justify-center text-[#36ffdb] transition-colors duration-200 cursor-pointer"
            aria-label="View all movie reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-10">
        <AnimatePresence mode="popLayout">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="rounded-3xl border border-[#14273f]/50 bg-[#040911]/85 p-5 md:p-6 flex flex-col md:flex-row gap-5 items-start md:items-center relative overflow-hidden shadow-xl"
            >
              {/* Subtle ambient gradient overlay in card */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Left Side: Stunning abstract fluid art thumbnail poster */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className={`w-28 h-40 rounded-2xl shrink-0 bg-gradient-to-br ${review.thumbnailGradient} shadow-lg shadow-black/75 border border-white/5 relative flex items-center justify-center overflow-hidden cursor-pointer group`}
              >
                {/* Visual fluid pattern inside using custom CSS-like structures */}
                <div className="absolute w-24 h-24 rounded-full bg-white/10 blur-xl top-4 left-4 mix-blend-overlay animate-pulse" />
                <div className="absolute w-16 h-16 rounded-full bg-black/15 blur-md bottom-3 right-3 mix-blend-overlay" />
                
                {/* CineSuggest clean watermarked lettering */}
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase rotate-90 select-none">
                  CINEART
                </span>
              </motion.div>

              {/* Right Side: Review details */}
              <div className="flex-1 flex flex-col justify-between h-full text-left gap-3 w-full">
                {/* Title and Rating Row */}
                <div className="flex items-center justify-between gap-4 w-full">
                  <h4 className="text-xl font-bold font-display text-white tracking-wide truncate max-w-[200px]">
                    {review.movieTitle}
                  </h4>
                  {/* Circle Rating Icons */}
                  <div className="flex items-center gap-1 shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const circleValue = i + 1;
                      const isFull = review.rating >= circleValue;
                      const isHalf = review.rating > i && review.rating < circleValue;
                      const id = `review-circle-${review.id}-${i}`;

                      return (
                        <div key={i} className="relative w-3.5 h-3.5 flex items-center justify-center">
                          <svg 
                            className={`w-3.5 h-3.5 ${
                              isFull || isHalf ? "text-cyan-400" : "text-neutral-700"
                            }`} 
                            viewBox="0 0 24 24"
                          >
                            {isHalf && (
                              <defs>
                                <linearGradient id={id}>
                                  <stop offset="50%" stopColor="currentColor" />
                                  <stop offset="50%" stopColor="transparent" />
                                </linearGradient>
                              </defs>
                            )}
                            <circle 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              fill={isFull ? "currentColor" : isHalf ? `url(#${id})` : "transparent"} 
                            />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Blurb content */}
                <p className="text-neutral-400 text-sm font-sans font-light leading-relaxed line-clamp-3 italic">
                  "{review.content}"
                </p>

                {/* Reviewer Profile Row */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-neutral-900/60 mt-2">
                  <img 
                    src={review.authorAvatar} 
                    alt={review.authorName} 
                    className="w-6.5 h-6.5 rounded-full border border-neutral-800 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs text-neutral-400 font-sans font-medium">
                    Reviewed by <span className="text-neutral-300 font-semibold">{review.authorName}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Centered Capsule Write Review CTA button */}
      <div className="flex justify-center w-full mt-4">
        <motion.button
          onClick={onWriteReviewClick}
          whileHover={{ 
            scale: 1.05, 
            borderColor: "#36ffdb", 
            boxShadow: "0 0 20px rgba(54, 255, 219, 0.25)"
          }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#142d4c] bg-neutral-950/80 text-neutral-300 hover:text-[#36ffdb] font-sans font-medium text-sm transition-all duration-300 cursor-pointer shadow-md"
        >
          <span>Select Movie/ series and write your reviews</span>
          <span className="text-[#36ffdb] transition-transform duration-300 group-hover:translate-x-1 font-bold">→</span>
        </motion.button>
      </div>

    </section>
  );
}
