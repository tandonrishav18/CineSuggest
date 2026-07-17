import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import TrendingNow from "./components/TrendingNow";
import CineDigest from "./components/CineDigest";
import HotReviews from "./components/HotReviews";
import WriteReviewModal from "./components/WriteReviewModal";
import Footer from "./components/Footer";
import { INITIAL_REVIEWS } from "./data/movies";
import { ReviewItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll spy to highlight active section on side navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "trending", "digest", "reviews"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div id="app-root" className="min-h-screen bg-transparent text-neutral-100 font-sans relative antialiased selection:bg-[#3dd9c8]/30 selection:text-[#3dd9c8] overflow-x-hidden pt-[60px]">


      {/* Main Header / Navigation */}
      <Navbar onSearch={(query) => setSearchQuery(query)} />

      {/* Primary Grid Layout holding side navigation + page contents */}
      <div className="relative w-full max-w-7xl mx-auto z-10">

        {/* Floating Sidebar (Hidden on mobile, elegantly floats on desktop) */}
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Content sections container with scroll reveals */}
        <main className="w-full relative">

          {/* Hero Section */}
          <HeroSection onStartExploring={() => handleNavigate("trending")} />

          {/* Trending Now */}
          <TrendingNow />

          {/* Cine Digest */}
          <CineDigest />

          {/* Hot Reviews */}
          <HotReviews
            reviews={reviews}
            onWriteReviewClick={() => setIsWriteModalOpen(true)}
          />

        </main>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Write a review pop-up modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}