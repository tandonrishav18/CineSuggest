import React from 'react';
import { motion } from 'motion/react';
import { Movie } from '../types';

interface WhereToWatchProps {
  movie: Movie;
}

export default function WhereToWatch({ movie }: WhereToWatchProps) {
  const isNosferatu = movie.id === 'nosferatu';
  
  // Custom SVG Vector Logos for crisp, authentic, matching rendering
  const renderProviderLogo = (name: string) => {
    switch (name.toLowerCase()) {
      case 'jio hotstar':
        return (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0b0c16] via-[#101438] to-[#1a1c62] border border-[#1f286f] shadow-lg">
            <svg viewBox="0 0 100 100" className="h-7 w-7">
              <defs>
                <radialGradient id="hotstar-sun" cx="0" cy="0" r="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#ffea00" />
                  <stop offset="60%" stopColor="#ff007c" />
                  <stop offset="100%" stopColor="#181145" />
                </radialGradient>
              </defs>
              <g transform="translate(50,50)">
                {/* Glowing background inside translated group */}
                <circle cx="0" cy="0" r="45" fill="url(#hotstar-sun)" opacity="0.25" />
                
                {/* Primary Radiating Spikes */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8;
                  return (
                    <path
                      key={i}
                      d="M0,0 L4,-32 L0,-40 L-4,-32 Z"
                      fill="url(#hotstar-sun)"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
                {/* Secondary Radiating Spikes */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8 + 22.5;
                  return (
                    <path
                      key={i}
                      d="M0,0 L2.5,-20 L0,-26 L-2.5,-20 Z"
                      fill="url(#hotstar-sun)"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
                {/* White Center Star */}
                <circle cx="0" cy="0" r="7" fill="#ffffff" />
              </g>
            </svg>
          </div>
        );
      case 'netflix':
        return (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
            <svg viewBox="0 0 24 30" className="h-6 w-5">
              {/* Left pillar */}
              <path d="M 4 2 L 8 2 L 8 28 L 4 28 Z" fill="#E50914" />
              {/* Right pillar */}
              <path d="M 16 2 L 20 2 L 20 28 L 16 28 Z" fill="#E50914" />
              {/* Middle diagonal with shadow folder depth */}
              <path d="M 4 2 L 10 2 L 20 28 L 16 28 Z" fill="#B81D24" />
            </svg>
          </div>
        );
      case 'amazon prime video':
        return (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00a8e1] shadow-md">
            <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none">
              <path d="M6 32c8 8 24 8 32 0" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M32 28l6 4-2-7" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="7" y="21" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif">prime</text>
            </svg>
          </div>
        );
      case 'youtube':
        return (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff0000] shadow-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a1217] text-slate-400 border border-[#112332]">
            🍿
          </div>
        );
    }
  };

  // Safe image loading via weserv image proxy to bypass hotlinking protections
  const proxiedImageUrl = movie.stillUrl.startsWith('http')
    ? `https://images.weserv.nl/?url=${encodeURIComponent(movie.stillUrl)}`
    : movie.stillUrl;

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
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 mt-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Movie Still Image (Spans 5 cols, level with right list) */}
        <motion.div 
          className="md:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#112332] bg-[#071118]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={proxiedImageUrl}
            alt="Cinematic still from movie scene"
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover ${isNosferatu ? 'object-[center_22%]' : ''}`}
          />
          {/* Subtle grid light leak / overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* RIGHT COLUMN: Where to Watch List (Spans 7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between pl-0 md:pl-6 py-0.5">
          <h3 className="font-share text-xl md:text-2xl font-bold text-white mb-6 select-none">
            Where to watch:
          </h3>
          
          <motion.div 
            className="flex flex-col gap-5"
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
          >
            {movie.streamProviders.map((provider) => (
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
