import { 
  ChevronRight, 
  MessageSquare, 
  ThumbsDown, 
  ThumbsUp, 
  UserCheck2,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { DIGEST_ITEMS } from "../data/movies";

export default function CineDigest() {
  // Store upvotes/downvotes/user selections in state to make them highly interactive!
  const [items, setItems] = useState(DIGEST_ITEMS);
  const [votedStates, setVotedStates] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (itemId: string, direction: 'up' | 'down') => {
    const currentState = votedStates[itemId];
    
    setItems(prevItems => prevItems.map(item => {
      if (item.id !== itemId) return item;

      let upvoteOffset = 0;
      let downvoteOffset = 0;

      if (direction === 'up') {
        if (currentState === 'up') {
          // undo upvote
          upvoteOffset = -1;
          setVotedStates(prev => ({ ...prev, [itemId]: null }));
        } else {
          // apply upvote, undo downvote if existed
          upvoteOffset = 1;
          downvoteOffset = currentState === 'down' ? -1 : 0;
          setVotedStates(prev => ({ ...prev, [itemId]: 'up' }));
        }
      } else {
        if (currentState === 'down') {
          // undo downvote
          downvoteOffset = -1;
          setVotedStates(prev => ({ ...prev, [itemId]: null }));
        } else {
          // apply downvote, undo upvote if existed
          downvoteOffset = 1;
          upvoteOffset = currentState === 'up' ? -1 : 0;
          setVotedStates(prev => ({ ...prev, [itemId]: 'down' }));
        }
      }

      return {
        ...item,
        upvotes: item.upvotes + upvoteOffset,
        downvotes: item.downvotes + downvoteOffset
      };
    }));
  };

  const mainItem = items[0];
  const sideItems = items.slice(1);

  return (
    <section 
      id="digest" 
      className="py-16 px-6 md:px-12 lg:pl-32 max-w-7xl mx-auto w-full relative border-t border-neutral-900/50"
    >
      {/* Scroll indicator right arrow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block">
        <motion.button
          whileHover={{ scale: 1.15, x: 5, backgroundColor: "#36ffdb", color: "#000" }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-[#1be2df]/90 text-neutral-950 flex items-center justify-center shadow-[0_0_20px_rgba(27,226,223,0.4)] cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Cine Digest
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "#36ffdb", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-[#142337] bg-[#070f19] flex items-center justify-center text-[#36ffdb] transition-colors duration-200 cursor-pointer"
            aria-label="View editorial digest"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
        
        {/* Left Side: Large Feature Card ("AI in Hollywood") */}
        <div className="lg:col-span-7">
          <motion.div 
            whileHover={{ borderColor: "rgba(54, 255, 219, 0.3)" }}
            className="w-full h-full rounded-3xl overflow-hidden border border-[#14273f]/60 bg-neutral-950 flex flex-col justify-between relative shadow-2xl min-h-[420px] group"
          >
            {/* Background image & Hollywood graphic overlay */}
            <div className="absolute inset-0">
              <img 
                src={mainItem.imageUrl} 
                alt={mainItem.title} 
                className="w-full h-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Hollywood Sign Custom SVG overlay mockup for specific feel */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white/20 text-7xl md:text-9xl font-black font-display tracking-widest leading-none select-none select-none filter blur-[1px]">
                  A.I.
                </span>
                <span className="text-neutral-400/10 text-xs tracking-[0.25em] font-mono mt-1">HOLLYWOOD HILLS</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
            </div>

            {/* Top Badges Row */}
            <div className="relative z-10 p-6 flex justify-between items-start">
              {/* HOT DEBATE Badge */}
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/35 text-[10px] font-mono font-medium text-rose-400 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {mainItem.badge}
              </span>

              {/* voices count */}
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-neutral-800 text-[10px] font-mono font-medium text-neutral-300">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                {mainItem.voices}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 mt-auto">
              <div className="max-w-2xl text-left">
                <h3 className="text-2xl md:text-3.5xl font-bold font-display text-white leading-tight tracking-wide mb-3">
                  {mainItem.title}
                </h3>
                <p className="text-neutral-300 text-sm md:text-base font-sans font-light leading-relaxed mb-6">
                  {mainItem.subtitle}
                </p>

                {/* Footer interactive bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900/60 pt-4">
                  {/* User avatars debating */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      <img className="w-7 h-7 rounded-full border border-neutral-950" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="user" referrerPolicy="no-referrer" />
                      <img className="w-7 h-7 rounded-full border border-neutral-950" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="user" referrerPolicy="no-referrer" />
                      <div className="w-7 h-7 rounded-full border border-neutral-950 bg-[#122238] flex items-center justify-center text-[8px] font-mono font-bold text-[#36ffdb]">+2k</div>
                    </div>
                    <span className="text-xs text-neutral-400 font-sans font-light">actively debating</span>
                  </div>

                  {/* Rating/Vote controls */}
                  <div className="flex items-center gap-2">
                    <motion.button 
                      onClick={() => handleVote(mainItem.id, 'up')}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        votedStates[mainItem.id] === 'up'
                          ? "bg-[#36ffdb] border-[#36ffdb] text-[#03080c] shadow-[0_0_15px_rgba(54,255,219,0.4)]"
                          : "bg-black/60 border-neutral-800 text-white hover:border-[#36ffdb] hover:text-[#36ffdb]"
                      }`}
                      aria-label="Upvote article"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      animate={votedStates[mainItem.id] === 'up' ? { scale: [1, 1.25, 1] } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    >
                      <ThumbsUp className={`w-4 h-4 ${votedStates[mainItem.id] === 'up' ? "fill-current text-[#03080c]" : ""}`} />
                    </motion.button>
                    <span className="text-xs font-mono text-neutral-400 min-w-[24px] text-center">
                      {mainItem.upvotes}
                    </span>
                    <motion.button 
                      onClick={() => handleVote(mainItem.id, 'down')}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        votedStates[mainItem.id] === 'down'
                          ? "bg-rose-500 border-rose-500 text-[#03080c] shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                          : "bg-black/60 border-neutral-800 text-white hover:border-rose-500 hover:text-rose-400"
                      }`}
                      aria-label="Downvote article"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      animate={votedStates[mainItem.id] === 'down' ? { scale: [1, 1.25, 1] } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    >
                      <ThumbsDown className={`w-4 h-4 ${votedStates[mainItem.id] === 'down' ? "fill-current text-[#03080c]" : ""}`} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Two Stacked Medium Cards ("Superhero losing magic", "Homelander Joker") */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {sideItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ borderColor: "rgba(54, 255, 219, 0.2)" }}
              className="rounded-2xl border border-[#14273f]/60 bg-[#040911]/90 overflow-hidden relative flex flex-col justify-between min-h-[200px] h-full group"
            >
              {/* Background cover image */}
              <div className="absolute inset-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Specific stylized overlay based on item */}
                {item.id === "superhero-losing-magic" && (
                  <div className="absolute top-[20%] left-[30%] rotate-12 bg-rose-600/75 border border-rose-500 text-white font-extrabold font-display text-2xl tracking-widest px-3.5 py-1 select-none pointer-events-none rounded opacity-80 group-hover:scale-110 transition-transform duration-500">
                    FAIL
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-5 flex flex-col h-full justify-between gap-4">
                
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider ${
                    item.id === "superhero-losing-magic" 
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" 
                      : "bg-teal-500/10 border border-teal-500/30 text-teal-400"
                  }`}>
                    {item.badge}
                  </span>
                </div>

                {/* Card Title & Meta details */}
                <div className="text-left mt-auto">
                  <h4 className="text-lg md:text-xl font-bold font-display text-white leading-snug mb-2 group-hover:text-[#36ffdb] transition-colors duration-200">
                    {item.title}
                  </h4>
                  
                  {/* Footer metadata details row */}
                  <div className="flex items-center justify-between gap-4 border-t border-neutral-900/60 pt-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-neutral-400 font-sans font-light">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                      {item.metadata}
                    </span>

                    {/* Upvote/Downvote panel */}
                    <div className="flex items-center gap-1.5">
                      <motion.button 
                        onClick={() => handleVote(item.id, 'up')}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                          votedStates[item.id] === 'up'
                            ? "bg-[#36ffdb] border-[#36ffdb] text-[#03080c] shadow-[0_0_15px_rgba(54,255,219,0.4)]"
                            : "bg-black/60 border-neutral-800 text-white hover:border-[#36ffdb] hover:text-[#36ffdb]"
                        }`}
                        aria-label="Upvote article"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        animate={votedStates[item.id] === 'up' ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${votedStates[item.id] === 'up' ? "fill-current text-[#03080c]" : ""}`} />
                      </motion.button>
                      <span className="text-[10px] font-mono text-neutral-400 min-w-[18px] text-center">
                        {item.upvotes}
                      </span>
                      <motion.button 
                        onClick={() => handleVote(item.id, 'down')}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                          votedStates[item.id] === 'down'
                            ? "bg-rose-500 border-rose-500 text-[#03080c] shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                            : "bg-black/60 border-neutral-800 text-white hover:border-rose-500 hover:text-rose-400"
                        }`}
                        aria-label="Downvote article"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        animate={votedStates[item.id] === 'down' ? { scale: [1, 1.25, 1] } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                      >
                        <ThumbsDown className={`w-3.5 h-3.5 ${votedStates[item.id] === 'down' ? "fill-current text-[#03080c]" : ""}`} />
                      </motion.button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
