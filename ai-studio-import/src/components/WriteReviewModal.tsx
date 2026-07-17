import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";
import { TRENDING_MOVIES } from "../data/movies";
import { ReviewItem } from "../types";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
}

const GRADIENTS = [
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-yellow-600",
  "from-purple-500 via-indigo-600 to-blue-600",
  "from-rose-500 via-pink-500 to-orange-500",
  "from-blue-400 via-indigo-500 to-violet-600"
];

export default function WriteReviewModal({ isOpen, onClose, onAddReview }: WriteReviewModalProps) {
  const [selectedMovie, setSelectedMovie] = useState(TRENDING_MOVIES[0].title);
  const [customMovie, setCustomMovie] = useState("");
  const [useCustomMovie, setUseCustomMovie] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const finalMovieTitle = useCustomMovie ? (customMovie.trim() || "Untitled Film") : selectedMovie;
    const finalAuthorName = authorName.trim() || "Anonymous Critic";

    const newReview: ReviewItem = {
      id: "review-" + Date.now(),
      movieTitle: finalMovieTitle,
      rating,
      content,
      authorName: finalAuthorName,
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      thumbnailGradient: selectedGradient
    };

    onAddReview(newReview);
    // Reset fields
    setContent("");
    setAuthorName("");
    setCustomMovie("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020509]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative bg-[#050c16] border border-[#142d4c] rounded-[2rem] w-full max-w-lg p-6 md:p-8 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-10 text-left"
          >
            {/* Corner glowing leaks inside modal */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#36ffdb]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                Share your Cinema Review
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
              
              {/* Writer Name */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Sarah K., Tom R., or your critic alias" 
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans placeholder-neutral-600 outline-none focus:border-[#36ffdb] transition-colors"
                />
              </div>

              {/* Movie Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Select Movie / Series
                  </label>
                  <button 
                    type="button"
                    onClick={() => setUseCustomMovie(!useCustomMovie)}
                    className="text-xs text-[#36ffdb] hover:underline font-mono focus:outline-none"
                  >
                    {useCustomMovie ? "Choose from List" : "Add custom name"}
                  </button>
                </div>

                {!useCustomMovie ? (
                  <select 
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans outline-none focus:border-[#36ffdb] transition-colors cursor-pointer"
                  >
                    {TRENDING_MOVIES.map(m => (
                      <option key={m.id} value={m.title}>{m.title}</option>
                    ))}
                    <option value="Dune: Part Three">Dune: Part Three</option>
                  </select>
                ) : (
                  <input 
                    type="text"
                    value={customMovie}
                    onChange={(e) => setCustomMovie(e.target.value)}
                    placeholder="Enter movie title..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans placeholder-neutral-600 outline-none focus:border-[#36ffdb] transition-colors"
                    required
                  />
                )}
              </div>

              {/* Circle Rating Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const circleValue = i + 1;
                      const currentVal = hoverRating !== null ? hoverRating : rating;
                      const isFull = currentVal >= circleValue;
                      const isHalf = currentVal > i && currentVal < circleValue;
                      const id = `modal-circle-${i}`;

                      return (
                        <div 
                          key={i} 
                          className="relative w-6 h-6 flex items-center justify-center"
                        >
                          {/* Circle Icon */}
                          <svg 
                            className={`w-6 h-6 transition-colors duration-150 ${
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

                          {/* Hover/Click Areas */}
                          {/* Left Half (0.5 increment) */}
                          <div 
                            className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
                            onMouseEnter={() => setHoverRating(i + 0.5)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => {
                              const newVal = i + 0.5;
                              setRating(rating === newVal ? 0 : newVal);
                            }}
                          />
                          {/* Right Half (1.0 increment) */}
                          <div 
                            className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
                            onMouseEnter={() => setHoverRating(i + 1)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => {
                              const newVal = i + 1;
                              setRating(rating === newVal ? 0 : newVal);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-xs font-mono text-neutral-400 ml-2">
                    ({rating} out of 5)
                  </span>
                </div>
              </div>

              {/* Abstract Fluid Thumbnail Gradient Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Fluid Abstract Cover Art
                </label>
                <div className="flex items-center gap-3">
                  {GRADIENTS.map((grad) => (
                    <button
                      type="button"
                      key={grad}
                      onClick={() => setSelectedGradient(grad)}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} transition-all duration-300 relative ${
                        selectedGradient === grad 
                          ? "ring-2 ring-white scale-110 shadow-lg" 
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {selectedGradient === grad && (
                        <div className="absolute inset-0 border-2 border-neutral-950 rounded-xl" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Your Review
                </label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What makes this film unforgettable? Describe the cinematography, pacing, or acting..." 
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans placeholder-neutral-600 outline-none focus:border-[#36ffdb] transition-colors h-28 resize-none"
                  required
                />
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(54, 255, 219, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-3 rounded-xl bg-[#36ffdb] hover:bg-[#2ae0c0] text-neutral-950 font-sans font-semibold text-center cursor-pointer shadow-lg transition-colors"
              >
                Submit Review
              </motion.button>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
