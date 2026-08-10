import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getTrendingMovies, searchMovies, getMovieDetails, getMovieTrailer, getWatchProviders, getMovieImages } from './services/api';
import { Review, Movie, StreamProvider } from './types';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail';
import WhereToWatch, { getOttWatchUrl } from './components/WhereToWatch';
import CommunityReviews from './components/CommunityReviews';
import RateNow from './components/RateNow';
import Footer from './components/Footer';
import CineList from './components/CineList';

const DEFAULT_PROVIDERS: StreamProvider[] = [
  { name: 'Jio Hotstar', logo: '', watchUrl: 'https://www.hotstar.com/' },
  { name: 'Netflix', logo: '', watchUrl: 'https://www.netflix.com/' },
  { name: 'Amazon Prime Video', logo: '', watchUrl: 'https://www.primevideo.com/' },
  { name: 'Youtube', logo: '', watchUrl: 'https://www.youtube.com/', priceText: 'Rent From Rs. 120' },
];

const createWatchProviders = (providers: Array<any>, movieTitle?: string): StreamProvider[] => {
  if (!Array.isArray(providers) || providers.length === 0) {
    return DEFAULT_PROVIDERS.map((p) => ({
      ...p,
      watchUrl: getOttWatchUrl(p.name, p.watchUrl, movieTitle),
    }));
  }
  return providers.map((provider) => {
    const name = provider.provider_name || 'Unknown';
    return {
      name,
      logo: provider.logo_path
        ? `https://image.tmdb.org/t/p/w92${provider.logo_path}`
        : '',
      watchUrl: getOttWatchUrl(name, undefined, movieTitle),
      priceText: provider.display_priority ? '' : undefined,
    };
  });
};

const formatSummaryMovie = (movie: any): Movie => ({
  id: String(movie.id),
  title: movie.title || movie.name || 'Untitled',
  description: movie.overview || '',
  year: movie.release_date ? new Date(movie.release_date).getFullYear() : movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 0,
  duration: movie.runtime ? `${movie.runtime} mins` : 'Unknown',
  rating: movie.adult ? '18+' : 'PG-13',
  certificateDetails: movie.certification || 'No certification available',
  posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  trailerThumbUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  categories: Array.isArray(movie.genres) ? movie.genres.map((genre: any) => genre.name) : [],
  imdbRating: movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : '0.0/10',
  rottenTomatoesRating: movie.vote_average ? `${Math.round(movie.vote_average * 10)}% Fresh` : '0% Fresh',
  rewatchValue: movie.vote_average ? Math.min(100, Math.max(70, Math.round(movie.vote_average * 10))) : 75,
  streamProviders: [],
  reviews: [],
  stillUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
});

