import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import { Movie } from "../types";
import {
  Play,
  ChevronLeft,
  ThumbsUp,
  RefreshCw,
  Check,
  SmilePlus,
  MessageSquare,
  Share2,
  ChevronRight,
  ListPlus,
  User2,
  Star,
  Flame,
  X,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EMOJI_LIST = [
  "🍿", "🎬", "⭐", "🔥", "🤯", "😱", "😭", "🤩", 
  "💀", "💯", "❤️", "🤡", "👿", "👏", "🥳", "👍", 
  "💩", "💖", "🏆", "⚡", "🧟", "🦇", "🕷️", "🔪", 
  "🩸", "🚀", "👽", "💥", "🎭", "🎥", "🎟️", "🍿"
];

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

/* ─── rating dial SVG ──────────────────────────────────────────── */
const RatingDial = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    className="cursor-pointer hover:opacity-80 transition-opacity select-none shrink-0"
  >
    <circle cx="26" cy="26" r="23" fill="none" stroke="#2a3a4a" strokeWidth="1.5" />
    {/* left half darker, right half lighter */}
    <path d="M 26 3 A 23 23 0 0 0 26 49 Z" fill="#1a2a38" />
    <path d="M 26 3 A 23 23 0 0 1 26 49 Z" fill="#233244" />
    <line x1="26" y1="3" x2="26" y2="49" stroke="#2d4055" strokeWidth="1" />
    <circle cx="26" cy="26" r="23" fill="none" stroke="#2d4a60" strokeWidth="1.5" />
  </svg>
);

