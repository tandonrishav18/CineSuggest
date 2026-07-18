import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ChevronRight, Film, Star } from 'lucide-react';
import { Movie } from '../types';

interface CineListProps {
  savedMovieIds: string[];
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onRemoveMovie: (movieId: string) => void;
  onBrowseMovies: () => void;
}

export default function CineList({
  savedMovieIds,
  movies,
  onSelectMovie,
  onRemoveMovie,
  onBrowseMovies,
}: CineListProps) {
  // Resolve movies from ids in saved order (newest to oldest as prepended in the list)
  const savedMovies = savedMovieIds
    .map((id) => movies.find((m) => m.id === id))
    .filter((m): m is Movie => !!m);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Title Header with Total Count */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            CineList
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {savedMovies.length} {savedMovies.length === 1 ? 'Saved Movie' : 'Saved Movies'}
          </p>
        </div>
        
        {savedMovies.length > 0 && (
          <button
            onClick={onBrowseMovies}
            className="text-xs font-semibold uppercase tracking-wider text-[#4df2d6] hover:text-[#5ce1cb] transition-colors cursor-pointer"
          >
            + Add More
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {savedMovies.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            {/* Elegant glassmorphic illustration placeholder */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0a1217] border border-[#112332] shadow-[0_0_30px_rgba(77,242,214,0.05)] text-slate-500">
              <Film size={40} className="stroke-[1.5] text-slate-400" />
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#4df2d6]/10 text-[#4df2d6] border border-[#4df2d6]/30">
                <Star size={12} className="fill-current" />
              </div>
            </div>

            <h3 className="font-sans text-xl font-bold text-white mb-2">
              Your CineList is empty.
            </h3>
            <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
              Explore our curation of thriller and gothic cinema. Bookmark your favorite masterpieces to watch them later.
            </p>

            <motion.button
              onClick={onBrowseMovies}
              className="rounded-full bg-[#4df2d6] px-8 py-3 text-sm font-bold text-[#03080c] shadow-lg shadow-[#4df2d6]/10 hover:shadow-[#4df2d6]/20 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Movies
            </motion.button>
          </motion.div>
        ) : (
          /* Scrollable List Container */
          <motion.div 
            key="list" 
            className="flex flex-col gap-4"
            layout
          >
            {savedMovies.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 30,
                  opacity: { duration: 0.2 } 
                }}
                className="group relative flex items-center justify-between gap-4 rounded-2xl border border-[#112332] bg-[#071118]/80 p-3 md:p-4 hover:border-[#4df2d6]/30 transition-all hover:bg-[#091722]/90 cursor-pointer overflow-hidden shadow-md"
                onClick={() => onSelectMovie(movie)}
              >
                {/* Subtle soft-glow light-leak inside hovered item */}
                <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-[#4df2d6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                {/* Left side: Thumbnail Poster & Text details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Poster Thumbnail */}
                  <div className="relative h-16 w-12 md:h-20 md:w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[#112332] bg-[#03080c] shadow-inner">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h4 className="font-sans text-base md:text-lg font-bold text-white group-hover:text-[#4df2d6] transition-colors truncate">
                        {movie.title}
                      </h4>
                      <span className="text-xs text-slate-500">{movie.year}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {/* IMDb rating display */}
                      <div className="flex items-center gap-1 bg-[#4df2d6]/5 border border-[#4df2d6]/15 rounded px-1.5 py-0.5 text-[11px] font-mono font-medium text-[#4df2d6]">
                        <Star size={10} className="fill-current" />
                        <span>{movie.imdbRating.split('/')[0]}</span>
                      </div>

                      {/* Genre Tags */}
                      <div className="flex flex-wrap gap-1">
                        {movie.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs text-slate-400 bg-slate-800/25 px-2 py-0.5 rounded-full border border-slate-700/30"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Remove & Chevron */}
                <div className="flex items-center gap-2 md:gap-4 pl-2">
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Don't trigger standard details navigation
                      onRemoveMovie(movie.id);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-[#0a1217] text-slate-400 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 cursor-pointer"
                    title="Remove from CineList"
                    aria-label={`Remove ${movie.title} from CineList`}
                  >
                    <Trash2 size={15} />
                  </button>

                  {/* Open details chevron */}
                  <div className="text-slate-500 group-hover:text-[#4df2d6] transition-all transform group-hover:translate-x-1 duration-200">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
