import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOVIES } from './data';
import { Review, Movie } from './types';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import WhereToWatch from './components/WhereToWatch';
import RateNow from './components/RateNow';
import CommunityReviews from './components/CommunityReviews';
import Footer from './components/Footer';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [selectedMovieId, setSelectedMovieId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || 'sinners';
  });
  const [cineList, setCineList] = useState<string[]>([]);

  const rateNowRef = useRef<HTMLDivElement>(null);

  // Get active movie
  const currentMovie = movies.find((m) => m.id === selectedMovieId) || movies[0];

  // Handle switching active movie
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovieId(movie.id);
    const url = new URL(window.location.href);
    url.searchParams.set('movie', movie.id);
    window.history.replaceState({}, '', url.pathname + url.search);
  };

  // Toggle Cine List (Wishlist)
  const handleToggleCineList = (movieId: string) => {
    setCineList((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  // Prepend a user review to the selected movie
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'timestamp'>) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === selectedMovieId) {
          const newReview: Review = {
            ...newReviewData,
            id: `user-review-${Date.now()}`,
            timestamp: 'Just now',
          };
          return {
            ...movie,
            reviews: [newReview, ...movie.reviews],
          };
        }
        return movie;
      })
    );
  };

  // Toggle helpful rating for a review
  const handleHelpfulClick = (reviewId: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === selectedMovieId) {
          return {
            ...movie,
            reviews: movie.reviews.map((rev) => {
              if (rev.id === reviewId) {
                const liked = !rev.userLiked;
                return {
                  ...rev,
                  userLiked: liked,
                  helpfulCount: liked ? rev.helpfulCount + 1 : rev.helpfulCount - 1,
                };
              }
              return rev;
            }),
          };
        }
        return movie;
      })
    );
  };

  // Smooth scroll to rating card and focus text input
  const handleScrollToRate = () => {
    if (rateNowRef.current) {
      rateNowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Wait for scroll animation, then focus the input field
      setTimeout(() => {
        const inputElement = rateNowRef.current?.querySelector('input');
        inputElement?.focus();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col selection:bg-teal-500 selection:text-black">
      {/* Header with Search and Filter capabilities */}
      <Header
        movies={movies}
        selectedMovie={currentMovie}
        onSelectMovie={handleSelectMovie}
      />

      {/* Main Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Poster, title, tags, description, play trailer block */}
            <MovieDetail
              movie={currentMovie}
              onBackToDiscover={() => {
                // Switch back to "Sinners" or first item
                setSelectedMovieId('sinners');
              }}
              onScrollToRate={handleScrollToRate}
              onToggleCineList={handleToggleCineList}
              isInCineList={cineList.includes(currentMovie.id)}
            />

            {/* Where to Watch widget */}
            <WhereToWatch movie={currentMovie} />

            {/* Rate Now widget (Review Text area & split circles star feedback) */}
            <RateNow
              movie={currentMovie}
              onSubmitReview={handleAddReview}
              rateNowRef={rateNowRef}
            />

            {/* Community Reviews List & Call-to-action */}
            <CommunityReviews
              movie={currentMovie}
              reviews={currentMovie.reviews}
              onHelpfulClick={handleHelpfulClick}
              onScrollToRateInput={handleScrollToRate}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer copyright and references */}
      <Footer />
    </div>
  );
}
