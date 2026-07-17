import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState, FormEvent } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header id="app-navbar" className="fixed top-0 left-0 right-0 z-50 w-full bg-[#04090f]/90 backdrop-blur-md border-b border-white/5 py-3 px-6 md:px-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <a href="#" className="flex items-center text-[1.45rem] font-bold tracking-tight font-display select-none leading-none">
            <span className="text-white font-extrabold">Cine</span>
            <span className="text-[#3dd9c8] font-extrabold italic drop-shadow-[0_0_10px_rgba(61,217,200,0.35)]">Suggest</span>
          </a>
        </motion.div>

        {/* Right Section: Search & Filter */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {/* Search Bar Pill */}
          <form 
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-[#111820] border border-[#1e2d3d] rounded-full p-1 pl-1 pr-5 transition-all duration-300 focus-within:border-[#3dd9c8]/40 focus-within:shadow-[0_0_15px_rgba(61,217,200,0.1)]"
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
                onSearch(e.target.value);
              }}
              className="bg-transparent text-sm text-neutral-300 placeholder-neutral-600 outline-none w-32 font-sans tracking-wide"
            />
          </form>

          {/* Filter Icon */}
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center text-[#3dd9c8] cursor-pointer"
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </motion.button>

          {/* Login Link */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="../"
            className="px-4 py-1.5 rounded-full bg-[#1a3040] border border-[#3dd9c8]/30 hover:bg-[#3dd9c8]/10 text-white text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer shrink-0"
          >
            Login
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
}
