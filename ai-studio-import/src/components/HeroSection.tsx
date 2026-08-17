import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";

interface HeroSectionProps {
  onStartExploring: () => void;
  movies?: Array<{
    id: string;
    title: string;
    posterUrl: string;
    backdropUrl?: string;
  }>;
}

interface Movie {
  id: string;
  title: string;
  url: string;
  watermark: React.ReactNode;
}

interface SlotConfig {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

const SLOTS: SlotConfig[] = [
  { width: 130, height: 190, top: 90,  left: 0,   zIndex: 10 },
  { width: 130, height: 190, top: 290, left: 0,   zIndex: 10 },
  { width: 270, height: 390, top: 0,   left: 146,  zIndex: 20 }, // Stranger Things 5 center tall
  { width: 130, height: 190, top: 396, left: 146,  zIndex: 10 },
  { width: 130, height: 190, top: 396, left: 286,  zIndex: 10 },
  { width: 130, height: 190, top: 90,  left: 432,  zIndex: 10 },
  { width: 130, height: 190, top: 90,  left: 568,  zIndex: 10 },
  { width: 130, height: 190, top: 290, left: 432,  zIndex: 10 },
  { width: 190, height: 270, top: 290, left: 568,  zIndex: 15 },
];
import { TRENDING_MOVIES } from "../data/movies";

const getFastImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("./") || url.startsWith("/") || url.startsWith("data:")) return url;
  if (url.includes("images.weserv.nl")) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=600&output=webp&q=85`;
};

const mapMoviesToHero = (list: any[]): Movie[] => {
  const source = Array.isArray(list) && list.length > 0 ? list : TRENDING_MOVIES;
  return source.map((m) => ({
    id: m.id,
    title: m.title,
    url: getFastImageUrl(m.posterUrl || m.backdropUrl || m.url || ""),
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-[#3dd9c8] text-center uppercase font-semibold">
          TRENDING
        </div>
      </div>
    )
  }));
};

export default function HeroSection({ onStartExploring, movies = [] }: HeroSectionProps) {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(() => {
    return mapMoviesToHero(movies).slice(0, 9);
  });

  // Preload all poster images in browser memory immediately for instant 0-lag rendering
  useEffect(() => {
    const sourcePool = mapMoviesToHero(movies);
    sourcePool.forEach((m) => {
      if (m.url) {
        const img = new Image();
        img.src = m.url;
      }
    });
  }, [movies]);

  useEffect(() => {
    const heroList = mapMoviesToHero(movies);
    if (heroList.length > 0) {
      setCurrentMovies(heroList.slice(0, 9));
    }
  }, [movies]);

  // Gently transitions and shuffles active movies on the slots over time
  useEffect(() => {
    const sourcePool = mapMoviesToHero(movies);

    const interval = setInterval(() => {
      const slotsToSwap: number[] = [];
      while (slotsToSwap.length < 3) {
        const idx = Math.floor(Math.random() * 9);
        if (!slotsToSwap.includes(idx)) {
          slotsToSwap.push(idx);
        }
      }
      
      setCurrentMovies((prevMovies) => {
        const activeIds = new Set(prevMovies.map(m => m.id));
        const inactiveMovies = sourcePool.filter(m => !activeIds.has(m.id));
        
        if (inactiveMovies.length < 3) return prevMovies;
        
        const availableInactive = [...inactiveMovies];
        const chosenNewMovies: Movie[] = [];
        for (let i = 0; i < 3; i++) {
          const randIdx = Math.floor(Math.random() * availableInactive.length);
          const movie = availableInactive.splice(randIdx, 1)[0];
          chosenNewMovies.push(movie);
        }
        
        const nextMovies = [...prevMovies];
        slotsToSwap.forEach((slotIdx, i) => {
          nextMovies[slotIdx] = chosenNewMovies[i];
        });
        
        return nextMovies;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);



  return (
    <section 
      id="hero" 
      className="relative flex items-start pt-[54px] lg:pt-[34px] lg:mt-0 pb-8 px-6 md:px-12 lg:pl-32 lg:pr-10 overflow-visible w-full"
    >
      {/* Decorative ambient glowing lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#36ffdb]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[100px] items-center relative z-10">
        
        {/* Left Column Description */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold font-display text-white leading-[1.1] tracking-tight">
              Your next favourite <br className="hidden md:inline" />
              film is waiting.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="text-neutral-400 text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed max-w-lg"
          >
            Discover movies by mood, taste, and real people &mdash; not boring algorithms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <motion.a
              href="#trending"
              onClick={(e) => {
                e.preventDefault();
                if (onStartExploring) onStartExploring();
                const trendingElement = document.getElementById("trending");
                if (trendingElement) {
                  trendingElement.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  window.location.hash = "trending";
                }
              }}
              initial={{ backgroundColor: "#75D4CB" }}
              animate={{ backgroundColor: "#75D4CB" }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#22A498"
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-[#03080c] font-sans font-normal px-8 py-3 rounded-full cursor-pointer transition-all duration-300 shadow-md text-sm select-none"
            >
              <span className="tracking-wide flex items-center gap-1">
                Start Exploring <span className="font-sans font-normal transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Cinematic Movie Poster Collage */}
        <div className="lg:col-span-7 relative w-full flex items-center justify-center select-none overflow-visible min-h-[270px] sm:min-h-[360px] md:min-h-[460px] lg:min-h-[610px] -mt-[114px] sm:mt-0">
          {/* Responsive scale wrapper to resize the absolute grid cleanly across all screen sizes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-[768px] h-[596px] scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-[0.95] 2xl:scale-100 origin-center lg:origin-right transition-transform duration-300 shrink-0"
          >
            {/* Ambient center glow */}
            <div className="absolute top-[180px] left-[200px] w-96 h-96 bg-[#36ffdb]/5 rounded-full blur-[100px] pointer-events-none" />

            {currentMovies.map((movie, index) => {
              const slot = SLOTS[index];
              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{ 
                    width: `${slot.width}px`, 
                    height: `${slot.height}px`,
                    top: `${slot.top}px`,
                    left: `${slot.left}px`,
                    zIndex: slot.zIndex,
                  }}
                  onClick={() => {
                    window.location.href = `../movie-cards/?movie=${movie.id}`;
                  }}
                  // Ambient slow floating physics
                  animate={{ 
                    y: [0, -6, 0],
                  }}
                  transition={{ 
                    y: {
                      repeat: Infinity, 
                      duration: 4.5 + (index * 0.4), 
                      ease: "easeInOut",
                      delay: index * 0.15
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    zIndex: 45,
                    transition: { type: "spring", stiffness: 250, damping: 18 }
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      style={{
                        background: "linear-gradient(#090e17, #090e17) padding-box, linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(156, 156, 156, 0.4) 100%) border-box",
                        border: "1px solid transparent"
                      }}
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between"
                    >
                      {/* Realistic cinema-screen light reflection highlight */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
                      
                      {movie.url && (
                        <img 
                          src={movie.url} 
                          alt={movie.title} 
                          loading="eager"
                          fetchPriority="high"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedFallback) {
                              target.dataset.triedFallback = 'true';
                              target.src = 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9vKoWRwwoW.jpg';
                            }
                          }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      {/* Custom cinematic overlay layout for each poster */}
                      {movie.watermark}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
