import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Film, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';

interface HeaderProps {
  movies: Movie[];
  searchResults?: Movie[];
  onSelectMovie: (movie: Movie) => void;
  selectedMovie: Movie;
  activeView: 'discover' | 'cinelist';
  onViewChange: (view: 'discover' | 'cinelist') => void;
  cineListCount: number;
  onSearch: (query: string) => void;
  searchQuery: string;
  isLoading?: boolean;
}

export default function Header({
  movies,
  searchResults = [],
  onSelectMovie,
  selectedMovie,
  activeView,
  onViewChange,
  cineListCount,
  onSearch,
  searchQuery,
  isLoading = false,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownMovies = searchResults.length > 0
    ? searchResults
    : movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050001]/90 backdrop-blur-md px-3 py-3 sm:px-8 border-b border-red-950/40 shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
        {/* Left Brand logo only */}
        <div className="flex items-center shrink-0">
          {/* Brand Logo */}
          <a
            href="../home/"
            className="flex cursor-pointer items-center gap-1 select-none normal-case"
          >
            <span className="font-jaro text-xl sm:text-3xl font-black tracking-wider text-white">
              Cine
            </span>
            <span className="font-jaro text-xl sm:text-3xl font-black tracking-wider text-[#e50914]">
              Suggest
            </span>
          </a>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative" ref={searchContainerRef}>
            <div className={`flex h-10 items-center rounded-full bg-[#0d0203] border border-red-950/60 p-1 focus-within:border-red-600/60 transition-all duration-500 ease-in-out overflow-hidden ${isMobileSearchOpen ? 'w-44 sm:w-64' : 'w-10 sm:w-64'}`}>
              {/* Red circle containing search icon */}
              <button 
                onClick={() => {
                  setIsMobileSearchOpen((prev) => {
                    const next = !prev;
                    if (next) {
                      setTimeout(() => inputRef.current?.focus(), 150);
                    }
                    return next;
                  });
                  setIsDropdownOpen(true);
                }}
                className="flex h-8 w-8 min-w-[2rem] min-h-[2rem] shrink-0 aspect-square items-center justify-center rounded-full bg-[#e50914] text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                aria-label="Search button"
              >
                <Search size={16} strokeWidth={2.5} />
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => {
                  onSearch(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className={`h-full flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 transition-all duration-500 ease-in-out ${isMobileSearchOpen ? 'px-2.5 opacity-100 w-auto' : 'px-0 opacity-0 w-0 pointer-events-none sm:px-2.5 sm:opacity-100 sm:w-auto sm:pointer-events-auto'}`}
              />
            </div>

            {/* Results Dropdown */}
            {isDropdownOpen && searchQuery && (
              <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-xl border border-red-900/40 bg-[#0d0203] p-1 shadow-2xl z-50">
                {dropdownMovies.length > 0 ? (
                  dropdownMovies.map((movie) => (
                    <button
                      key={movie.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        onSelectMovie(movie);
                        onSearch('');
                        setIsDropdownOpen(false);
                        onViewChange('discover');
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                        selectedMovie?.id === movie.id
                          ? 'bg-red-900/20 text-[#ff2a3b]'
                          : 'text-slate-300 hover:bg-red-950/40 hover:text-white'
                      }`}
                    >
                      <img
                        src={movie.posterUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-8 w-6 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold truncate">{movie.title}</div>
                        <div className="text-xs text-slate-500">{movie.year || ''}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    {isLoading ? 'Searching...' : 'No movies found'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Icon — hidden on phone */}
          <button 
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-red-950/60 bg-[#0d0203] text-slate-200 transition-all hover:bg-red-950/40 hover:text-[#ff2a3b] cursor-pointer"
            onClick={() => {
              const nextIndex = (movies.findIndex(m => m.id === selectedMovie.id) + 1) % movies.length;
              onSelectMovie(movies[nextIndex]);
              onViewChange('discover');
            }}
            title="Switch Movie (Demo Filter)"
          >
            {isLoading ? (
              <div className="h-4 w-4 rounded-full bg-white animate-pulse" />
            ) : (
              <SlidersHorizontal size={18} />
            )}
          </button>

          <button 
            onClick={() => onViewChange(activeView === 'cinelist' ? 'discover' : 'cinelist')}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all cursor-pointer ${
              activeView === 'cinelist'
                ? 'border-[#e50914] bg-[#e50914]/20 text-[#ff2a3b] shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                : 'border-red-950/60 bg-[#0d0203] text-slate-200 hover:bg-red-950/40 hover:text-[#ff2a3b]'
            }`}
            title="My CineList"
          >
            <Heart size={18} className={activeView === 'cinelist' ? 'fill-current' : ''} />
            {cineListCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-extrabold text-white shadow-sm border border-black">
                {cineListCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
