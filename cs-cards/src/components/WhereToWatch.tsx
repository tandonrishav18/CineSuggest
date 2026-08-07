import React from 'react';
import { motion } from 'motion/react';
import { Movie } from '../types';

interface WhereToWatchProps {
  movie: Movie;
}

const DEFAULT_STREAM_PROVIDERS: StreamProvider[] = [
  { name: 'Jio Hotstar', logo: '', watchUrl: '#watch-jio-hotstar' },
  { name: 'Netflix', logo: '', watchUrl: '#watch-netflix' },
  { name: 'Amazon Prime Video', logo: '', watchUrl: '#watch-amazon-prime-video' },
  { name: 'Youtube', logo: '', watchUrl: '#watch-youtube', priceText: 'Rent From Rs. 120' },
];

export default function WhereToWatch({ movie }: WhereToWatchProps) {
  const isNosferatu = movie.id === 'nosferatu';
  
  const providers = movie.streamProviders && movie.streamProviders.length > 0
    ? movie.streamProviders
    : DEFAULT_STREAM_PROVIDERS;

  const stillImage = movie.stillUrl || movie.trailerThumbUrl || movie.posterUrl || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80';

  // Custom SVG Vector Logos matching official app icons
  const renderProviderLogo = (name: string) => {
    const n = name.toLowerCase();

    // NETFLIX: Black rounded icon with red N logo
    if (n.includes('netflix')) {
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black border border-neutral-800 shadow-md">
          <svg viewBox="0 0 24 30" className="h-6 w-5">
            <path d="M 4 2 L 8.5 2 L 8.5 28 L 4 28 Z" fill="#E50914" />
            <path d="M 15.5 2 L 20 2 L 20 28 L 15.5 28 Z" fill="#E50914" />
            <path d="M 4 2 L 9.5 2 L 20 28 L 14.5 28 Z" fill="#B81D24" />
            <path d="M 4 2 L 8.5 2 L 20 28 L 15.5 28 Z" fill="#E50914" />
          </svg>
        </div>
      );
    }

    // JIO HOTSTAR / DISNEY+ HOTSTAR: Dark blue gradient with yellow-pink-blue starburst
    if (n.includes('hotstar') || n.includes('disney')) {
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#020514] via-[#0b1442] to-[#162775] border border-[#1f286f] shadow-lg">
          <svg viewBox="0 0 100 100" className="h-7 w-7">
            <defs>
              <radialGradient id="hotstar-burst" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#ffeb3b" />
                <stop offset="70%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#1565c0" />
              </radialGradient>
            </defs>
            <g transform="translate(50,50)">
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M0,0 L3.5,-30 L0,-38 L-3.5,-30 Z"
                  fill="url(#hotstar-burst)"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx="0" cy="0" r="7" fill="#ffffff" />
            </g>
          </svg>
        </div>
      );
    }

    // AMAZON PRIME VIDEO: Deep royal blue rounded icon with white Prime Video & smile arrow logo
    if (n.includes('prime') || n.includes('amazon')) {
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00A8E1] shadow-md">
          <svg viewBox="0 0 50 50" className="h-7 w-7" fill="none">
            {/* prime text */}
            <text x="5" y="24" fill="white" fontSize="13" fontWeight="900" fontFamily="sans-serif">prime</text>
            <text x="5" y="34" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">video</text>
            {/* Smile Arrow Curve */}
            <path d="M 6 38 C 18 45 34 44 43 36" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M 39 33 L 44 36 L 40 40 Z" fill="white" />
          </svg>
        </div>
      );
    }

    // YOUTUBE: Bright red rounded icon with white play triangle
    if (n.includes('youtube')) {
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF0000] shadow-md">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white">
            <path d="M21.58 7.19a2.71 2.71 0 0 0-1.9-1.92C17.99 4.75 12 4.75 12 4.75s-5.99 0-7.68.52a2.71 2.71 0 0 0-1.9 1.92C2 8.89 2 12 2 12s0 3.11.42 4.81a2.71 2.71 0 0 0 1.9 1.92c1.69.52 7.68.52 7.68.52s5.99 0 7.68-.52a2.71 2.71 0 0 0 1.9-1.92C22 15.11 22 12 22 12s0-3.11-.42-4.81z" fill="#FF0000" />
            <path d="M10 15l5-3-5-3v6z" fill="white" />
          </svg>
        </div>
      );
    }

    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0a1217] text-slate-400 border border-[#112332]">
        🍿
      </div>
    );
  };

  // Safe image loading via weserv image proxy to bypass hotlinking protections
  const proxiedImageUrl = stillImage.startsWith('http')
    ? `https://images.weserv.nl/?url=${encodeURIComponent(stillImage)}`
    : stillImage;

  const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 mt-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Movie Still Image (Spans 5 cols, level with right list) */}
        <motion.div 
          className="md:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#112332] bg-[#071118] group cursor-pointer"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={proxiedImageUrl}
            alt="Cinematic still from movie scene"
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isNosferatu ? 'object-[center_22%]' : ''}`}
          />
          {/* Subtle grid light leak / overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* RIGHT COLUMN: Where to Watch List (Spans 7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-start gap-3 pl-0 md:pl-6 py-0.5">
          <h3 className="font-share text-xl md:text-2xl font-bold text-white mb-2 select-none">
            Where to watch:
          </h3>
          
          <motion.div 
            className="flex flex-col gap-5"
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
          >
            {providers.map((provider) => (
              <motion.div 
                key={provider.name} 
                variants={itemVariants}
                className="flex items-center justify-between gap-4 p-2.5 -mx-2.5 rounded-2xl border border-transparent hover:border-[#112332]/40 hover:bg-slate-950/45 transition-colors duration-300 group"
              >
                {/* Logo & Name */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
                    transition={{
                      scale: { type: "spring", stiffness: 400, damping: 15 },
                      rotate: { type: "keyframes", duration: 0.35, ease: "easeInOut" }
                    }}
                  >
                    {renderProviderLogo(provider.name)}
                  </motion.div>
                  <span className="font-sans text-base md:text-lg font-semibold text-white group-hover:text-[#4df2d6] transition-colors duration-300">
                    {provider.name}
                  </span>
                </div>

                {/* Button */}
                <div>
                  <motion.a
                    href={provider.watchUrl}
                    className="inline-block rounded-full border border-white px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#03080c] transition-all duration-300 text-center whitespace-nowrap cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  >
                    {provider.priceText ? provider.priceText : 'Watch Now'}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
