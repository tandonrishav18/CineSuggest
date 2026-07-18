import { 
  Home, 
  LayoutGrid, 
  PlaySquare, 
  Radio, 
  User,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const menuItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "trending", label: "Trending Now", icon: LayoutGrid },
    { id: "digest", label: "Cine Digest", icon: PlaySquare },
    { id: "reviews", label: "Hot Reviews", icon: Radio },
    { id: "cinelist", label: "CineList", icon: Heart, href: "../movie-cards/?view=cinelist" },
  ];

  return (
    <aside 
      id="side-nav" 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:bottom-auto lg:left-6 lg:top-[25%] lg:translate-x-0 z-40 flex flex-row lg:flex-col items-center py-3 px-6 lg:py-6 lg:px-3.5 bg-white/[0.04] lg:bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full lg:rounded-[2rem] gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] w-auto max-w-[90vw] lg:max-w-none"
    >
      {/* Profile Avatar / Top Icon */}
      <motion.div 
        whileHover={{ scale: 1.08 }}
        className="relative group cursor-pointer"
        onClick={() => onNavigate("hero")}
      >
        <div className="w-10 h-10 rounded-full bg-cyan-950/40 border border-[#22d3ee]/30 flex items-center justify-center text-[#22d3ee] transition-all duration-300 group-hover:border-[#36ffdb] group-hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] relative">
          <User className="w-5 h-5" />
          {/* Active green indicator status dot */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#050b13] rounded-full" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 lg:left-14 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:translate-x-0 px-2.5 py-1 rounded bg-neutral-950 border border-[#14273f] text-xs text-neutral-300 font-sans whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
          User Profile
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-[1px] h-6 lg:w-6 lg:h-[1px] bg-neutral-800/60" />

      {/* Navigation Icons */}
      <div className="flex flex-row lg:flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <div 
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.button
                onClick={() => {
                  if ((item as any).href) {
                    window.location.href = (item as any).href;
                  } else {
                    onNavigate(item.id);
                  }
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer relative ${
                  isActive 
                    ? "bg-[#36ffdb]/15 text-[#36ffdb] border border-[#36ffdb]/40 shadow-[0_0_15px_rgba(54,255,219,0.15)]" 
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-[#14273f]/30 border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />

                {/* Glow Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute lg:-left-1.5 lg:top-1/2 lg:-translate-y-1/2 lg:w-1 lg:h-4 -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#36ffdb] rounded-t-full lg:rounded-r-full lg:rounded-t-none shadow-[0_0_8px_#36ffdb]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 10, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-14 left-1/2 -translate-x-1/2 lg:left-14 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:translate-x-0 px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-[#14273f] text-xs text-neutral-200 font-sans whitespace-nowrap shadow-xl z-50 pointer-events-none"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
