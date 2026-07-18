import React from 'react';

export default function Footer() {
  const currentYear = 2026; // Setting year corresponding to the metadata current date

  return (
    <footer className="w-full bg-[#03080c] px-4 py-8 md:px-8 mt-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left Brand */}
        <div className="flex items-center gap-1 select-none">
          <span className="font-display text-xl font-black tracking-tight text-white">
            Cine
          </span>
          <span className="font-display text-xl font-black tracking-tight text-[#4df2d6]">
            Suggest
          </span>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm font-medium text-slate-500 select-none">
          <a href="#discover" className="transition-colors hover:text-[#4df2d6]" onClick={(e) => e.preventDefault()}>
            Discover
          </a>
          <a href="#profile" className="transition-colors hover:text-[#4df2d6]" onClick={(e) => e.preventDefault()}>
            Profile
          </a>
          <a href="#community" className="transition-colors hover:text-[#4df2d6]" onClick={(e) => e.preventDefault()}>
            Community
          </a>
          <a href="#privacy" className="transition-colors hover:text-[#4df2d6]" onClick={(e) => e.preventDefault()}>
            Privacy
          </a>
        </div>

        {/* Right Copyright */}
        <div className="text-xs text-slate-500 font-mono">
          © 2024 Cine Suggest. Cinematic Editorial Experience.
        </div>

      </div>
    </footer>
  );
}
