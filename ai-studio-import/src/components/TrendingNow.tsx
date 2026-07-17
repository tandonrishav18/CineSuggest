import { ArrowRight, Bell, ChevronRight, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Movie } from "../types";
import { FEATURED_DUNE, TRENDING_MOVIES } from "../data/movies";

function renderMoviePosterWatermark(movieId: string, title: string) {
  switch (movieId) {
    case "the-boys":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/10 to-black/40">
          <div className="text-[6px] font-mono tracking-[0.25em] text-neutral-400 text-center uppercase font-bold mt-1.5">
            PRIME ORIGINAL
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-lg tracking-tighter text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] scale-y-110 leading-none">
              THE <span className="text-neutral-300">BOYS</span>
            </span>
          </div>
          <div className="flex justify-between items-center text-[5px] font-mono tracking-wider text-neutral-400 mb-1 px-1">
            <span className="text-amber-500 font-bold">prime</span>
            <span>FINAL SEASON &bull; APRIL 8</span>
          </div>
        </div>
      );
    case "sanju":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/85 via-transparent to-black/35">
          <div className="text-[5px] font-sans tracking-[0.2em] text-neutral-300 text-center uppercase mt-1.5 font-bold">
            A RAJKUMAR HIRANI FILM
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-2xl tracking-widest text-sky-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
              SANJU
            </span>
          </div>
          <div className="text-[5px] font-sans tracking-[0.15em] text-neutral-300 text-center uppercase mb-1 font-semibold">
            ONE MAN... MANY LIVES
          </div>
        </div>
      );
    case "mortal-kombat":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/45">
          <div className="text-[5px] font-mono tracking-[0.2em] text-amber-500 text-center uppercase font-bold mt-1.5">
            WARNER BROS. PICTURES
          </div>
          <div className="text-center my-auto flex flex-col items-center gap-0.5">
            <span className="text-xs">🐉</span>
            <span className="font-sans font-black text-[9px] tracking-[0.15em] text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              MORTAL KOMBAT
            </span>
          </div>
          <div className="text-[5px] font-mono tracking-[0.1em] text-neutral-400 text-center uppercase mb-1 font-medium">
            ONLY IN THEATRES MAY 8
          </div>
        </div>
      );
    case "sky-force":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/45">
          <div className="text-[5px] font-mono tracking-widest text-cyan-400 text-center uppercase font-bold mt-1.5">
            MADDOCK FILMS PRESENTS
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-sm tracking-widest text-white leading-none uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
              SKY FORCE
            </span>
            <span className="text-[5px] font-sans text-neutral-400 tracking-[0.25em] font-medium uppercase mt-0.5">
              HINDI
            </span>
          </div>
          <div className="text-[4px] font-mono tracking-widest text-neutral-500 text-center uppercase mb-1">
            COMING SOON IN THEATRES
          </div>
        </div>
      );
    case "avengers-endgame":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-transparent to-black/40">
          <div className="text-[5px] font-mono tracking-widest text-red-500 text-center uppercase font-bold mt-1.5">
            MARVEL STUDIOS
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-xs tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase italic">
              AVENGERS
            </span>
            <span className="text-[7px] font-mono text-indigo-400 tracking-[0.2em] font-extrabold uppercase -mt-0.5">
              ENDGAME
            </span>
          </div>
          <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase mb-1">
            APRIL 26
          </div>
        </div>
      );
    case "sinners":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 py-3 select-none pointer-events-none z-10 bg-gradient-to-t from-black/95 via-transparent to-black/40">
          <div className="text-[4px] font-mono tracking-[0.1em] text-neutral-300 text-center uppercase leading-normal mt-0.5">
            FROM RYAN COOGLER<br />
            <span className="text-neutral-500 text-[3px]">DIRECTOR OF BLACK PANTHER & CREED</span>
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-base tracking-[0.15em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] uppercase">
              SINNERS
            </span>
            <span className="text-[4.5px] font-mono text-red-500 tracking-widest uppercase font-bold mt-1">
              DANCE WITH THE DEVIL
            </span>
          </div>
          <div className="text-[4.5px] font-mono tracking-widest text-neutral-400 text-center uppercase mb-0.5">
            ONLY IN THEATRES APRIL 18
          </div>
        </div>
      );
    case "moonlight":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 py-3 select-none pointer-events-none z-10 bg-gradient-to-t from-purple-950/85 via-blue-950/40 to-black/25">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/35 via-transparent to-pink-500/20 mix-blend-color pointer-events-none" />
          <div className="text-[5px] font-mono tracking-[0.2em] text-cyan-300 text-center uppercase font-semibold mt-0.5">
            THIS IS THE STORY OF A LIFETIME
          </div>
          <div className="text-center mt-auto pb-0.5 flex flex-col items-center">
            <span className="font-sans font-light text-sm tracking-[0.3em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
              MOONLIGHT
            </span>
          </div>
        </div>
      );
    case "modern-family":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/85 via-transparent to-black/30">
          <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase mt-1.5">
            ABC ORIGINAL SERIES
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-light text-xs tracking-tight text-white uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              modern <span className="font-sans font-bold text-orange-500">family</span>
            </span>
          </div>
          <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase mb-1">
            COMPLETE SERIES
          </div>
        </div>
      );
    case "the-backrooms":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 py-3 select-none pointer-events-none z-10 bg-gradient-to-t from-neutral-950/95 via-transparent to-black/40">
          <div className="text-[4px] font-mono tracking-[0.15em] text-amber-500/80 text-center uppercase leading-normal mt-0.5">
            DON'T LOSE YOUR STEP<br />
            <span className="text-neutral-500 text-[3px]">YOU MAY NEVER FIND IT AGAIN</span>
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-light text-[9px] tracking-[0.2em] text-neutral-300 uppercase leading-none">
              WELCOME TO
            </span>
            <span className="font-sans font-bold text-[9px] tracking-[0.15em] text-white uppercase mt-0.5">
              THE BACKROOMS
            </span>
          </div>
          <div className="flex justify-between items-center text-[4px] font-mono tracking-widest text-neutral-400 uppercase mb-0.5 px-0.5">
            <span className="font-bold text-neutral-200">A24</span>
            <span>COMING SOON</span>
          </div>
        </div>
      );
    case "dhurandhar":
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-2 py-3 select-none pointer-events-none z-10 bg-gradient-to-t from-red-950/90 via-transparent to-black/40">
          <div className="text-[5px] font-mono tracking-widest text-neutral-400 text-center uppercase mt-0.5">
            AN ADITYA DHAR FILM
          </div>
          <div className="text-center my-auto flex flex-col items-center">
            <span className="font-sans font-black text-xs tracking-wider text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase italic scale-y-110">
              DHURANDHAR
            </span>
          </div>
          <div className="text-[4px] font-mono tracking-widest text-neutral-400 text-center uppercase font-bold mb-0.5">
            EXCLUSIVELY IN THEATRES 5TH DECEMBER
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 flex flex-col justify-end p-2 select-none pointer-events-none z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
          <span className="font-sans font-bold text-[10px] tracking-wider text-white drop-shadow-md uppercase truncate">
            {title}
          </span>
        </div>
      );
  }
}

