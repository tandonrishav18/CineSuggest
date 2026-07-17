import { Movie, DigestItem, ReviewItem } from "../types";

export const FEATURED_DUNE: Movie = {
  id: "dune-part-three",
  title: "Dune: Part Three",
  posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/b8/Dune%2C_Part_Three_%28film_poster%29.jpg", // official poster
  backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80", // dark atmospheric golden sand dunes
  rating: "U/A 16+",
  description: "Dune: Part Three is an upcoming American epic space opera film co-produced and directed by Denis Villeneuve, who co-wrote the screenplay with Brian K. Vaughan, based on Frank Herbert's masterpiece. The story continues Paul Atreides' legendary journey across the desert planet of Arrakis.",
  wikipediaUrl: "https://en.wikipedia.org/wiki/Dune"
};

export const TRENDING_MOVIES: Movie[] = [
  {
    id: "the-boys",
    title: "The Boys",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/e/e5/The_Boys_season_1_poster.jpg", // majestic superhero posture with cape
    backdropUrl: "https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=1200&q=80", // action neon blue/teal background
    rating: "18+ Adults",
    description: "In a world where superheroes embrace the darker side of their massive celebrity and fame, an informal group of vigilantes known colloquially as 'The Boys' embark on a heroic quest to expose the truth about 'The Seven' and Vought.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Boys_(TV_series)"
  },
  {
    id: "sanju",
    title: "Sanju",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/70/Sanju_poster.jpg", // official theatrical poster with 5 looks of Ranbir Kapoor
    backdropUrl: "https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=1200&q=80", // dramatic urban street
    rating: "U/A 13+",
    description: "Sanju is a biographical drama that traces the dramatic and highly controversial real life of actor Sanjay Dutt, detailing his battles with addiction, legal turmoils, family bonds, and ultimate redemption.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Sanju"
  },
  {
    id: "mortal-kombat",
    title: "Mortal Kombat",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/77/Mortal_Kombat_%282021_film%29_poster.jpg", // martial arts / warrior in golden fire
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80", // gaming dark crimson fire
    rating: "A 18+",
    description: "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the forces of Outworld in a high-stakes, action-packed battle for the universe.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Mortal_Kombat_(2021_film)"
  },
  {
    id: "sky-force",
    title: "Sky Force",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/9/96/Sky_Force_film_poster.jpg", // aircraft pilot cockpit and jet controls
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", // dark high-altitude cockpit
    rating: "U/A 13+",
    description: "Sky Force tells the epic story of aviation warfare, featuring a group of elite jet fighter pilots navigating extreme geopolitical tensions, supersonic aerial battles, and unmatched bravery.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Aviation"
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", // official poster
    backdropUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80", // deep cosmos galaxy nebula
    rating: "U/A 13+",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Avengers:_Endgame"
  },
  {
    id: "sinners",
    title: "Sinners",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Sinners_2025_poster.jpg", // blood-red sunset / orb backdrop
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", // dark gothic red mist
    rating: "A 18+",
    description: "In a quiet, religious township, a series of mysterious occurrences and moral downfalls reveal hidden sins. Two brothers find themselves caught in a terrifying supernatural battle against ancient, gothic forces.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Gothic_fiction"
  },
  {
    id: "moonlight",
    title: "Moonlight",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29_poster.jpg", // intense artistic male portrait
    backdropUrl: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=1200&q=80", // quiet blue ocean under full moon
    rating: "A 18+",
    description: "A look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the support, love, and pain of those who help shape his path.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Moonlight_(2016_film)"
  },
  {
    id: "modern-family",
    title: "Modern Family",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/3/3d/Modern_Family_season_1_poster.jpg", // family photo / grid photo warm
    backdropUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80", // cozy bright living room light
    rating: "U/A 13+",
    description: "Three different but related families face trials and tribulations in their own uniquely comedic and heartwarming ways, captured through a hilarious mockumentary camera lens.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Modern_Family"
  },
  {
    id: "the-backrooms",
    title: "The Backrooms",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/23/The_Backrooms_model.png", // empty eerie yellow hallway
    backdropUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", // desolate creepy light
    rating: "U/A 16+",
    description: "Lost in an infinite maze of empty, yellow office rooms with buzzing fluorescent lights, a lost wanderer tries to escape the terrifying anomalies that live within the fabric of this non-euclidean reality.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Backrooms"
  },
  {
    id: "dhurandhar",
    title: "Dhurandhar",
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg", // official poster
    backdropUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80", // spotlight in dark theatre room
    rating: "U/A 16+",
    description: "Dhurandhar is an intense, monochromatic neo-noir crime thriller set in the underbelly of a bustling metropolis, exploring a police detective's descent into madness while chasing a clever serial mastermind.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Neo-noir"
  }
];

