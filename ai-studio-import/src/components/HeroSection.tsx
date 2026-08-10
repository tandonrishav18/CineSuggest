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

const MASTER_MOVIES: Movie[] = [
  {
    id: "spider-man",
    title: "Spider-Man: Brand New Day",
    url: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-[#3dd9c8] text-center uppercase font-semibold">
          MARVEL STUDIOS
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-wider text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SPIDER-MAN</span>
          <span className="text-[5px] font-sans text-neutral-400 tracking-[0.2em] font-medium uppercase mt-0.5">BRAND NEW DAY</span>
        </div>
      </div>
    )
  },
  {
    id: "the-odyssey",
    title: "The Odyssey",
    url: "https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-amber-500 text-center uppercase font-bold">
          WARNER BROS
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-black text-xs tracking-wide text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none font-sans">THE ODYSSEY</span>
        </div>
      </div>
    )
  },
  {
    id: "the-last-house",
    title: "The Last House",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 py-6 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-transparent to-black/60">
        <div className="text-[7px] font-mono tracking-[0.35em] text-neutral-400 text-center uppercase font-bold">
          CINEMA ORIGINAL
        </div>
        <div className="my-auto flex flex-col items-center">
          <span className="font-display font-black text-2xl tracking-[0.15em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">THE LAST HOUSE</span>
        </div>
      </div>
    )
  },
  {
    id: "evil-dead-burn",
    title: "Evil Dead Burn",
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/90 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-red-500 text-center uppercase font-bold">
          HORROR NIGHTS
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-bold text-xs tracking-widest text-red-600">EVIL DEAD BURN</span>
        </div>
      </div>
    )
  },
  {
    id: "obsession",
    title: "Obsession",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-blue-950/95 via-transparent to-black/30">
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-black text-xs tracking-widest text-white italic">OBSESSION</span>
        </div>
      </div>
    )
  },
  {
    id: "supergirl",
    title: "Supergirl",
    url: "https://upload.wikimedia.org/wikipedia/en/1/1a/Supergirl_Woman_of_Tomorrow_poster.jpg",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-sky-400 text-center uppercase">
          DC STUDIOS
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-[0.25em] text-sky-300">SUPERGIRL</span>
        </div>
      </div>
    )
  },
  {
    id: "disclosure-day",
    title: "Disclosure Day",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-neutral-950/95 via-transparent to-black/45">
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">DISCLOSURE DAY</span>
        </div>
      </div>
    )
  },
  {
    id: "soulm8te",
    title: "Soulm8te",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/20 to-black/45">
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-[0.2em] text-pink-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SOULM8TE</span>
        </div>
      </div>
    )
  },
  {
    id: "avatar-aang",
    title: "Avatar Aang",
    url: "https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 py-4 select-none pointer-events-none z-10 bg-gradient-to-t from-amber-950/90 via-orange-900/40 to-transparent">
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-sans font-bold text-xs tracking-wide text-amber-400">AVATAR AANG</span>
        </div>
      </div>
    )
  }
];

export default function HeroSection({ onStartExploring, movies = [] }: HeroSectionProps) {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(() => {
    if (movies && movies.length >= 9) {
      return movies.slice(0, 9).map((m) => ({
        id: m.id,
        title: m.title,
        url: m.posterUrl || m.backdropUrl || "",
        watermark: (
          <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40">
            <div className="text-[5px] font-mono tracking-widest text-[#3dd9c8] text-center uppercase font-semibold">
              TRENDING
            </div>
          </div>
        )
      }));
    }
    return MASTER_MOVIES.slice(0, 9);
  });

  useEffect(() => {
    if (movies && movies.length > 0) {
      const heroList: Movie[] = movies.map((m) => ({
        id: m.id,
        title: m.title,
        url: m.posterUrl || m.backdropUrl || "",
        watermark: (
          <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40">
            <div className="text-[5px] font-mono tracking-widest text-[#3dd9c8] text-center uppercase font-semibold">
              TRENDING
            </div>
          </div>
        )
      }));
      setCurrentMovies(heroList.slice(0, 9));
    }
  }, [movies]);

  // Gently transitions and shuffles active movies on the slots over time
  useEffect(() => {
    const sourcePool = movies && movies.length >= 9
      ? movies.map((m) => ({
          id: m.id,
          title: m.title,
          url: m.posterUrl || m.backdropUrl || "",
          watermark: (
            <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40">
              <div className="text-[5px] font-mono tracking-widest text-[#3dd9c8] text-center uppercase font-semibold">
                TRENDING
              </div>
            </div>
          )
        }))
      : MASTER_MOVIES;

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