export default function TrendingNow() {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isReminded, setIsReminded] = useState<boolean>(false);
  const [currentSelectedMovie, setCurrentSelectedMovie] = useState<Movie>(FEATURED_DUNE);

  return (
    <section
      id="trending"
      className="py-16 px-6 md:px-12 lg:pl-32 max-w-7xl mx-auto w-full relative border-t border-neutral-900/50"
    >
      {/* Decorative side leak */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Container */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
              Trending Now
            </h2>
            {/* Circular Next Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#36ffdb", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-[#142337] bg-[#070f19] flex items-center justify-center text-[#36ffdb] transition-colors duration-200 cursor-pointer"
              aria-label="View more trending movies"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-neutral-500 text-sm font-sans mt-1">Choose the hot Picks</p>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Highlighted Showcase Card */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSelectedMovie.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-[#14273f]/60 bg-neutral-950 group"
            >
              {/* Card Backdrop Image */}
              <img
                src={currentSelectedMovie.backdropUrl || currentSelectedMovie.posterUrl}
                alt={currentSelectedMovie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Warner Bros overlay logo/visual details for custom feeling */}
              {currentSelectedMovie.id === "dune-part-three" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="w-28 h-28 border-[3px] border-amber-500/70 rounded-full flex items-center justify-center rotate-45 select-none pointer-events-none">
                    <span className="text-amber-500 font-extrabold text-3xl tracking-wider -rotate-45 font-display">WB</span>
                  </div>
                </div>
              )}

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Highlight Card Content (Inside Image) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 justify-end">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white tracking-wide">
                    {currentSelectedMovie.title}
                  </h3>
                </div>

                {/* Interactive Controls Row */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {/* Like / Thumbs Up Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isLiked
                          ? "bg-[#36ffdb]/20 border-[#36ffdb] text-[#36ffdb]"
                          : "bg-black/60 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600"
                      }`}
                    >
                      <ThumbsUp className={`w-4.5 h-4.5 ${isLiked ? "fill-[#36ffdb]/25" : ""}`} />
                    </motion.button>

                    {/* Remind Me Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsReminded(!isReminded)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-sans font-medium cursor-pointer transition-all duration-300 ${
                        isReminded
                          ? "bg-[#36ffdb] text-neutral-950 border-[#36ffdb]"
                          : "bg-black/80 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600"
                      }`}
                    >
                      <Bell className={`w-3.5 h-3.5 ${isReminded ? "fill-neutral-950" : ""}`} />
                      <span>{isReminded ? "Reminded" : "Remind Me"}</span>
                    </motion.button>
                  </div>

                  {currentSelectedMovie.rating && (
                    <span className="px-3 py-1 text-[11px] font-mono bg-neutral-900/90 text-neutral-300 border border-neutral-800 rounded-full tracking-wider shrink-0">
                      {currentSelectedMovie.rating}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Description Text Below Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSelectedMovie.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-left"
            >
              <p className="text-neutral-400 text-sm md:text-base font-sans font-light leading-relaxed">
                <span className="font-semibold text-neutral-200">{currentSelectedMovie.title}</span> {currentSelectedMovie.description}
                {" "}
                <a
                  href={currentSelectedMovie.wikipediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#36ffdb] hover:underline inline-flex items-center gap-0.5 ml-1 font-medium group/link"
                >
                  Read More in Wikipedia
                  <ArrowRight className="w-3 h-3 inline transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Grid of 10 Movies */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {TRENDING_MOVIES.map((movie) => {
              const isCurrent = movie.id === currentSelectedMovie.id;

              return (
                <motion.div
                  key={movie.id}
                  onClick={() => {
                    setCurrentSelectedMovie(movie);
                    setIsLiked(false);
                    setIsReminded(false);
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.6), 0 0 15px rgba(54,255,219,0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`aspect-[2/3] rounded-2xl overflow-hidden relative cursor-pointer border transition-all duration-300 bg-neutral-900 shadow-md group ${
                    isCurrent
                      ? "border-[#36ffdb] shadow-[0_0_12px_rgba(54,255,219,0.3)] ring-1 ring-[#36ffdb]/50"
                      : "border-[#142337]/90 hover:border-neutral-600"
                  }`}
                >
                  {/* Poster Image */}
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />

                  {/* Beautiful Custom Authentic Movie Poster Watermark Overlays */}
                  {renderMoviePosterWatermark(movie.id, movie.title)}

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                  {/* Glass highlighting sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Subtle highlight borders */}
                  {isCurrent && (
                    <div className="absolute inset-0 border-2 border-[#36ffdb] rounded-2xl pointer-events-none z-20" />
                  )}



                  {/* Hover Info Overlay with Title, Chevron Button, and Gradient Rating Dots */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-center justify-between gap-2 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out select-none">
                    <div className="flex flex-col text-left min-w-0 flex-1">
                      <span className="text-white font-bold font-sans text-[11px] tracking-wide leading-snug break-normal whitespace-normal">
                        {movie.title}
                      </span>
                      {/* Gradient Dots/Pills matching the design perfectly */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="w-2 h-2 shrink-0 rounded-full bg-[#36ffdb] shadow-[0_0_6px_rgba(54,255,219,0.8)]" />
                        <div className="w-2 h-2 shrink-0 rounded-full bg-cyan-400" />
                        <div className="w-2 h-2 shrink-0 rounded-full bg-cyan-500/80" />
                        <div className="w-2 h-2 shrink-0 rounded-full bg-teal-600/70" />
                        <div className="w-2 h-2 shrink-0 rounded-full bg-neutral-700/60" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}