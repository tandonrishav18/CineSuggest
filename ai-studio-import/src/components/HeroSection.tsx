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
  { width: 125, height: 190, top: 80,  left: 0,   zIndex: 10 }, // left-col top
  { width: 125, height: 190, top: 285, left: 0,   zIndex: 10 }, // left-col bottom
  { width: 210, height: 510, top: 0,   left: 142, zIndex: 20 }, // CENTER tall (hero)
  { width: 98,  height: 158, top: 430, left: 142, zIndex: 25 }, // below-center left  (z>center → peeks above)
  { width: 98,  height: 158, top: 430, left: 248, zIndex: 25 }, // below-center right (z>center → peeks above)
  { width: 125, height: 190, top: 80,  left: 368, zIndex: 10 }, // right-col1 top
  { width: 125, height: 190, top: 80,  left: 503, zIndex: 10 }, // right-col2 top
  { width: 125, height: 190, top: 285, left: 368, zIndex: 10 }, // right-col1 bottom
  { width: 195, height: 295, top: 285, left: 503, zIndex: 15 }, // right-col2 large
];

const MASTER_MOVIES: Movie[] = [
  {
    id: "archer",
    title: "Archer",
    url: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/40">
        <div className="text-[6px] font-mono tracking-widest text-neutral-400 text-center uppercase leading-tight font-semibold">
          MARIO ORLANDO &bull; SARA STONE HEWITT &bull; CRAIG OVERTIME
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-base tracking-wider text-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ARCHER</span>
          <span className="text-[5px] font-sans text-neutral-400 tracking-[0.2em] font-medium uppercase mt-0.5">SURVIVAL IS A HARD GAME</span>
        </div>
        <div className="text-[7px] font-mono tracking-[0.3em] text-amber-400 text-center font-bold">
          20 OCTOBER
        </div>
      </div>
    )
  },
  {
    id: "family-man",
    title: "The Family Man",
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-end p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
        {/* Subtle blue/cyan overlay */}
        <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color-dodge pointer-events-none" />
        <div className="flex flex-col gap-1 items-start text-left">
          <span className="text-[7px] font-mono tracking-widest text-cyan-400 font-bold uppercase">THE AMAZON ORIGINAL</span>
          <span className="font-display font-extrabold text-xs text-white leading-none tracking-tight">THE FAMILY MAN</span>
          <div className="mt-1.5 px-1 py-0.5 bg-amber-500 text-neutral-950 text-[5px] font-mono font-black tracking-wider rounded uppercase">
            NEW SEASON COMING SOON
          </div>
        </div>
      </div>
    )
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80", // fiery atomic sky/energy portrait
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-4 py-6 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/10 to-black/60">
        {/* Oppenheimer amber cinematic overlay */}
        <div className="absolute inset-0 bg-amber-950/10 mix-blend-color-burn" />
        <div className="text-[7px] font-mono tracking-[0.35em] text-neutral-300 text-center uppercase font-light">
          A FILM BY CHRISTOPHER NOLAN
        </div>
        <div className="my-auto flex flex-col items-center">
          {/* Oppenheimer hat silhouette overlay */}
          <div className="w-16 h-16 opacity-10 bg-white rounded-full mb-2 flex items-center justify-center">
            <span className="text-xl">🎩</span>
          </div>
          <span className="font-display font-black text-2xl tracking-[0.15em] text-amber-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">OPPENHEIMER</span>
          <span className="text-[7px] font-sans text-neutral-400 tracking-[0.25em] font-medium uppercase mt-1">SHOT WITH IMAX FILM CAMERAS</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          {/* Mock credits block */}
          <div className="w-24 h-[1px] bg-neutral-800/40" />
          <span className="text-[5px] font-mono text-neutral-500 tracking-wider uppercase text-center leading-normal">
            UNIVERSAL PICTURES PRESENTS A SYNCOPY PRODUCTION "OPPENHEIMER" CILLIAN MURPHY EMILY BLUNT MATT DAMON ROBERT DOWNEY JR.
          </span>
        </div>
      </div>
    )
  },
  {
    id: "friends",
    title: "Friends",
    url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-transparent to-black/30">
        <div className="absolute inset-0 filter grayscale contrast-125 mix-blend-luminosity opacity-90 pointer-events-none" />
        <div className="text-[5px] font-mono tracking-widest text-neutral-500 text-center uppercase">
          WARNER BROS. TELEVISION
        </div>
        <div className="text-center mt-auto">
          <span className="font-display font-bold text-sm tracking-[0.25em] text-white font-sans">F•R•I•E•N•D•S</span>
        </div>
      </div>
    )
  },
  {
    id: "her",
    title: "Her",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 py-4 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/90 via-rose-900/40 to-transparent">
        {/* Her Solid red tint overlay */}
        <div className="absolute inset-0 bg-rose-600/45 mix-blend-multiply pointer-events-none" />
        <div className="text-[5px] font-mono tracking-wider text-neutral-200 text-center uppercase leading-none">
          JOAQUIN PHOENIX &bull; AMY ADAMS &bull; ROONEY MARA
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="text-[5px] font-sans text-neutral-300 tracking-wider uppercase font-semibold">AND SCARLETT JOHANSSON</span>
          <span className="font-sans font-light text-xl tracking-tight text-white mt-0.5">her<span className="text-pink-500 font-bold">.</span></span>
          <span className="text-[5px] font-mono text-neutral-300 tracking-widest uppercase mt-1">A SPIKE JONZE LOVE STORY</span>
        </div>
      </div>
    )
  },
  {
    id: "vikram",
    title: "Vikram",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-transparent to-black/65">
        <div className="absolute inset-0 filter grayscale contrast-150 brightness-75 mix-blend-color pointer-events-none" />
        <div className="text-[6px] font-mono tracking-widest text-amber-400 text-center uppercase font-bold leading-tight">
          WORLDWIDE RELEASE ON JUNE 3RD
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-display font-extrabold text-base tracking-widest text-white">VIKRAM</span>
          <span className="text-[4px] font-mono text-neutral-500 tracking-[0.15em] uppercase mt-0.5">FILM BY LOKESH KANAGARAJ</span>
        </div>
      </div>
    )
  },
  {
    id: "spider-man",
    title: "Spider-Man",
    url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-red-500 text-center uppercase font-bold">
          MARVEL STUDIOS
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-display font-black text-xs tracking-wide text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none italic">SPIDER-MAN</span>
          <span className="text-[6px] font-sans text-sky-400 tracking-wider font-extrabold uppercase mt-0.5">BRAND NEW DAY</span>
          <span className="text-[4px] font-mono text-neutral-400 tracking-widest uppercase mt-1 leading-tight text-center">EXCLUSIVELY IN IMAX THEATRES JULY 31, 2026</span>
        </div>
      </div>
    )
  },
  {
    id: "ekaki",
    title: "Ekaki",
    url: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/20 to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-medium">
          ACV STUDIOS PRESENTS
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-light text-base tracking-[0.25em] text-white">EKAKI</span>
          <span className="text-[4px] font-sans text-neutral-400 tracking-[0.1em] font-medium uppercase mt-0.5">WRITTEN & DIRECTED BY ASHISH CHANCHLANI</span>
        </div>
        <div className="text-[5px] font-mono tracking-[0.2em] text-neutral-400 text-center uppercase font-semibold">
          YOU WERE NEVER ALONE
        </div>
      </div>
    )
  },
  {
    id: "dune-messiah",
    title: "Dune Messiah",
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=500&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 py-4 select-none pointer-events-none z-10 bg-gradient-to-t from-amber-950/95 via-amber-950/40 to-black/30">
        {/* Desert sunset golden/orange tint */}
        <div className="absolute inset-0 bg-amber-600/15 mix-blend-color-burn pointer-events-none" />
        <div className="text-[6px] font-mono tracking-[0.25em] text-neutral-300 text-center uppercase">
          A DENIS VILLENEUVE FILM
        </div>
        <div className="text-center mt-auto flex flex-col items-center gap-0.5">
          <span className="font-display font-light text-lg tracking-[0.35em] text-amber-500 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">DUNE</span>
          <span className="font-display font-medium text-xs tracking-[0.25em] text-neutral-200 uppercase">MESSIAH</span>
          <span className="text-[6px] font-mono text-amber-400 tracking-[0.4em] uppercase mt-2 font-bold">COMING SOON</span>
        </div>
      </div>
    )
  },
  // Additional premium inactive posters for shuffling
  {
    id: "interstellar",
    title: "Interstellar",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-black/20 to-black/45">
        <div className="text-[6px] font-mono tracking-widest text-neutral-400 text-center uppercase leading-tight font-semibold">
          MATTHEW MCCONAUGHEY &bull; ANNE HATHAWAY
        </div>
        <div className="text-center my-auto flex flex-col items-center">
          <span className="font-display font-bold text-base tracking-[0.2em] text-[#36ffdb] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">INTERSTELLAR</span>
          <span className="text-[5px] font-sans text-neutral-400 tracking-[0.15em] font-medium uppercase mt-0.5">MANKIND WAS BORN ON EARTH</span>
        </div>
        <div className="text-[7px] font-mono tracking-[0.3em] text-cyan-400 text-center font-bold">
          CRITICALLY ACCLAIMED
        </div>
      </div>
    )
  },
  {
    id: "la-la-land",
    title: "La La Land",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 py-4 select-none pointer-events-none z-10 bg-gradient-to-t from-indigo-950/90 via-purple-900/40 to-transparent">
        <div className="absolute inset-0 bg-indigo-500/15 mix-blend-color-dodge pointer-events-none" />
        <div className="text-[5px] font-mono tracking-wider text-neutral-200 text-center uppercase leading-none">
          RYAN GOSLING &bull; EMMA STONE
        </div>
        <div className="text-center mt-auto flex flex-col items-center">
          <span className="font-sans font-light text-xl tracking-wide text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">LA LA LAND</span>
          <span className="text-[5px] font-mono text-pink-300 tracking-widest uppercase mt-1">HERE'S TO THE FOOLS WHO DREAM</span>
        </div>
      </div>
    )
  },
  {
    id: "inception",
    title: "Inception",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-neutral-950/95 via-transparent to-neutral-950/40">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase">
          LEONARDO DICAPRIO
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-black text-sm tracking-[0.3em] text-white">INCEPTION</span>
          <span className="text-[4px] font-mono text-neutral-500 tracking-[0.2em] uppercase mt-1">YOUR MIND IS THE SCENE OF THE CRIME</span>
        </div>
      </div>
    )
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/95 via-transparent to-neutral-950/50">
        <div className="text-[5px] font-mono tracking-widest text-red-500 text-center uppercase font-bold">
          A NETFLIX ORIGINAL SERIES
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-1">
          <span className="font-display font-extrabold text-sm tracking-widest text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]">STRANGER THINGS</span>
          <span className="text-[5px] font-mono text-neutral-400 tracking-[0.1em] uppercase mt-0.5">ONE SUMMER CAN CHANGE EVERYTHING</span>
        </div>
      </div>
    )
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-neutral-950/95 via-blue-950/20 to-neutral-950/60">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase">
          CHRISTIAN BALE &bull; HEATH LEDGER
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-black text-sm tracking-wider text-neutral-200">THE DARK KNIGHT</span>
          <span className="text-[4px] font-mono text-cyan-400 tracking-[0.15em] uppercase mt-0.5">WHY SO SERIOUS?</span>
        </div>
      </div>
    )
  },
  {
    id: "gladiator",
    title: "Gladiator",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-amber-950/95 via-transparent to-neutral-950/40">
        <div className="text-[5px] font-mono tracking-widest text-amber-500/80 text-center uppercase font-bold">
          RUSSELL CROWE
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-medium text-sm tracking-[0.3em] text-white">GLADIATOR</span>
          <span className="text-[4px] font-mono text-neutral-400 tracking-wider uppercase mt-1">WHAT WE DO IN LIFE ECHOES IN ETERNITY</span>
        </div>
      </div>
    )
  },
  {
    id: "blade-runner",
    title: "Blade Runner 2049",
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-pink-950/90 via-cyan-950/40 to-transparent">
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-color-dodge pointer-events-none" />
        <div className="text-[5px] font-mono tracking-wider text-cyan-400 text-center uppercase">
          RYAN GOSLING &bull; HARRISON FORD
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-1">
          <span className="font-display font-black text-sm tracking-widest text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">BLADE RUNNER</span>
          <span className="text-[6px] font-sans text-cyan-300 tracking-[0.3em] font-bold uppercase">2049</span>
        </div>
      </div>
    )
  },
  {
    id: "avatar",
    title: "Avatar",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-cyan-950/95 via-transparent to-black/30">
        <div className="text-[5px] font-mono tracking-widest text-cyan-400 text-center uppercase font-bold">
          JAMES CAMERON FILM
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-light text-base tracking-[0.3em] text-white">AVATAR</span>
          <span className="text-[4px] font-mono text-emerald-400 tracking-wider uppercase mt-1">RETURN TO PANDORA</span>
        </div>
      </div>
    )
  },
  {
    id: "succession",
    title: "Succession",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    watermark: (
      <div className="absolute inset-0 flex flex-col justify-between p-3 select-none pointer-events-none z-10 bg-gradient-to-t from-zinc-950/95 via-transparent to-black/40">
        <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase font-bold">
          HBO ORIGINAL SERIES
        </div>
        <div className="text-center mt-auto flex flex-col items-center pb-2">
          <span className="font-display font-extrabold text-xs tracking-widest text-white italic">SUCCESSION</span>
          <span className="text-[4px] font-mono text-neutral-500 tracking-wider uppercase mt-0.5">THE FINAL SEASON</span>
        </div>
      </div>
    )
  }
];

