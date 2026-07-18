export interface StreamProvider {
  name: string;
  logo: string;
  watchUrl: string;
  priceText?: string; // e.g. "Rent From Rs. 120"
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  vibeTag: string; // e.g. "★ 98% Mind Blow" or "🔥 95% Emotional Damage"
  vibeType: 'mind_blow' | 'emotional_damage' | 'masterpiece' | 'meh';
  content: string;
  helpfulCount: number;
  commentsCount: number;
  userLiked?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  rating: string; // R, PG-13 etc.
  certificateDetails: string; // e.g. "violence, sexual content, language"
  posterUrl: string;
  trailerThumbUrl: string;
  categories: string[];
  imdbRating: string;
  rottenTomatoesRating: string;
  rewatchValue: number; // e.g. 92
  streamProviders: StreamProvider[];
  reviews: Review[];
  stillUrl: string; // The image for the "Where to watch" section
}
