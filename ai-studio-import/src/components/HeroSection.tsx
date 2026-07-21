import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";

interface HeroSectionProps {
  onStartExploring: () => void;
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
  { width: 130, height: 190, top: 100, left: 0, zIndex: 10 },
  { width: 130, height: 190, top: 305, left: 0, zIndex: 10 },
  { width: 270, height: 390, top: 0, left: 146, zIndex: 20 }, // Stranger Things 5 center tall
  { width: 130, height: 190, top: 406, left: 146, zIndex: 10 },
  { width: 130, height: 190, top: 406, left: 286, zIndex: 10 },
  { width: 130, height: 190, top: 100, left: 432, zIndex: 10 },
  { width: 130, height: 190, top: 100, left: 578, zIndex: 10 },
  { width: 130, height: 190, top: 305, left: 432, zIndex: 10 },
  { width: 190, height: 270, top: 305, left: 578, zIndex: 15 },
];

const MASTER_MOVIES: Movie[] = [
  {
    id: "oblivion",
    title: "Oblivion",
    url: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-semibold">
          A FILM BY JOSEPH KOSINSKI
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-base tracking-wider text-[#3dd9c8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">OBLIVION</span>
          <span className="text-[5px] font-sans text-neutral-400 tracking-[0.2em] font-medium uppercase mt-0.5">TOM CRUISE</span>
        </div>
        <div className="text-[7px] font-mono tracking-[0.3em] text-[#3dd9c8] text-center font-bold">
          APRIL
        </div>
      </div>
    )
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    url: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/20 to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-red-500 text-center uppercase font-bold">
          MARVEL STUDIOS
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-black text-xs tracking-wide text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none italic font-sans">AVENGERS</span>
          <span className="text-[6px] font-sans text-sky-400 tracking-wider font-extrabold uppercase mt-0.5">ENDGAME</span>
        </div>
        <div className="text-[7px] font-mono tracking-[0.3em] text-neutral-400 text-center font-bold">
          APRIL 26
        </div>
      </div>
    )
  },
  {
    id: "stranger-things",
    title: "Stranger Things 5",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 py-6 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/95 via-transparent to-neutral-950/60">
        <div className="text-[7px] font-mono tracking-[0.35em] text-red-500 text-center uppercase font-bold">
          A NETFLIX ORIGINAL SERIES
        </div>
        <div className="my-auto flex flex-col items-center">
          <span className="font-display font-black text-3xl tracking-[0.15em] text-red-600 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">STRANGER THINGS</span>
          <span className="font-display font-black text-5xl text-red-700 mt-2">5</span>
        </div>
        <div className="text-[7px] font-sans text-neutral-400 tracking-[0.25em] font-medium uppercase text-center mt-1">
          ONE SUMMER CAN CHANGE EVERYTHING
        </div>
      </div>
    )
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-amber-950/90 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-amber-500 text-center uppercase font-bold">
          RYAN GOSLING
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-light text-[8px] tracking-wider text-white">PROJECT</span>
          <span className="font-display font-bold text-xs tracking-widest text-amber-500">HAIL MARY</span>
          <span className="text-[5px] font-mono text-neutral-400 tracking-wider uppercase mt-1">03.20.26</span>
        </div>
      </div>
    )
  },
  {
    id: "raees",
    title: "Raees",
    url: "https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-blue-950/95 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-bold">
          SHAH RUKH KHAN
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-black text-xs tracking-widest text-white italic">RAEES</span>
          <span className="text-[4px] font-mono text-amber-400 tracking-wider uppercase mt-0.5">7 DAYS TO RAEES</span>
        </div>
      </div>
    )
  },
  {
    id: "the-boys",
    title: "The Boys",
    url: "https://upload.wikimedia.org/wikipedia/en/e/e5/The_Boys_season_1_poster.jpg",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase">
          PRIME ORIGINAL
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-display font-bold text-sm tracking-[0.25em] text-white">THE BOYS</span>
          <span className="text-[5px] font-mono text-neutral-400 tracking-widest uppercase mt-1">FINAL SEASON &bull; APRIL 8</span>
        </div>
      </div>
    )
  },
  {
    id: "kalki",
    title: "Kalki 2898 AD",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-neutral-950/95 via-transparent to-black/45">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-semibold">
          A VYJAYANTHI MOVIES PRODUCTION
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">KALKI</span>
          <span className="text-[5px] font-sans text-neutral-400 tracking-[0.15em] font-medium uppercase mt-0.5">2898 AD</span>
        </div>
      </div>
    )
  },
  {
    id: "dhurandhar",
    title: "Dhurandhar",
    url: "https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/20 to-black/45">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-semibold">
          AN ADITYA DHAR FILM
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-xs tracking-[0.2em] text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">DHURANDHAR</span>
        </div>
        <div className="text-[7px] font-mono tracking-[0.3em] text-red-500 text-center font-bold">
          DECEMBER
        </div>
      </div>
    )
  },
  {
    id: "joker",
    title: "Joker",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 py-4 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/90 via-orange-900/40 to-transparent">
        <div className="text-[5px] font-mono tracking-wider text-neutral-200 text-center uppercase leading-none">
          JOAQUIN PHOENIX
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-sans font-light text-xl tracking-wide text-white">JOKER</span>
          <span className="text-[5px] font-mono text-neutral-300 tracking-widest uppercase mt-1">OCTOBER 4</span>
        </div>
      </div>
    )
  }
];

export default function HeroSection({ onStartExploring }: HeroSectionProps) {
  // Populates the 9 visual slots on our layout board
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(() => MASTER_MOVIES.slice(0, 9));

  // Gently transitions and shuffles active movies on the slots over time
  useEffect(() => {
    // Shuffling is set up but with exactly 9 items on the board, it remains stable matching the mockup design
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
        const inactiveMovies = MASTER_MOVIES.filter(m => !activeIds.has(m.id));
        
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
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center py-12 px-6 md:px-12 lg:pl-32 overflow-hidden"
    >
      {/* Decorative ambient glowing lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#36ffdb]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10 w-full">
        
        {/* Left Column Description */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] font-bold font-display text-white leading-[1.1] tracking-tight">
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
            <motion.button
              onClick={onStartExploring}
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
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Cinematic Movie Poster Collage */}
        <div className="lg:col-span-7 relative w-full flex items-center justify-center select-none overflow-visible min-h-[500px] lg:min-h-[610px]">
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