/* ─── small rating dot ─────────────────────────────────────────── */
const RatingDot = ({ filled, half }: { filled?: boolean; half?: boolean }) => (
  <div className="relative w-4 h-4 rounded-full border border-[#36ffdb]/40 bg-[#0d1b2a] overflow-hidden">
    {filled && <div className="absolute inset-0 bg-[#36ffdb] rounded-full" />}
    {half && <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#36ffdb]" />}
  </div>
);

/* ─── platform logos ───────────────────────────────────────────── */
const JioHotstarLogo = () => (
  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#1a1aff] via-[#1b8ef8] to-[#21d4fd] flex items-center justify-center shadow-md">
    <svg viewBox="0 0 32 32" width="22" height="22">
      <text x="4" y="22" fontSize="18" fontWeight="bold" fill="white" fontFamily="Arial">H</text>
    </svg>
  </div>
);

const NetflixLogo = () => (
  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-black border border-neutral-800 flex items-center justify-center shadow-md">
    <svg viewBox="0 0 32 32" width="22" height="22">
      <text x="5" y="23" fontSize="20" fontWeight="900" fill="#e50914" fontFamily="Arial">N</text>
    </svg>
  </div>
);

const PrimeVideoLogo = () => (
  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#00A8E0] flex items-center justify-center shadow-md">
    <svg viewBox="0 0 32 32" width="28" height="28">
      <text x="2" y="14" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">prime</text>
      <text x="2" y="23" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">video</text>
    </svg>
  </div>
);

const YoutubeLogo = () => (
  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#FF0000] flex items-center justify-center shadow-md">
    <Play className="w-4 h-4 fill-white text-white translate-x-[1px]" />
  </div>
);

/* ─── movie data ───────────────────────────────────────────────── */
const getSinnersDetails = () => ({
  genres: ["Horror", "Supernatural", "Musical"],
  runtime: "2H 17M",
  year: "2025",
  ratingPill: "R | violence, sexual content, language",
  imdb: "9.4/10",
  rotten: "97% Fresh",
  // locally-downloaded poster — loads reliably
  posterUrl: "/assets/sinners-poster.jpg",
  // wide Michael B Jordan promo image for trailer thumbnail
  trailerThumb: "/assets/sinners-scene.jpg",
  // wide MBJ promo backdrop used as secondary scene image
  sceneImg: "/assets/sinners-backdrop2.jpg",
  description:
    "Twin brothers return to their hometown hoping for a fresh start, only to uncover an ancient evil lurking in the shadows. Ryan Coogler's Sinners blends Southern Gothic horror, music, and folklore into a haunting, genre-defying experience.",
});

const platforms = [
  { name: "Jio Hotstar", Logo: JioHotstarLogo, action: "Watch Now" },
  { name: "Netflix",     Logo: NetflixLogo,    action: "Watch Now" },
  { name: "Amazon Prime Video", Logo: PrimeVideoLogo, action: "Watch Now" },
  { name: "Youtube",    Logo: YoutubeLogo,    action: "Rent From Rs. 120" },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const [hasRewatched, setHasRewatched] = useState(false);
  const [reviewInputText, setReviewInputText] = useState("");
  const [showMovieDetailsEmojiPicker, setShowMovieDetailsEmojiPicker] = useState(false);
  const movieDetailsEmojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (movieDetailsEmojiRef.current && !movieDetailsEmojiRef.current.contains(event.target as Node)) {
        setShowMovieDetailsEmojiPicker(false);
      }
    };

    if (showMovieDetailsEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMovieDetailsEmojiPicker]);
  const isSinners = movie.id === "sinners";
  const d = isSinners ? getSinnersDetails() : {
    genres: ["Drama"],
    runtime: "2H 00M",
    year: "2024",
    ratingPill: "PG-13",
    imdb: "7.9/10",
    rotten: "85% Fresh",
    posterUrl: movie.posterUrl,
    trailerThumb: movie.backdropUrl ?? "",
    sceneImg: movie.backdropUrl ?? "",
    description: movie.description,
  };

  // For non-sinners movies still use their own poster
  const posterSrc = isSinners ? d.posterUrl : movie.posterUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-[#03060a] overflow-y-auto text-neutral-100 font-sans pointer-events-auto"
    >
      {/* subtle grid bg */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Navbar */}
      <Navbar onSearch={() => {}} />

      {/* ── page body ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 pt-[90px] pb-20">

        {/* back button */}
        <button
          onClick={onClose}
          className="mb-7 w-10 h-10 rounded-full border border-neutral-800 bg-[#0b1622]/80 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* ── two-column hero ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

          {/* LEFT: poster + description + scene */}
          <div className="flex flex-col gap-5">
            {/* poster */}
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-neutral-900 aspect-[2/3]">
              <img
                src={posterSrc}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* description */}
            <p className="text-neutral-400 text-[13px] leading-[1.75] font-light">
              {d.description}
            </p>

            {/* scene / secondary image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] bg-neutral-900 aspect-[4/3]">
              <img
                src={d.sceneImg}
                alt="Movie scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: trailer + meta + platforms */}
          <div className="flex flex-col gap-6">

            {/* trailer card */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] bg-neutral-900 aspect-video group">
              <img
                src={d.trailerThumb}
                alt="Trailer"
                className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />
              {/* play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-14 h-14 rounded-full border-2 border-white/80 bg-black/40 hover:bg-black/60 flex items-center justify-center transition-all">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </button>
              </div>
              {/* title watermark */}
              <div className="absolute bottom-4 left-5 pointer-events-none">
                <p className="text-lg font-black uppercase tracking-widest text-white drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                  {movie.title}
                </p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-300 mt-0.5">
                  Official Trailer
                </p>
              </div>
            </div>

            {/* title + like + genres */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[28px] font-bold tracking-tight text-white">
                {movie.title}
              </h1>
              <button className="w-7 h-7 rounded-full border border-neutral-700 bg-[#0d1b2a] flex items-center justify-center text-neutral-400 hover:text-[#36ffdb] hover:border-[#36ffdb]/40 transition-all">
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              {d.genres.map((g) => (
                <span key={g} className="px-3 py-1 text-[11px] text-neutral-400 border border-neutral-800 rounded-full bg-[#0b1622] opacity-50 select-none">
                  {g}
                </span>
              ))}
            </div>

            {/* year + runtime + content pill */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] text-neutral-500 font-light tracking-widest">
                {d.year} | {d.runtime}
              </span>
              <span className="px-3 py-1 text-[11px] text-neutral-500 border border-neutral-800 rounded-full bg-[#0b1622] opacity-50 select-none">
                {d.ratingPill}
              </span>
            </div>

            {/* rating dots + scores + action buttons */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-900 pb-6">
              <div className="flex flex-col gap-1.5">
                {/* dots */}
                <div className="flex items-center gap-1.5">
                  <RatingDot filled />
                  <RatingDot filled />
                  <RatingDot filled />
                  <RatingDot filled />
                  <RatingDot half />
                </div>
                <p className="text-[12px] text-neutral-400 leading-loose font-light">
                  Imdb rating: <span className="text-neutral-100 font-semibold">{d.imdb}</span>
                </p>
                <p className="text-[12px] text-neutral-400 font-light">
                  Rotten tomatoes: <span className="text-neutral-100 font-semibold">{d.rotten}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <motion.button 
                  initial={{ backgroundColor: "#75D4CB" }}
                  animate={{ backgroundColor: "#75D4CB" }}
                  whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-6 py-2.5 text-[#03080c] text-sm font-sans font-normal rounded-full cursor-pointer shadow-md select-none"
                >
                  <span>Rate now</span>
                  <motion.span 
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.button>
                <button className="flex items-center gap-2 px-5 py-2 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 text-[12px] font-medium rounded-full transition-all cursor-pointer">
                  <ListPlus className="w-3.5 h-3.5 text-[#36ffdb]" />
                  Add to cine list
                </button>
              </div>
            </div>

            {/* where to watch */}
            <div>
              <h3 className="text-[13px] font-bold text-white tracking-wider uppercase mb-3">
                Where to watch:
              </h3>
              <div className="flex flex-col gap-2">
                {platforms.map(({ name, Logo, action }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between px-4 py-3 bg-[#080f19]/70 border border-[#14273f]/50 rounded-2xl hover:border-[#14273f] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Logo />
                      <span className="text-[13px] font-medium text-neutral-300">{name}</span>
                    </div>
                    <button className="px-4 py-1.5 border border-neutral-700 bg-[#0b1622] hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-medium rounded-full transition-all cursor-pointer">
                      {action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Rate Now ────────────────────────────────────────── */}
        <div className="mt-14 border-t border-neutral-900 pt-10">
          <div className="flex items-center gap-3 mb-7">
            <h2 className="text-[26px] font-bold text-white tracking-tight">Rate Now</h2>
            <button className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center text-[#36ffdb] hover:bg-neutral-800 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5 max-w-3xl">
            {/* rewatch card */}
            <div className="flex flex-col items-center justify-center text-center p-7 bg-[#070e18] border border-[#14273f]/50 rounded-2xl gap-4">
              <RefreshCw className="w-6 h-6 text-[#36ffdb]" strokeWidth={2} />
              <div className="font-share text-[42px] font-bold text-white leading-none">
                <span>92</span>
                <span className="text-xl font-bold text-white">%</span>
              </div>
              <p className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">Rewatch Value</p>
              <motion.button 
                layout
                onClick={() => setHasRewatched(!hasRewatched)}
                initial={false}
                animate={{
                  width: hasRewatched ? 36 : 145,
                  backgroundColor: hasRewatched ? "#5ce1cb" : "rgba(0,0,0,0)",
                  color: hasRewatched ? "#000000" : "#d4d4d4",
                  borderColor: hasRewatched ? "transparent" : "rgb(64, 64, 64)",
                  boxShadow: hasRewatched ? "0 0 16px rgba(92,225,203,0.7)" : "0 0 0px rgba(0,0,0,0)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative flex h-8 items-center justify-center rounded-full text-[11px] font-semibold select-none cursor-pointer whitespace-nowrap overflow-hidden border"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {hasRewatched ? (
                    <motion.div
                      key="voted"
                      initial={{ scale: 0.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.2, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="flex items-center justify-center"
                    >
                      <Check size={14} className="text-black stroke-[3.5]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unvoted"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3 text-current" />
                      <span>Worth a rewatch</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* review input card */}
            <div className="flex flex-col justify-between p-6 bg-[#070e18] border border-[#14273f]/50 rounded-2xl gap-5">
              {/* 5 dials */}
              <div className="flex items-center gap-3">
                <RatingDial />
                <RatingDial />
                <RatingDial />
                <RatingDial />
                <RatingDial />
              </div>

              {/* review input */}
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#0e2030] border border-[#36ffdb]/15 flex items-center justify-center text-[#36ffdb] shrink-0">
                  <User2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Add your review"
                  value={reviewInputText}
                  onChange={(e) => setReviewInputText(e.target.value.slice(0, 150))}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    if (pastedText) {
                      e.preventDefault();
                      const target = e.currentTarget;
                      const start = target.selectionStart ?? reviewInputText.length;
                      const end = target.selectionEnd ?? reviewInputText.length;
                      const nextText = (reviewInputText.slice(0, start) + pastedText + reviewInputText.slice(end)).slice(0, 150);
                      setReviewInputText(nextText);
                    }
                  }}
                  className="flex-1 bg-transparent text-[13px] text-neutral-300 placeholder-neutral-600 outline-none"
                />
                <span className="text-[11px] text-neutral-600 font-mono shrink-0">{reviewInputText.length}/150</span>
                <div ref={movieDetailsEmojiRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShowMovieDetailsEmojiPicker(!showMovieDetailsEmojiPicker)}
                    className={`transition-colors shrink-0 cursor-pointer ${showMovieDetailsEmojiPicker ? 'text-[#36ffdb]' : 'text-neutral-600 hover:text-[#36ffdb]'}`}
                    title="Add emoji"
                  >
                    <SmilePlus className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showMovieDetailsEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 8 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="absolute right-0 bottom-9 z-50 p-3.5 bg-[#071118]/95 border border-[#14273f] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl w-64 select-none"
                      >
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800 text-xs font-sans text-neutral-300 font-semibold tracking-wide">
                          <span>Choose an Emoji</span>
                          <button
                            type="button"
                            onClick={() => setShowMovieDetailsEmojiPicker(false)}
                            className="text-neutral-500 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-8 gap-1.5 max-h-36 overflow-y-auto pr-0.5">
                          {EMOJI_LIST.map((emoji, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              whileHover={{ scale: 1.28, backgroundColor: "rgba(54, 255, 219, 0.15)" }}
                              whileTap={{ scale: 0.88 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              onClick={() => {
                                setReviewInputText((prev) => `${prev} ${emoji}`.slice(0, 150));
                              }}
                              className="w-7 h-7 text-base flex items-center justify-center rounded-lg text-neutral-100 transition-colors cursor-pointer"
                            >
                              {emoji}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* submit */}
              <div>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-[#75D4CB] hover:bg-[#22A498] text-[#03080c] text-sm font-sans font-normal rounded-full transition-all cursor-pointer select-none shadow-md"
                >
                  Submit Your Review →
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Community Reviews ────────────────────────────────── */}
        <div className="mt-14 border-t border-neutral-900 pt-10">
          <h2 className="text-[26px] font-bold text-white tracking-tight mb-7">Community Reviews</h2>

          <div className="flex flex-col gap-5 max-w-3xl">

            {/* review 1 */}
            <div className="p-6 bg-[#070e18] border border-[#14273f]/50 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-700 to-blue-900 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    CW
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">CosmicWatcher</p>
                    <p className="text-[11px] text-neutral-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e1f30] border border-cyan-500/25 text-cyan-400 text-[11px] font-medium">
                  <Star className="w-3 h-3 fill-current" />
                  98% Mind Blow
                </div>
              </div>

              <div className="text-[12.5px] text-neutral-300 leading-relaxed font-light flex flex-col gap-2.5">
                <p>The movie was good and interesting for a historic fantasy kind of genre but it is seriously overhyped.</p>
                <p>The best part was by far the music. If I rated the score alone it would be around an 8.5/10.</p>
                <p>The plot felt very surface-level with little backstory or explanation for the motivation behind the central story. Further there were characters that felt forced and undeveloped. They were made central out of nowhere.</p>
                <p>The acting was great and would have made for an incredible movie with a little more time and development of the plot. Certainly not a 16 Oscar Nomination level movie.</p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-800/60 pt-3 mt-1">
                <div className="flex items-center gap-5 text-[11px] text-neutral-500">
                  <button className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful (124)
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> Comment (12)
                  </button>
                </div>
                <button className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>

            {/* review 2 */}
            <div className="p-6 bg-[#070e18] border border-[#14273f]/50 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-rose-800 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    FN
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">FilmNerd99</p>
                    <p className="text-[11px] text-neutral-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e0f10] border border-rose-500/25 text-rose-400 text-[11px] font-medium">
                  <Flame className="w-3 h-3 fill-current" />
                  95% Emotional Damage
                </div>
              </div>

              <div className="text-[12.5px] text-neutral-300 leading-relaxed font-light flex flex-col gap-2.5">
                <p>For years I've been emphasizing the importance of music in movies; how an amazing musical score can significantly elevate a movie. It shouldn't just be background dressing. It should be brought to the forefront. It should drive the story. It should be a character in itself. It should give you goosebumps in the big moments. Sinners is one of the best examples of this.</p>
                <p>Aside from the music, I could tell I was watching high-quality filmmaking within five minutes. The directing, camerawork, editing, and sound design are pristine. The entire cast does a great job, but Michael B. Jordan shines. He is a superstar.</p>
                <p>Sinners is also surprisingly funny, without taking away from the seriousness. And the horror elements are... satisfying. This movie goes hard.</p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-800/60 pt-3 mt-1">
                <div className="flex items-center gap-5 text-[11px] text-neutral-500">
                  <button className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful (89)
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> Comment (8)
                  </button>
                </div>
                <button className="flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>

            {/* vibe check banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 bg-[#070e18] border border-[#14273f]/50 rounded-2xl">
              <div>
                <p className="text-[14px] font-bold text-white">Share your Vibe Check</p>
                <p className="text-[12px] text-neutral-500 mt-1 leading-relaxed">
                  Did this movie blow your mind or break your heart? Let the community know.
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-[#75D4CB] hover:bg-[#22A498] text-[#03080c] text-sm font-sans font-normal rounded-full transition-all cursor-pointer shadow-md shrink-0 whitespace-nowrap select-none"
              >
                Write a Review →
              </motion.button>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </motion.div>
  );
}