export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating?: string;
  description: string;
  backdropUrl: string;
  wikipediaUrl: string;
}

export interface DigestItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge: string;
  badgeColor?: string;
  metadata: string;
  voices?: string;
  upvotes: number;
  downvotes: number;
}

export interface ReviewItem {
  id: string;
  movieTitle: string;
  rating: number;
  content: string;
  authorName: string;
  authorAvatar: string;
  thumbnailGradient: string; // matches the abstract fluid art thumbnail in the reference
}

export interface FeaturedMovieProps {
  selectedMovie?: Movie;
  onSelectMovie: (movie: Movie) => void;
}