export default function HeroSection({ onStartExploring }: HeroSectionProps) {
  // Use React state initialized with the first 9 master movies to populate our 9 visual layout slots!
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(() => MASTER_MOVIES.slice(0, 9));

  // Swap 3 random movies on our 9-slot board over time with smooth 3D flip card animations!
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick 3 random unique slots to swap (0 to 8)
      const slotsToSwap: number[] = [];
      while (slotsToSwap.length < 3) {
        const idx = Math.floor(Math.random() * 9);
        if (!slotsToSwap.includes(idx)) {
          slotsToSwap.push(idx);
        }
      }
      
      setCurrentMovies((prevMovies) => {
        // Collect currently visible movie IDs to avoid duplicates on the screen
        const activeIds = new Set(prevMovies.map(m => m.id));
        const inactiveMovies = MASTER_MOVIES.filter(m => !activeIds.has(m.id));
        
        // Ensure we have at least 3 inactive movies to swap
        if (inactiveMovies.length < 3) return prevMovies;
        
        // Grab 3 unique random new movies that are currently off-screen
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
    }, 4000); // Trigger a transition every 4.0 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center py-12 px-6 md:px-12 lg:pl-32 overflow-hidden"
    >
      {/* Very subtle ambient glows - minimal, not overpowering */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#3dd9c8]/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#3dd9c8]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10 w-full">
        
        {/* Left Column Text Content */}
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
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(61, 217, 200, 0.35)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 bg-[#3dd9c8] hover:bg-[#52e3d1] text-neutral-950 font-sans font-semibold px-8 py-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg shadow-cyan-950/20 text-sm"
            >
              <span className="tracking-wide flex items-center gap-1">
                Start Exploring <span className="font-sans font-bold transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Exact Cinematic Movie Poster Collage from Reference Image */}
        <div className="lg:col-span-7 relative w-full flex items-start justify-center select-none overflow-visible min-h-[540px] lg:min-h-[640px]">
          {/* We wrap the entire collage in a scale container to make it beautifully responsive across screen widths */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-[768px] h-[600px] scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-[0.95] 2xl:scale-100 origin-top lg:origin-top-right transition-transform duration-300 shrink-0"
          >
            {/* Ambient backdrop glow behind posters */}
            <div className="absolute top-[180px] left-[200px] w-96 h-96 bg-[#36ffdb]/5 rounded-full blur-[100px] pointer-events-none" />

            {currentMovies.map((movie, index) => {
              const slot = SLOTS[index];
              return (
                <motion.div
                  key={index} // physical position of slot
                  className="absolute cursor-pointer"
                  style={{ 
                    width: `${slot.width}px`, 
                    height: `${slot.height}px`,
                    top: `${slot.top}px`,
                    left: `${slot.left}px`,
                    zIndex: slot.zIndex,
                  }}
                  // Gentle organic floating/bobbing animation
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
                      key={movie.id} // Swap trigger key
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/5 bg-neutral-950 flex flex-col justify-between"
                    >
                      {/* Fluid glass sheeting highlights on posters */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
                      
                      <img 
                        src={movie.url} 
                        alt={movie.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Meticulously crafted custom watermark typography */}
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
