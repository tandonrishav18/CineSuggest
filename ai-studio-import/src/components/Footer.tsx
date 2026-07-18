import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer id="app-footer" className="w-full bg-[#020509] border-t border-neutral-900/40 py-12 px-6 md:px-12 lg:pl-32 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-1.5 text-xl font-bold font-display tracking-tight text-white">
          <span>Cine</span>
          <span className="text-[#36ffdb] drop-shadow-[0_0_8px_rgba(54,255,219,0.3)]">Suggest</span>
        </div>



        {/* Right Side: Copyright */}
        <div className="text-xs text-neutral-500 font-sans">
          @CineSuggest_by_LilyStudio
        </div>

      </div>
    </footer>
  );
}
