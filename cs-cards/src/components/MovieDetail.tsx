import React, { useState, useEffect } from 'react';
import { ChevronLeft, ThumbsUp, Plus, Check, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';
import { getMovieCast, getRecommendations, getMovieImages } from '../services/api';

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
  onSelectMovie?: (movie: Movie) => void;
}

export default function MovieDetail({
  movie,
  onBackToDiscover,
  onScrollToRate,
  onToggleCineList,
  isInCineList,
  onSelectMovie,
}: MovieDetailProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [castList, setCastList] = useState<Array<{ id: number; name: string; character: string; profile_path: string | null }>>([]);
  const [recommendationsList, setRecommendationsList] = useState<Array<{ id: string; title: string; posterUrl: string; rating?: string }>>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsPhone(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!movie.id) return;
    const fetchMovieData = async () => {
      try {
        const numId = Number(movie.id);
        if (!isNaN(numId)) {
          const res = await getMovieCast(numId);
          if (Array.isArray(res?.cast)) {
            setCastList(res.cast.slice(0, 10));
          }
          try {
            const recRes = await getRecommendations(numId);
            if (Array.isArray(recRes?.results)) {
              const formattedRecs = recRes.results.slice(0, 6).map((m: any) => ({
                id: String(m.id),
                title: m.title || m.name || "Untitled",
                posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : m.backdrop_path ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}` : '',
                rating: m.vote_average ? `${m.vote_average.toFixed(1)}/10` : undefined,
              }));
              setRecommendationsList(formattedRecs);
            }
          } catch (err) {
            console.error("Failed to load recommendations:", err);
          }
          try {
            const imgRes = await getMovieImages(numId);
            if (imgRes && Array.isArray(imgRes.backdrops) && imgRes.backdrops.length > 0) {
              const fetchedStills = imgRes.backdrops.slice(0, 5).map((b: any) => `https://image.tmdb.org/t/p/w500${b.file_path}`);
              setGalleryImages(fetchedStills);
            } else {
              setGalleryImages([]);
            }
          } catch (err) {
            console.error("Failed to load movie images:", err);
          }
        }
      } catch (err) {
        console.error("Failed to load movie cast:", err);
      }
    };
    fetchMovieData();
  }, [movie.id]);

  const displayGalleryImages = [
    galleryImages[0] || movie.stillUrl || movie.trailerThumbUrl || movie.posterUrl,
    galleryImages[1] || movie.trailerThumbUrl || movie.posterUrl || movie.stillUrl,
    galleryImages[2] || movie.posterUrl || movie.stillUrl || movie.trailerThumbUrl,
  ];

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
      {/* Back button — hidden on phone view */}
      <div className="mb-6 hidden sm:block">
        <button
          onClick={onBackToDiscover}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-transparent text-slate-300 hover:border-[#4df2d6] hover:text-[#4df2d6] cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Poster, Description (Spans 5 cols on lg; displays below buttons on phone view) */}
        <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          {/* Poster Image Card with Perfect 2:3 Movie Poster Aspect Ratio */}
          <motion.div 
            className="relative aspect-[2/3] w-full group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-[2rem] border border-[#112332] bg-[#071118] overflow-hidden shadow-2xl">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Description text under poster */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed tracking-normal max-w-md">
            {movie.description}
          </p>
        </div>

        {/* RIGHT COLUMN: Trailer, Title details, Ratings (Spans 7 cols on lg; displays above poster on phone view) */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full order-1 lg:order-2">
          
          {/* Trailer Player Mockup */}
          <motion.div 
            onClick={() => setShowVideo(true)}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#071118] cursor-pointer shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            {/* Thumbnail */}
            <img
              src={movie.trailerThumbUrl}
              alt={`${movie.title} trailer thumbnail`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                <h2 className="font-share text-4xl font-extrabold text-[#4df2d6] tracking-tight">
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
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700/80 bg-transparent px-4 py-1.5 text-xs font-medium text-slate-300 opacity-50 select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Release, Duration, Certificate */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-sans text-sm text-slate-400">
                {movie.year} | {movie.duration}
              </div>
              <div className="rounded-full border border-slate-700/80 px-4 py-1.5 text-xs text-slate-400 font-mono opacity-50 select-none">
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
                  initial={{ backgroundColor: "#75D4CB" }}
                  animate={{ backgroundColor: "#75D4CB" }}
                  whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-sans font-normal text-[#03080c] shadow-md cursor-pointer whitespace-nowrap select-none"
                >
                  <span>Rate now</span>
                  <motion.span 
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

          {/* Three Images — hidden on mobile phone view, visible on desktop */}
          <div className="hidden sm:grid flex-1 grid-cols-3 gap-4 mt-2 w-full min-h-[200px]">
            {displayGalleryImages.slice(0, 3).map((imgUrl, idx) => (
              <motion.div 
                key={idx}
                className="w-full h-full min-h-[180px] rounded-2xl border border-[#112332] bg-[#071118] overflow-hidden group cursor-pointer shadow-lg"
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={imgUrl}
                  alt={`${movie.title} screenshot ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* TOP CAST SECTION */}
      {castList.length > 0 && (
        <div className="mt-10 border-t border-[#112332]/50 pt-8">
          <h3 className="font-share text-xl md:text-2xl font-bold text-white mb-6 select-none">
            Top Cast:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {castList.map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center p-3.5 rounded-2xl border border-[#112332] bg-[#071118] gap-2.5 hover:border-teal-500/40 transition-colors">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-teal-500/30 bg-slate-900 shadow-md">
                  <img
                    src={member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-xs leading-tight">{member.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{member.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS SECTION */}
      {recommendationsList.length > 0 && (
        <div className="mt-10 border-t border-[#112332]/50 pt-8">
          <h3 className="font-share text-xl md:text-2xl font-bold text-white mb-6 select-none">
            Recommended Movies:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recommendationsList.slice(0, isPhone ? 6 : 5).map((rec) => (
              <div 
                key={rec.id} 
                onClick={() => {
                  if (onSelectMovie) {
                    onSelectMovie({
                      id: rec.id,
                      title: rec.title,
                      description: '',
                      year: 0,
                      duration: '',
                      rating: '',
                      certificateDetails: '',
                      posterUrl: rec.posterUrl,
                      trailerThumbUrl: '',
                      categories: [],
                      imdbRating: rec.rating || '0.0/10',
                      rottenTomatoesRating: '0% Fresh',
                      rewatchValue: 0,
                      streamProviders: [],
                      reviews: [],
                      stillUrl: ''
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex flex-col rounded-2xl border border-[#112332] bg-[#071118] overflow-hidden group cursor-pointer shadow-md"
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={rec.posterUrl || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400&auto=format&fit=crop'}
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <div className="font-bold text-slate-100 text-xs leading-tight line-clamp-1">{rec.title}</div>
                  {rec.rating && (
                    <div className="text-[10px] font-mono text-[#4df2d6]">{rec.rating}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 cursor-pointer"
            >
              <X size={20} />
            </button>
            
            {/* Official YouTube Trailer Player */}
            <div className="aspect-video w-full bg-black">
              {movie.trailerKey ? (
                <iframe
                  src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
                  title={`${movie.title} Official Trailer`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="aspect-video w-full flex flex-col items-center justify-center p-8 bg-slate-950 text-center gap-4">
                  <Play size={48} className="text-[#4df2d6]" />
                  <p className="text-slate-400 font-mono text-sm">TRAILER NOT AVAILABLE FOR {movie.title.toUpperCase()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
