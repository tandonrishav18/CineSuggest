import React, { useState } from 'react';
import { Search, SlidersHorizontal, Film, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';

interface HeaderProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  selectedMovie: Movie;
  activeView: 'discover' | 'cinelist';
  onViewChange: (view: 'discover' | 'cinelist') => void;
  cineListCount: number;
}

export default function Header({
  movies,
  onSelectMovie,
  selectedMovie,
  activeView,
  onViewChange,
  cineListCount,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#03080c]/95 backdrop-blur-md px-4 py-4 md:px-8 border-b border-[#112332]/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-4">
        {/* Left Brand logo only */}
        <div className="flex items-center">
          {/* Brand Logo */}
          <a
            href="../landing/"
            className="flex cursor-pointer items-center gap-1 select-none"
          >
            <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-white">
              Cine
            </span>
            <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-[#4df2d6]">
              Suggest
            </span>
          </a>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-44 sm:w-64 items-center rounded-full bg-[#0a1217] border border-[#112332] px-1 focus-within:border-teal-500/50 transition-colors">
              {/* Teal circle containing search icon */}
              <button 
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4df2d6] text-[#03080c] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Search button"
              >
                <Search size={16} strokeWidth={2.5} />
              </button>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="h-full flex-1 bg-transparent px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>

            {/* Results Dropdown */}
            {isDropdownOpen && searchQuery && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#112332] bg-[#0a1217] p-1 shadow-2xl z-50">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => {
                        onSelectMovie(movie);
                        setSearchQuery('');
                        onViewChange('discover');
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                        selectedMovie.id === movie.id
                          ? 'bg-teal-500/10 text-[#4df2d6]'
                          : 'text-slate-300 hover:bg-[#0d1f2d] hover:text-white'
                      }`}
                    >
                      <img
                        src={movie.posterUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-8 w-6 rounded object-cover"
                      />
                      <div>
                        <div className="font-bold">{movie.title}</div>
                        <div className="text-xs text-slate-500">{movie.year}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500">No movies found</div>
                )}
              </div>
            )}
          </div>


          {/* Filter Icon */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#112332] bg-[#0a1217] text-slate-200 transition-all hover:bg-[#0d1f2d] hover:text-[#4df2d6] cursor-pointer"
            onClick={() => {
              // Toggle random selection for fun as visual filter effect
              const nextIndex = (movies.findIndex(m => m.id === selectedMovie.id) + 1) % movies.length;
              onSelectMovie(movies[nextIndex]);
              onViewChange('discover');
            }}
            title="Switch Movie (Demo Filter)"
          >
            <SlidersHorizontal size={18} />
          </button>

          <button 
            onClick={() => onViewChange(activeView === 'cinelist' ? 'discover' : 'cinelist')}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
              activeView === 'cinelist'
                ? 'border-[#4df2d6] bg-[#4df2d6]/10 text-[#4df2d6] shadow-[0_0_12px_rgba(77,242,214,0.3)]'
                : 'border-[#112332] bg-[#0a1217] text-slate-200 hover:bg-[#0d1f2d] hover:text-[#4df2d6]'
            }`}
            title="My CineList"
          >
            <Heart size={18} className={activeView === 'cinelist' ? 'fill-current' : ''} />
            {cineListCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#4df2d6] text-[10px] font-extrabold text-[#03080c] shadow-sm border border-[#03080c]">
                {cineListCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
