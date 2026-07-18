import React, { useState } from 'react';
import { Search, SlidersHorizontal, Film } from 'lucide-react';
import { Movie } from '../types';

interface HeaderProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  selectedMovie: Movie;
}

export default function Header({ movies, onSelectMovie, selectedMovie }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#03080c]/90 backdrop-blur-md px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex cursor-pointer items-center gap-1 select-none"
          onClick={() => setSearchQuery('')}
        >
          <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-white">
            Cine
          </span>
          <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-[#4df2d6]">
            Suggest
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Pill Search Container */}
            <div className="flex h-10 w-44 sm:w-64 items-center rounded-full bg-[#0a1217] border border-[#112332] px-1 focus-within:border-teal-500/50 transition-colors">
              {/* Teal circle containing search icon */}
              <button 
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4df2d6] text-[#03080c] transition-transform hover:scale-105 active:scale-95"
                aria-label="Search button"
              >
                <Search size={16} strokeWidth={2.5} />
              </button>
              
              {/* Text input */}
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="w-full bg-transparent px-3 text-sm text-slate-200 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Results Dropdown */}
            {isDropdownOpen && searchQuery && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#112332] bg-[#0a1217] p-1 shadow-2xl">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => {
                        onSelectMovie(movie);
                        setSearchQuery('');
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedMovie.id === movie.id
                          ? 'bg-teal-500/10 text-[#4df2d6]'
                          : 'text-slate-300 hover:bg-[#0d1f2d] hover:text-white'
                      }`}
                    >
                      <Film size={16} />
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium truncate">{movie.title}</div>
                        <div className="text-xs text-slate-500">{movie.year} • {movie.duration}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-center text-xs text-slate-500">
                    No cinematic matches found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Icon */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#112332] bg-[#0a1217] text-slate-200 transition-all hover:bg-[#0d1f2d] hover:text-[#4df2d6]"
            onClick={() => {
              // Toggle random selection for fun as visual filter effect
              const nextIndex = (movies.findIndex(m => m.id === selectedMovie.id) + 1) % movies.length;
              onSelectMovie(movies[nextIndex]);
            }}
            title="Switch Movie (Demo Filter)"
          >
            <SlidersHorizontal size={18} />
          </button>

          {/* Back to Home Link */}
          <a
            href="../home/"
            className="flex h-10 px-4 items-center justify-center rounded-full border border-[#112332] bg-[#0a1217] text-slate-200 hover:bg-[#0d1f2d] hover:text-[#4df2d6] text-xs font-bold tracking-wide transition-all select-none cursor-pointer"
          >
            Home
          </a>
        </div>
      </div>
    </header>
  );
}
