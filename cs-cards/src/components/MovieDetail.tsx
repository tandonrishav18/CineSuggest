import React, { useState } from 'react';
import { ChevronLeft, ThumbsUp, Plus, Check, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';

const CineListIcon = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Top check */}
    <path d="M2 7l3 3L11 4" />
    {/* Top line */}
    <line x1="15" y1="7" x2="22" y2="7" />
    {/* Bottom check */}
    <path d="M2 17l3 3L11 14" />
    {/* Bottom line */}
    <line x1="15" y1="17" x2="22" y2="17" />
  </svg>
);

interface MovieDetailProps {
  movie: Movie;
  onBackToDiscover: () => void;
  onScrollToRate: () => void;
  onToggleCineList: (movieId: string) => void;
  isInCineList: boolean;
}

export default function MovieDetail({
  movie,
  onBackToDiscover,
  onScrollToRate,
  onToggleCineList,
  isInCineList,
}: MovieDetailProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around the center (-1 to 1)
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateX = -((y - yc) / yc) * 14; // tilt on X axis
    const rotateY = ((x - xc) / xc) * 14;  // tilt on Y axis
    
    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Helper to render split rating stars
  // IMDb rating is e.g. "9.4/10". We extract the number 9.4.
  const ratingValue = parseFloat(movie.imdbRating.split('/')[0]); // e.g. 9.4

  const renderSplitCircles = (rating: number) => {
    const circles = [];
    for (let i = 1; i <= 5; i++) {
      // Each circle represents 2 points of rating
      const circleMax = i * 2;
      const leftHalfVal = circleMax - 1;
      
      let leftFilled = false;
      let rightFilled = false;

      if (rating >= circleMax) {
        leftFilled = true;
        rightFilled = true;
      } else if (rating >= leftHalfVal) {
        leftFilled = true;
      }

      circles.push(
        <div key={i} className="relative h-5 w-5 rounded-full border border-neutral-600/50 bg-neutral-900/60 overflow-hidden">
          {/* Left Half */}
          <div 
            className={`absolute top-0 left-0 h-full w-[50%] ${
              leftFilled ? 'bg-[#4df2d6]' : 'bg-transparent'
            }`} 
          />
          {/* Right Half */}
          <div 
            className={`absolute top-0 right-0 h-full w-[50%] ${
              rightFilled ? 'bg-[#4df2d6]' : 'bg-transparent'
            }`} 
          />
        </div>
      );
    }
    return circles;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBackToDiscover}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-transparent text-slate-300 hover:border-[#4df2d6] hover:text-[#4df2d6] cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Poster, Description (Spans 5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Poster Image Card */}
          <motion.div 
            className="relative aspect-[1/1] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-[2rem] border border-[#112332] bg-[#071118] overflow-hidden shadow-2xl">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Description text under poster */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed tracking-normal max-w-md">
            {movie.description}
          </p>
        </div>

        {/* RIGHT COLUMN: Trailer, Title details, Ratings (Spans 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Trailer Player Mockup */}
          <motion.div 
            onClick={() => setShowVideo(true)}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#071118] cursor-pointer shadow-lg hover:border-[#4df2d6]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(77, 242, 214, 0.15)" }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            {/* Thumbnail */}
            <img
              src={movie.trailerThumbUrl}
              alt={`${movie.title} trailer thumbnail`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            
            {/* Cinematic overlay tint */}
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-[1.5px] transition-colors group-hover:border-[#4df2d6] group-hover:bg-black/50"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Play size={32} className="fill-[#4df2d6] text-[#4df2d6] ml-1.5" />
              </motion.div>
            </div>
          </motion.div>

          {/* Movie Metadata, Tags, Buttons block */}
          <div className="flex flex-col gap-4">
            
            {/* Title Line & Category pills */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-sans text-4xl font-extrabold text-[#4df2d6] tracking-tight">
                  {movie.title}
                </h2>
                
                {/* Thumb icon button */}
                <motion.button
                  onClick={() => setHasLiked(!hasLiked)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border cursor-pointer transition-colors duration-300 ${
                    hasLiked
                      ? 'bg-[#4df2d6] border-[#4df2d6] text-[#03080c]'
                      : 'border-slate-700 bg-transparent text-white hover:border-[#4df2d6] hover:text-[#4df2d6]'
                  }`}
                  aria-label="Like movie"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  animate={hasLiked ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  <ThumbsUp size={16} className={hasLiked ? 'fill-current' : ''} />
                </motion.button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {movie.categories.map((tag) => (
                  <motion.span
                    key={tag}
                    className="rounded-full border border-slate-700/80 bg-transparent px-4 py-1.5 text-xs font-medium text-slate-300 hover:border-[#4df2d6]/50 hover:text-white cursor-default transition-colors duration-300"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Release, Duration, Certificate */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-sans text-sm text-slate-400">
                {movie.year} | {movie.duration}
              </div>
              <div className="rounded-full border border-slate-700/80 px-4 py-1.5 text-xs text-slate-400 font-mono">
                {movie.rating} | {movie.certificateDetails}
              </div>
            </div>

            {/* Ratings Summary & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              
              {/* Star Rating Circles & Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 h-6">
                  {renderSplitCircles(ratingValue)}
                </div>
                
                <div className="flex flex-col gap-1 text-sm font-sans text-slate-400">
                  <div>
                    Imdb rating: <span className="font-bold text-white">{movie.imdbRating}</span>
                  </div>
                  <div>
                    Rotten tomatoes: <span className="font-bold text-white">{movie.rottenTomatoesRating}</span>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  onClick={onScrollToRate}
                  className="flex items-center gap-2 rounded-full bg-[#4df2d6] px-6 py-2.5 text-sm font-semibold text-[#03080c] shadow-md cursor-pointer whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span>Rate now</span>
                  <motion.span 
                    className="font-bold"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  layout
                  onClick={() => onToggleCineList(movie.id)}
                  className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold select-none cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                    isInCineList
                      ? 'w-48 bg-[#5ce1cb] text-black border border-transparent shadow-[0_0_18px_rgba(92,225,203,0.75)]'
                      : 'w-48 bg-transparent text-white border border-slate-600 hover:bg-[#1fb095] hover:text-black hover:border-transparent'
                  }`}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isInCineList ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check size={18} className="text-black stroke-[2.5]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CineListIcon className="stroke-[2.5]" />
                        <span>Add to cine list</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TRAILER MODAL IF PLAYED */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              <X size={20} />
            </button>
            
            {/* Simulated Video Player */}
            <div className="aspect-video w-full flex flex-col items-center justify-center p-8 bg-slate-950 text-center gap-4">
              <div className="animate-pulse flex flex-col items-center gap-3">
                <Play size={48} className="text-[#4df2d6]" />
                <p className="text-slate-400 font-mono text-sm">LOADING STREAM FOR {movie.title.toUpperCase()} OFFICIAL TRAILER...</p>
              </div>
              
              {/* Mini Interactive controls */}
              <div className="mt-8 border border-teal-950 bg-teal-950/10 rounded-xl p-4 max-w-md">
                <p className="text-xs text-slate-400 italic">
                  "Southern Gothic ambiance score playing... Twin brothers return. Shadows moving in the forest..."
                </p>
                <button 
                  onClick={() => setShowVideo(false)}
                  className="mt-4 px-4 py-1.5 text-xs font-semibold bg-[#4df2d6] text-[#03080c] rounded-full hover:opacity-90"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
