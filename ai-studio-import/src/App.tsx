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
import { getTrendingMovies, searchMovies } from "./services/api";
import { Movie, ReviewItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const formatMovie = (movie: any): Movie => {
    let poster = movie.posterUrl || "";
    if (!poster && movie.poster_path) {
      poster = movie.poster_path.startsWith("http")
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    let backdrop = movie.backdropUrl || "";
    if (!backdrop && movie.backdrop_path) {
      backdrop = movie.backdrop_path.startsWith("http")
        ? movie.backdrop_path
        : `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
    }
    if (!backdrop) backdrop = poster;

    return {
      id: String(movie.id),
      title: movie.title || movie.name || "Untitled",
      posterUrl: poster,
      backdropUrl: backdrop,
      rating: movie.rating || (movie.adult ? "18+" : "U/A 13+"),
      description: movie.overview || movie.description || "",
      wikipediaUrl: movie.wikipediaUrl || `https://www.themoviedb.org/movie/${movie.id}`
    };
  };

  const loadTrendingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTrendingMovies();
      const results = Array.isArray(data.results) ? data.results : [];
      if (results.length > 0) {
        setMovies(results.map(formatMovie));
      } else {
        setMovies(TRENDING_MOVIES);
      }
    } catch (err) {
      console.error("Backend fetch error:", err);
      setError("Using fallback movie data");
      setMovies(TRENDING_MOVIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (!searchQuery.trim()) {
      setSearchResults(null);
      loadTrendingMovies();
    } else {
      setLoading(true);
      setError(null);
      timer = setTimeout(async () => {
        try {
          const data = await searchMovies(searchQuery.trim());
          const results = Array.isArray(data.results) ? data.results : [];
          setSearchResults(results.map(formatMovie));
        } catch (err) {
          console.error(err);
          setError("Failed to search movies");
        } finally {
          setLoading(false);
        }
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const displayMovies = searchResults ?? movies;

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Auto-scroll to #trending if URL hash specifies #trending
  useEffect(() => {
    if (window.location.hash === "#trending") {
      setTimeout(() => {
        handleNavigate("trending");
      }, 250);
    }
  }, []);

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
    <div id="app-root" className="min-h-screen bg-transparent text-neutral-100 font-sans relative antialiased selection:bg-[#3dd9c8]/30 selection:text-[#3dd9c8] overflow-x-hidden pt-[44px]">


      {/* Main Header / Navigation */}
      <Navbar onSearch={(query) => setSearchQuery(query)} />

      {/* Primary Grid Layout holding side navigation + page contents */}
      <div className="relative w-full max-w-7xl mx-auto z-10">

        {/* Floating Sidebar (Hidden on mobile, elegantly floats on desktop) */}
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Content sections container with scroll reveals */}
        <main className="w-full relative">

          {/* Hero Section */}
          <HeroSection movies={movies} onStartExploring={() => handleNavigate("trending")} />

          {/* Trending Now */}
          <TrendingNow
        movies={displayMovies}
        sectionTitle={searchQuery.trim() ? `Search Results for "${searchQuery.trim()}"` : "Trending Now"}
        isLoading={loading}
        noResultsText={searchQuery.trim() ? "No matching movies were found." : "No trending movies are available right now."}
      />

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
        movies={displayMovies}
      />
    </div>
  );
}