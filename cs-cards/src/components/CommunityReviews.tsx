import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Star, Flame, Award, HelpCircle, Droplet, Meh } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie, Review } from '../types';

interface CommunityReviewsProps {
  movie: Movie;
  reviews: Review[];
  onHelpfulClick: (reviewId: string) => void;
  onScrollToRateInput: () => void;
}

export default function CommunityReviews({
  movie,
  reviews,
  onHelpfulClick,
  onScrollToRateInput,
}: CommunityReviewsProps) {
  
  const handleShareClick = (author: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    alert(`Review share link copied! Share ${author}'s vibe check with your friends.`);
  };

  const cleanVibeTag = (tag: string) => {
    return tag.replace(/^[^\w\d%]+/g, '').trim();
  };

  const renderBadgeIcon = (type: Review['vibeType']) => {
    switch (type) {
      case 'mind_blow':
        return <Star size={13} className="fill-current text-[#93c5fd] shrink-0" />;
      case 'emotional_damage':
        return <Droplet size={13} className="fill-current text-[#ff6b6b] shrink-0" />;
      case 'masterpiece':
        return <Award size={13} className="fill-current text-[#fbbf24] shrink-0" />;
      default:
        return <Meh size={13} className="text-slate-400 shrink-0" />;
    }
  };

  const getBadgeStyle = (type: Review['vibeType']) => {
    switch (type) {
      case 'mind_blow':
        return 'border-[#93c5fd]/25 bg-[#0c131c] text-[#93c5fd]';
      case 'emotional_damage':
        return 'border-[#ff6b6b]/25 bg-[#13090a] text-[#ff6b6b]';
      case 'masterpiece':
        return 'border-[#fbbf24]/25 bg-[#181206] text-[#fbbf24]';
      default:
        return 'border-slate-700/40 bg-[#0f1115] text-slate-400';
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      
      {/* Section Header */}
      <h3 className="font-share text-3xl font-bold tracking-tight text-white mb-8 select-none">
        Community Reviews
      </h3>

      {/* Reviews Stack */}
      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="rounded-2xl border border-[#112332] bg-[#0a1217] p-6 shadow-md transition-all duration-300 hover:border-[#1d2d3d]"
          >
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              
              {/* User Avatar & Info */}
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={`${review.author} avatar`}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-slate-800"
                />
                <div>
                  <div className="font-sans font-bold text-white text-sm md:text-base leading-tight">
                    {review.author}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    {review.timestamp}
                  </div>
                </div>
              </div>

              {/* Vibe Tag Badge */}
              <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold select-none ${getBadgeStyle(review.vibeType)}`}>
                {renderBadgeIcon(review.vibeType)}
                <span>{cleanVibeTag(review.vibeTag)}</span>
              </div>

            </div>

            {/* Review Content */}
            <div className="text-slate-300 text-sm md:text-base leading-relaxed tracking-normal whitespace-pre-wrap py-2 border-b border-[#0d1f2d]/30 mb-4">
              {review.content}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              
              {/* Left interactions */}
              <div className="flex items-center gap-6">
                
                {/* Helpful button */}
                <button
                  onClick={() => onHelpfulClick(review.id)}
                  className={`flex items-center gap-2 transition-colors py-1 cursor-pointer select-none ${
                    review.userLiked 
                      ? 'text-[#4df2d6]' 
                      : 'hover:text-slate-300'
                  }`}
                >
                  <ThumbsUp size={14} className={review.userLiked ? 'fill-current' : ''} />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>

                {/* Comment placeholder */}
                <button
                  onClick={() => alert('Comments feature demo: Comments thread loaded!')}
                  className="flex items-center gap-2 hover:text-slate-300 transition-colors py-1 cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Comment ({review.commentsCount})</span>
                </button>

              </div>

              {/* Right interactions */}
              <div>
                <button
                  onClick={() => handleShareClick(review.author)}
                  className="flex items-center gap-2 hover:text-slate-300 transition-colors py-1 cursor-pointer"
                  title="Share review link"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Share your Vibe Check Call-to-action */}
      <div className="rounded-2xl border border-[#112332] bg-[#0a1217] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8">
        <div>
          <h4 className="font-share text-lg font-bold text-white select-none">
            Share your Vibe Check
          </h4>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Did this movie blow your mind or break your heart? Let the community know.
          </p>
        </div>

        <div>
          <motion.button
            onClick={onScrollToRateInput}
            whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#75D4CB] hover:bg-[#22A498] text-[#03080c] px-6 py-2.5 text-sm font-sans font-normal transition-all cursor-pointer whitespace-nowrap select-none shadow-md"
          >
            Write a Review →
          </motion.button>
        </div>
      </div>

    </section>
  );
}
