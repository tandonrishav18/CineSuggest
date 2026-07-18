import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#03080c] px-4 py-8 md:px-8 mt-8 border-t border-neutral-900/40">
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

        {/* Right */}
        <div className="text-xs text-neutral-500 font-sans">
          @CineSuggest_by_LilyStudio
        </div>

      </div>
    </footer>
  );
}