const formatDetailMovie = (movie: any, trailerKey?: string, providers: Array<any> = []): Movie => ({
  id: String(movie.id),
  title: movie.title || movie.name || 'Untitled',
  description: movie.overview || '',
  year: movie.release_date ? new Date(movie.release_date).getFullYear() : movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 0,
  duration: movie.runtime ? `${movie.runtime} mins` : 'Unknown',
  rating: movie.adult ? '18+' : 'PG-13',
  certificateDetails: movie.release_dates?.results?.length
    ? movie.release_dates.results[0].release_dates[0].certification || 'No certification available'
    : 'No certification available',
  posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  trailerThumbUrl: trailerKey ? `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg` : movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  categories: Array.isArray(movie.genres) ? movie.genres.map((genre: any) => genre.name) : [],
  imdbRating: movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : '0.0/10',
  rottenTomatoesRating: movie.vote_average ? `${Math.round(movie.vote_average * 10)}% Fresh` : '0% Fresh',
  rewatchValue: movie.vote_average ? Math.min(100, Math.max(70, Math.round(movie.vote_average * 10))) : 80,
  streamProviders: createWatchProviders(providers, movie.title || movie.name),
  reviews: [],
  stillUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  trailerKey,
});

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || '';
  });
  const [cineList, setCineList] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'discover' | 'cinelist'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'cinelist' ? 'cinelist' : 'discover';
  });
  const [previousView, setPreviousView] = useState<'discover' | 'cinelist' | null>(null);

  const handleViewChange = (newView: 'discover' | 'cinelist') => {
    setPreviousView(activeView);
    setActiveView(newView);
  };
  const [currentMovieDetails, setCurrentMovieDetails] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const rateNowRef = useRef<HTMLDivElement>(null);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const data = await getTrendingMovies();
      const results = Array.isArray(data.results) ? data.results : [];
      const formatted = results.map(formatSummaryMovie);
      setMovies(formatted);

      if (!selectedMovieId && formatted.length > 0) {
        setSelectedMovieId(formatted[0].id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchMovies(searchQuery.trim());
        const results = Array.isArray(data.results) ? data.results : [];
        const formatted = results.map(formatSummaryMovie);
        setSearchResults(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const currentMovie = movies.find((movie) => movie.id === selectedMovieId);
    const shouldFetchDetail = !currentMovie || !currentMovie.categories.length || currentMovie.duration === 'Unknown';

    if (!selectedMovieId) {
      setCurrentMovieDetails(null);
      return;
    }

    const loadDetails = async () => {
      setLoading(true);
      try {
        const detailData = await getMovieDetails(selectedMovieId);
        const trailerData = await getMovieTrailer(selectedMovieId).catch(() => ({ key: undefined }));
        const watchProviders = await getWatchProviders(selectedMovieId).catch(() => ({ providers: [] }));
        const imagesData = await getMovieImages(selectedMovieId).catch(() => ({ backdrops: [], posters: [] }));

        const bestImage = imagesData?.backdrops?.[0]?.file_path
          ? `https://image.tmdb.org/t/p/w780${imagesData.backdrops[0].file_path}`
          : imagesData?.posters?.[0]?.file_path
          ? `https://image.tmdb.org/t/p/w500${imagesData.posters[0].file_path}`
          : undefined;

        const detailMovie = formatDetailMovie(detailData, trailerData?.key, watchProviders?.providers);
        if (bestImage) {
          detailMovie.stillUrl = bestImage;
        }
        setCurrentMovieDetails(detailMovie);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (shouldFetchDetail || !currentMovieDetails || currentMovieDetails.id !== selectedMovieId) {
      loadDetails();
    }
  }, [selectedMovieId]);

  const currentMovie = selectedMovieId
    ? (currentMovieDetails?.id === selectedMovieId ? currentMovieDetails : movies.find((m) => m.id === selectedMovieId) || null)
    : null;

  const handleSelectMovie = (movie: Movie) => {
    if (!movies.some(m => m.id === movie.id)) {
      setMovies(prev => [movie, ...prev]);
    }
    setSelectedMovieId(movie.id);
    setCurrentMovieDetails(null);
    const url = new URL(window.location.href);
    url.searchParams.set('movie', movie.id);
    window.history.replaceState({}, '', url.pathname + url.search);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveView('discover');
  };

  const handleToggleCineList = (movieId: string) => {
    setCineList((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

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
            reviews: [newReview, ...(movie.reviews || [])],
          };
        }
        return movie;
      })
    );
    if (currentMovieDetails?.id === selectedMovieId) {
      setCurrentMovieDetails((prev) => prev ? { ...prev, reviews: [
        {
          ...newReviewData,
          id: `user-review-${Date.now()}`,
          timestamp: 'Just now',
        },
        ...prev.reviews,
      ] } : prev);
    }
  };

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

  const handleScrollToRate = () => {
    if (rateNowRef.current) {
      rateNowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const inputElement = rateNowRef.current?.querySelector('input');
        inputElement?.focus();
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col selection:bg-teal-500 selection:text-black">
      {/* Header with Search and Filter capabilities */}
      <Header
        movies={movies}
        searchResults={searchResults}
        selectedMovie={currentMovie || { id: '', title: '', description: '', year: 0, duration: '', rating: '', certificateDetails: '', posterUrl: '', trailerThumbUrl: '', categories: [], imdbRating: '0.0/10', rottenTomatoesRating: '0% Fresh', rewatchValue: 0, streamProviders: [], reviews: [], stillUrl: '' }}
        onSelectMovie={handleSelectMovie}
        activeView={activeView}
        onViewChange={handleViewChange}
        cineListCount={cineList.length}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        isLoading={loading}
      />

      {/* Main Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeView === 'cinelist' ? (
            <motion.div
              key="cinelist-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundImage: `
                  linear-gradient(rgba(117,212,203,0.012) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(117,212,203,0.012) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            >
              <CineList
                savedMovieIds={cineList}
                movies={movies}
                onSelectMovie={(movie) => {
                  handleSelectMovie(movie);
                  setActiveView('discover');
                }}
                onRemoveMovie={handleToggleCineList}
                onBrowseMovies={() => {
                  if (previousView === 'discover' && currentMovie) {
                    setActiveView('discover');
                  } else if (window.history.length > 1 && document.referrer && !document.referrer.includes('/movie-cards/?view=cinelist')) {
                    window.history.back();
                  } else {
                    window.location.href = '../home/#trending';
                  }
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentMovie?.id || 'discover'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {currentMovie ? (
                <>
                  <MovieDetail
                    movie={currentMovie}
                    onBackToDiscover={() => {
                      window.location.href = '../home/';
                    }}
                    onScrollToRate={handleScrollToRate}
                    onToggleCineList={handleToggleCineList}
                    isInCineList={cineList.includes(currentMovie.id)}
                    onSelectMovie={handleSelectMovie}
                  />

                  <WhereToWatch movie={currentMovie} />

                  <RateNow
                    movie={currentMovie}
                    onSubmitReview={handleAddReview}
                    rateNowRef={rateNowRef}
                  />

                  <CommunityReviews
                    movie={currentMovie}
                    reviews={currentMovie.reviews}
                    onHelpfulClick={handleHelpfulClick}
                    onScrollToRateInput={handleScrollToRate}
                  />
                </>
              ) : selectedMovieId ? (
                <div className="py-24 text-center text-slate-300">Loading movie details...</div>
              ) : (
                <div className="py-24 text-center text-slate-300 flex flex-col items-center justify-center gap-4">
                  <p className="text-lg font-medium">Select a movie from the Home page or Search to view details.</p>
                  <a
                    href="../home/"
                    className="px-6 py-2.5 rounded-full bg-[#4df2d6] text-[#03080c] text-sm font-semibold hover:bg-[#3dd9c8] transition-colors"
                  >
                    Go to Home Page
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer copyright and references */}
      <Footer />
    </div>
  );
}