export const DIGEST_ITEMS: DigestItem[] = [
  {
    id: "ai-hollywood",
    title: "AI in Hollywood: Tool or Threat?",
    subtitle: "Filmmakers are divided as AI starts entering writing rooms, editing suites, and visual effects pipelines.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", // cinematic robotic arm / hollywood visual vibe
    badge: "HOT DEBATE",
    badgeColor: "bg-rose-500",
    metadata: "actively debating",
    voices: "2.4k voices",
    upvotes: 1845,
    downvotes: 432
  },
  {
    id: "superhero-losing-magic",
    title: "Are Superhero Movies Finally Losing Their Magic?",
    subtitle: "Analysis of the box office failures, oversaturation, and why fans are experiencing franchise fatigue.",
    imageUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80", // comic book stack / cosplay failure theme
    badge: "ANALYSIS",
    badgeColor: "bg-amber-500",
    metadata: "450 comments",
    upvotes: 932,
    downvotes: 140
  },
  {
    id: "homelander-joker",
    title: "Homelander - Generational performance since Heath Ledger's Joker",
    subtitle: "Why Anthony Starr's psychopathic portrayal is the gold standard of modern television antagonists.",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80", // gothic lighting scary portrait look
    badge: "LORE",
    badgeColor: "bg-teal-500",
    metadata: "Deep dive thread",
    upvotes: 1240,
    downvotes: 89
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "parasite-rev",
    movieTitle: "Parasite",
    rating: 5,
    content: "A masterful exploration of class disparity disguised as a gripping thriller. Every frame serves a purpose. The pacing is impeccable, and the dark humor resolves into a tragic, haunting final act.",
    authorName: "Sarah K.",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    thumbnailGradient: "from-emerald-400 via-teal-500 to-cyan-600"
  },
  {
    id: "oppenheimer-rev",
    movieTitle: "Oppenheimer",
    rating: 5,
    content: "Visceral, loud, and incredibly complex. A true cinematic achievement that demands to be seen on the biggest screen possible. Ludwig Göransson's score is a ticking anxiety machine.",
    authorName: "Tom R.",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    thumbnailGradient: "from-amber-400 via-orange-500 to-yellow-600"
  }
];

// Collage posters for the Hero section collage
export const HERO_COLLAGE_POSTERS = [
  {
    title: "Oppenheimer",
    url: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_(film).jpg",
    offsetClass: "w-[180px] h-[260px] top-[0px] left-[140px] z-20"
  },
  {
    title: "Spider-Man",
    url: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    offsetClass: "w-[120px] h-[180px] top-[20px] left-[340px] z-10"
  },
  {
    title: "Stranger Things",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png",
    offsetClass: "w-[240px] h-[340px] top-[60px] left-[200px] z-30"
  },
  {
    title: "The Family Man",
    url: "https://upload.wikimedia.org/wikipedia/en/e/e8/Family_man_movie.jpg",
    offsetClass: "w-[120px] h-[170px] top-[250px] left-[60px] z-10"
  },
  {
    title: "Friends",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Friends_logo.svg",
    offsetClass: "w-[130px] h-[190px] top-[320px] left-[180px] z-20"
  },
  {
    title: "Her",
    url: "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    offsetClass: "w-[130px] h-[190px] top-[340px] left-[320px] z-20"
  },
  {
    title: "Vikram",
    url: "https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg",
    offsetClass: "w-[120px] h-[170px] top-[210px] left-[420px] z-10"
  },
  {
    title: "Dune Messiah",
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=500&q=80",
    offsetClass: "w-[160px] h-[240px] top-[320px] left-[460px] z-30"
  }
];
