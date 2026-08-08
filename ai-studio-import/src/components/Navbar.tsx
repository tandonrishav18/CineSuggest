import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { searchMovies } from "../services/api";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string | number; title: string; year?: string | number; posterUrl?: string }>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced TMDB API search
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(q);
        if (Array.isArray(data?.results) && data.results.length > 0) {
          const mapped = data.results.slice(0, 8).map((m: any) => ({
            id: m.id,
            title: m.title || m.name || "Untitled",
            year: m.release_date ? new Date(m.release_date).getFullYear() : "",
            posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w92${m.poster_path}` : ""
          }));
          setSearchResults(mapped);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (err) {
        console.warn("Navbar search error:", err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowDropdown(false);
  };

  return (
    <header id="app-navbar" className="fixed top-0 left-0 right-0 z-50 w-full bg-black/16 backdrop-blur-md border-b border-white/5 py-3 px-6 md:px-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-0">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <a href="../home/" className="flex cursor-pointer items-center gap-1 select-none normal-case">
            <span className="font-jaro text-2xl md:text-3xl font-black tracking-wider text-white">
              Cine
            </span>
            <span className="font-jaro text-2xl md:text-3xl font-black tracking-wider text-[#36ffdb]">
              Suggest
            </span>
          </a>
        </motion.div>

        {/* Right Section: Search & Filter */}
        <motion.div 
          className="flex items-center gap-2 relative shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {/* Search Bar Container */}
          <div ref={searchContainerRef} className="relative">
            <form 
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-[#111820] border border-[#1e2d3d] rounded-full p-1 pl-1 pr-4 transition-all duration-300 focus-within:border-[#3dd9c8]/40 focus-within:shadow-[0_0_15px_rgba(61,217,200,0.1)]"
            >
              {/* Circular Search Icon Button */}
              <button 
                type="submit"
                className="w-9 h-9 rounded-full bg-[#1a3040] border border-[#3dd9c8]/30 hover:bg-[#1e3a4a] flex items-center justify-center text-[#3dd9c8] transition-colors duration-200 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2]" />
              </button>
              
              {/* Input Field */}
              <input 
                type="text" 
                placeholder="Search..." 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  // Only reset the section results when field is cleared
                  if (!e.target.value.trim()) {
                    onSearch("");
                  }
                }}
                onFocus={() => {
                  if (searchResults.length > 0) setShowDropdown(true);
                }}
                className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-24 sm:w-32 font-sans tracking-wide"
              />
            </form>

            {/* Live Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-[#07111a]/95 border border-[#1b3248] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50 py-1.5 divide-y divide-slate-800/40">
                {searchResults.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      window.location.href = `../movie-cards/?movie=${movie.id}`;
                    }}
                    className="w-full text-left px-3.5 py-2.5 flex items-center gap-3 text-sm text-neutral-200 hover:bg-[#12263a] hover:text-[#36ffdb] transition-colors cursor-pointer"
                  >
                    {movie.posterUrl ? (
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title}
                        referrerPolicy="no-referrer"
                        className="w-8 h-11 object-cover rounded-lg shadow border border-slate-700/60 shrink-0" 
                      />
                    ) : (
                      <div className="w-8 h-11 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-xs shrink-0">🍿</div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold leading-snug truncate">{movie.title}</span>
                      {movie.year && (
                        <span className="text-[11px] font-mono text-neutral-400">{movie.year}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Link Button */}
          <motion.a
            initial={{ backgroundColor: "#75D4CB" }}
            animate={{ backgroundColor: "#75D4CB" }}
            whileHover={{ scale: 1.05, backgroundColor: "#22A498" }}
            whileTap={{ scale: 0.95 }}
            href="../"
            className="px-4 py-1.5 rounded-full text-[#03080c] text-xs font-sans font-normal tracking-wide transition-colors duration-200 cursor-pointer shrink-0 select-none shadow-md"
          >
            Login
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
}
