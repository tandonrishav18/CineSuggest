import React, { useState } from 'react';
import { RotateCw, User, SmilePlus, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie, Review } from '../types';

interface RateNowProps {
  movie: Movie;
  onSubmitReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  rateNowRef: React.RefObject<HTMLDivElement | null>;
}

export default function RateNow({ movie, onSubmitReview, rateNowRef }: RateNowProps) {
  const [personalRewatchCount, setPersonalRewatchCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  // Rating state goes from 0 to 5 (each step is 0.5 circle/0.5 unit out of 5)
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const characterLimit = 150;

  // Toggle or increment rewatch value
  const handleRewatchClick = () => {
    setPersonalRewatchCount((prev) => (prev === 0 ? 1 : 0));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= characterLimit) {
      setReviewText(text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert('Please enter your review text first!');
      return;
    }
    if (selectedRating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }

    // Convert rating e.g. 4/5 to percentages or tags
    const ratingPercent = selectedRating * 20; // e.g. 80%
    let vibeTag = `★ ${ratingPercent}% Masterpiece`;
    let vibeType: 'mind_blow' | 'emotional_damage' | 'masterpiece' | 'meh' = 'masterpiece';

    if (ratingPercent >= 95) {
      vibeTag = `🔥 ${ratingPercent}% Mind Blow`;
      vibeType = 'mind_blow';
    } else if (ratingPercent >= 80) {
      vibeTag = `🔥 ${ratingPercent}% Emotional Damage`;
      vibeType = 'emotional_damage';
    } else if (ratingPercent < 60) {
      vibeTag = `🍿 ${ratingPercent}% Meh`;
      vibeType = 'meh';
    }

    onSubmitReview({
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop', // Beautiful profile avatar
      vibeTag,
      vibeType,
      content: reviewText.trim(),
      helpfulCount: 0,
      commentsCount: 0,
      userLiked: false,
    });

    // Reset fields
    setReviewText('');
    setSelectedRating(0);
    alert('Your review and rating have been added to the community logs!');
  };

  // Render split moon circles
  const renderInteractiveCircles = () => {
    const activeRating = hoverRating !== null ? hoverRating : selectedRating;
    const circles = [];

    for (let i = 1; i <= 5; i++) {
      const circleIndex = i;
      const leftVal = circleIndex - 0.5; // e.g. 0.5, 1.5, 2.5, 3.5, 4.5
      const rightVal = circleIndex;       // e.g. 1.0, 2.0, 3.0, 4.0, 5.0

      const leftFilled = activeRating >= leftVal;
      const rightFilled = activeRating >= rightVal;

      circles.push(
        <div 
          key={circleIndex}
          className="relative h-14 w-14 rounded-full border border-neutral-600 bg-transparent overflow-hidden group/circle transition-all duration-200"
        >
          {/* Left Half Visual representation */}
          <div 
            className={`absolute top-0 left-0 h-full w-[50%] transition-colors ${
              leftFilled ? 'bg-[#4df2d6]' : 'bg-transparent'
            }`} 
          />
          {/* Right Half Visual representation */}
          <div 
            className={`absolute top-0 right-0 h-full w-[50%] transition-colors ${
              rightFilled ? 'bg-[#4df2d6]' : 'bg-transparent'
            }`} 
          />

          {/* Hover / Click triggers for left half */}
          <div
            onMouseEnter={() => setHoverRating(leftVal)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setSelectedRating(leftVal)}
            className="absolute left-0 top-0 h-full w-[50%] z-10 cursor-pointer"
            title={`Rate ${leftVal}/5`}
          />

          {/* Hover / Click triggers for right half */}
          <div
            onMouseEnter={() => setHoverRating(rightVal)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setSelectedRating(rightVal)}
            className="absolute right-0 top-0 h-full w-[50%] z-10 cursor-pointer"
            title={`Rate ${rightVal}/5`}
          />
        </div>
      );
    }
    return circles;
  };

  return (
    <section 
      ref={rateNowRef}
      className="mx-auto max-w-7xl px-4 py-8 md:px-8"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8 select-none">
        <h3 className="font-space text-4xl font-bold tracking-tight text-white">
          Rate Now
        </h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/30 text-[#4df2d6] hover:border-[#4df2d6] transition-all cursor-pointer">
          <ChevronRight size={18} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* LEFT CARD: REWATCH VALUE CARD */}
        <div className="lg:w-[280px] w-full shrink-0 flex flex-col justify-between items-center rounded-2xl border border-neutral-800/80 bg-[#071118]/60 p-6 text-center shadow-lg h-full">
          {/* Rewatch icon */}
          <div className="text-teal-400 mt-2 select-none">
            <RotateCw size={36} className="transform -scale-x-100 rotate-[45deg] text-[#4df2d6]" />
          </div>

          {/* Value numbers */}
          <div className="my-6 flex flex-col items-center">
            <div className="font-sans text-7xl font-extrabold text-white leading-none tracking-tighter flex items-baseline justify-center">
              <span>{movie.rewatchValue + personalRewatchCount}</span>
              <span className="text-4xl font-bold text-white ml-1">%</span>
            </div>
            <div className="text-[11px] font-bold text-neutral-500 tracking-widest uppercase mt-4 select-none">
              REWATCH VALUE
            </div>
          </div>

          {/* Button worth a rewatch with Framer Motion toggle matching attached images exactly */}
          <div className="h-12 flex items-center justify-center">
            <motion.button
              layout
              onClick={handleRewatchClick}
              className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold select-none cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                personalRewatchCount > 0
                  ? 'w-11 bg-[#5ce1cb] text-black border border-transparent shadow-[0_0_18px_rgba(92,225,203,0.75)]'
                  : 'w-48 bg-transparent text-white border border-slate-600 hover:bg-[#1fb095] hover:text-black hover:border-transparent'
              }`}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {personalRewatchCount > 0 ? (
                  <motion.div
                    key="voted"
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={18} className="text-black stroke-[3.5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="unvoted"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} className="text-current stroke-[2.5]" />
                    <span>Worth a rewatch</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* RIGHT CARD: RATE & REVIEW CONTAINER */}
        <div className="flex-1 rounded-2xl border border-neutral-800/80 bg-[#071118]/60 p-6 flex flex-col justify-between shadow-lg gap-8">
          
          {/* Split Rating circles row */}
          <div className="flex flex-wrap items-center gap-4 py-2 pb-6">
            <div className="flex items-center gap-2.5">
              {renderInteractiveCircles()}
            </div>
          </div>

          {/* Input & avatar row */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              {/* Profile Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a2d3d]/40 text-[#4df2d6] border border-neutral-800/80">
                <User size={22} className="fill-[#4df2d6]" />
              </div>

              {/* TextInput with underline */}
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  placeholder="Add your review"
                  value={reviewText}
                  onChange={handleTextChange}
                  className="w-full bg-transparent border-b border-neutral-700/80 py-3 text-base text-slate-200 placeholder-neutral-500 outline-none focus:border-teal-500/50 transition-colors pr-24"
                />

                {/* Character counter */}
                <span className="absolute right-11 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 select-none border border-neutral-700/80 rounded-full px-2.5 py-0.5">
                  {reviewText.length}/{characterLimit}
                </span>

                {/* Smiley feedback */}
                <button
                  type="button"
                  onClick={() => setReviewText((prev) => `${prev} 🍿`.substring(0, characterLimit))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4df2d6] transition-colors"
                  title="Add emoji"
                >
                  <SmilePlus size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* CTA Submit Button */}
            <button
              type="submit"
              className="rounded-full bg-[#3fa897] hover:bg-[#4df2d6] px-6 py-2.5 text-sm font-semibold text-[#03080c] transition-all hover:scale-[1.01] active:scale-95 shadow-lg cursor-pointer self-start"
            >
              Submit Your Review →
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
