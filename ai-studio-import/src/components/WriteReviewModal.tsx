import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, FormEvent } from "react";
import { Movie, ReviewItem } from "../types";
import { searchMovies } from "../services/api";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
  movies: Movie[];
}

const GRADIENTS = [
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-yellow-600",
  "from-purple-500 via-indigo-600 to-blue-600",
  "from-rose-500 via-pink-500 to-orange-500",
  "from-blue-400 via-indigo-500 to-violet-600"
];

export default function WriteReviewModal({ isOpen, onClose, onAddReview, movies }: WriteReviewModalProps) {
  const [movieSearchQuery, setMovieSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ id: string | number; title: string; year?: string | number; posterUrl?: string }>>([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);

  // Live search TMDB movies as user types
  useEffect(() => {
    const q = movieSearchQuery.trim();
    if (!q || q.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(q);
        if (Array.isArray(data?.results)) {
          const mapped = data.results.slice(0, 10).map((m: any) => ({
            id: m.id,
            title: m.title || m.name || "Untitled",
            year: m.release_date ? new Date(m.release_date).getFullYear() : "",
            posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w92${m.poster_path}` : ""
          }));
          setSearchResults(mapped);
        }
      } catch (err) {
        console.warn("Live movie search error:", err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [movieSearchQuery]);

  // Combine TMDB live results with local movies (only when query has text)
  const combinedSuggestions = movieSearchQuery.trim().length > 0 ? Array.from(
    new Map(
      [
        ...searchResults.map((s) => [s.title.toLowerCase(), s]),
        ...movies
          .filter((m) => m.title.toLowerCase().includes(movieSearchQuery.toLowerCase().trim()))
          .map((m) => [m.title.toLowerCase(), { id: m.id, title: m.title, posterUrl: m.posterUrl }])
      ]
    ).values()
  ) : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const finalMovieTitle = movieSearchQuery.trim() || "Untitled Film";
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
    setMovieSearchQuery("");
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
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Select Movie / Series
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={movieSearchQuery}
                    onChange={(e) => {
                      setMovieSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder="Type movie or series name..." 
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans placeholder-neutral-600 outline-none focus:border-[#36ffdb] transition-colors"
                    required
                  />

                  {/* Autocomplete Suggestions List */}
                  {showSuggestions && movieSearchQuery.trim().length > 0 && combinedSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto bg-[#07111a] border border-[#1b3248] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 py-1 divide-y divide-slate-800/40">
                      {combinedSuggestions.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setMovieSearchQuery(m.title);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 flex items-center gap-3 text-sm text-neutral-200 hover:bg-[#12263a] hover:text-[#36ffdb] transition-colors cursor-pointer"
                        >
                          {m.posterUrl ? (
                            <img 
                              src={m.posterUrl} 
                              alt={m.title}
                              referrerPolicy="no-referrer"
                              className="w-7 h-10 object-cover rounded shadow border border-slate-700/60 shrink-0" 
                            />
                          ) : (
                            <div className="w-7 h-10 bg-slate-900 rounded border border-slate-800 flex items-center justify-center text-[10px] shrink-0">🍿</div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold leading-snug truncate">{m.title}</span>
                            {m.year && (
                              <span className="text-[11px] font-mono text-neutral-400">{m.year}</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    if (pastedText) {
                      e.preventDefault();
                      const target = e.currentTarget;
                      const start = target.selectionStart ?? content.length;
                      const end = target.selectionEnd ?? content.length;
                      const nextText = content.slice(0, start) + pastedText + content.slice(end);
                      setContent(nextText);
                    }
                  }}
                  placeholder="What makes this film unforgettable? Describe the cinematography, pacing, or acting..." 
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-200 text-sm font-sans placeholder-neutral-600 outline-none focus:border-[#36ffdb] transition-colors h-28 resize-none"
                  required
                />
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                initial={{ backgroundColor: "#75D4CB" }}
                animate={{ backgroundColor: "#75D4CB" }}
                whileHover={{ scale: 1.02, backgroundColor: "#22A498" }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-3 rounded-full text-[#03080c] font-sans font-normal text-center cursor-pointer shadow-md transition-colors select-none"
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
