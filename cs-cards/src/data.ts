import { Movie } from './types';

export const MOVIES: Movie[] = [
  {
    id: 'the-boys',
    title: 'The Boys',
    description: "In a world where superheroes embrace the darker side of their massive celebrity and fame, an informal group of vigilantes known colloquially as 'The Boys' embark on a heroic quest to expose the truth about 'The Seven' and Vought.",
    year: 2019,
    duration: '5 Seasons',
    rating: '18+',
    certificateDetails: 'violence, sexual content, language, gore',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/The_Boys_season_1_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=800&q=80',
    categories: ['Action', 'Sci-Fi', 'Drama'],
    imdbRating: '8.7/10',
    rottenTomatoesRating: '93% Fresh',
    rewatchValue: 89,
    stillUrl: 'https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 99',
      }
    ],
    reviews: [
      {
        id: 'tb-rev-1',
        author: 'ButcherFan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        timestamp: '2 days ago',
        vibeTag: '★ 95% Mind Blow',
        vibeType: 'mind_blow',
        content: 'Absolutely diabolical! Karl Urban and Antony Starr are incredible. The satire on modern corporate superhero culture is spot on and goes places no other show dares to go.',
        helpfulCount: 312,
        commentsCount: 22,
        userLiked: false,
      }
    ]
  },
  {
    id: 'sanju',
    title: 'Sanju',
    description: 'Sanju is a biographical drama that traces the dramatic and highly controversial real life of actor Sanjay Dutt, detailing his battles with addiction, legal turmoils, family bonds, and ultimate redemption.',
    year: 2018,
    duration: '2H 39M',
    rating: 'U/A 13+',
    certificateDetails: 'drug references, language',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/70/Sanju_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=800&q=80',
    categories: ['Biography', 'Drama'],
    imdbRating: '7.7/10',
    rottenTomatoesRating: '80% Fresh',
    rewatchValue: 75,
    stillUrl: 'https://images.unsplash.com/photo-1542204172-e7052809a862?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 79',
      }
    ],
    reviews: [
      {
        id: 'sj-rev-1',
        author: 'BollywoodNerd',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop',
        timestamp: '1 week ago',
        vibeTag: '🔥 85% Emotional Damage',
        vibeType: 'emotional_damage',
        content: "Ranbir Kapoor's performance is legendary. He captured Sanjay Dutt's body language and speech pattern perfectly. The father-son relationship depicted in the movie is heart-wrenching.",
        helpfulCount: 142,
        commentsCount: 9,
        userLiked: false,
      }
    ]
  },
  {
    id: 'mortal-kombat',
    title: 'Mortal Kombat',
    description: "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the forces of Outworld in a high-stakes, action-packed battle for the universe.",
    year: 2021,
    duration: '1H 50M',
    rating: 'A 18+',
    certificateDetails: 'extreme violence, language, gore',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/77/Mortal_Kombat_%282021_film%29_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    categories: ['Action', 'Fantasy', 'Adventure'],
    imdbRating: '6.0/10',
    rottenTomatoesRating: '54% Fresh',
    rewatchValue: 68,
    stillUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 69',
      }
    ],
    reviews: [
      {
        id: 'mk-rev-1',
        author: 'GamerGuy',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=120&auto=format&fit=crop',
        timestamp: '3 days ago',
        vibeTag: '★ 70% Meh',
        vibeType: 'meh',
        content: 'Great fight scenes and cool special effects, but the plot is very thin. Sub-Zero and Scorpion fight scenes are the absolute highlight of the entire movie.',
        helpfulCount: 65,
        commentsCount: 4,
        userLiked: false,
      }
    ]
  },
  {
    id: 'sky-force',
    title: 'Sky Force',
    description: 'Sky Force tells the epic story of aviation warfare, featuring a group of elite jet fighter pilots navigating extreme geopolitical tensions, supersonic aerial battles, and unmatched bravery.',
    year: 2024,
    duration: '2H 15M',
    rating: 'U/A 13+',
    certificateDetails: 'action violence, language',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/96/Sky_Force_film_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    categories: ['Action', 'Thriller', 'War'],
    imdbRating: '7.5/10',
    rottenTomatoesRating: '85% Fresh',
    rewatchValue: 80,
    stillUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 89',
      }
    ],
    reviews: [
      {
        id: 'sf-rev-1',
        author: 'AeroLover',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=120&auto=format&fit=crop',
        timestamp: '5 days ago',
        vibeTag: '🔥 88% Mind Blow',
        vibeType: 'mind_blow',
        content: 'Insane aerial dogfights and cinematic shots! It feels like India\'s answer to Top Gun. The sound design is punchy and really puts you in the cockpit.',
        helpfulCount: 88,
        commentsCount: 11,
        userLiked: false,
      }
    ]
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    year: 2019,
    duration: '3H 1M',
    rating: 'U/A 13+',
    certificateDetails: 'sci-fi violence, language',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    categories: ['Action', 'Sci-Fi', 'Adventure'],
    imdbRating: '8.4/10',
    rottenTomatoesRating: '94% Fresh',
    rewatchValue: 95,
    stillUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      }
    ],
    reviews: [
      {
        id: 'av-rev-1',
        author: 'MarvelFan99',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        timestamp: '1 month ago',
        vibeTag: '★ 99% Masterpiece',
        vibeType: 'masterpiece',
        content: 'An absolute masterpiece of finality for a 22-movie journey. The portal scene still gives me goosebumps every single time. A historic cinematic experience.',
        helpfulCount: 520,
        commentsCount: 45,
        userLiked: false,
      }
    ]
  },
  {
    id: 'sinners',
    title: 'Sinners',
    description: "Twin brothers return to their hometown hoping for a fresh start, only to uncover an ancient evil lurking in the shadows. Ryan Coogler's Sinners blends Southern Gothic horror, music, and folklore into a haunting, genre-defying experience.",
    year: 2025,
    duration: '2H 17M',
    rating: 'R',
    certificateDetails: 'violence, sexual content, language',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Sinners_%282025_film%29_poster.jpg',
    trailerThumbUrl: 'https://img.youtube.com/vi/4oqCwr_bzHI/maxresdefault.jpg',
    categories: ['Horror', 'Supernatural', 'Musical'],
    imdbRating: '9.4/10',
    rottenTomatoesRating: '97% Fresh',
    rewatchValue: 92,
    stillUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 120',
      }
    ],
    reviews: [
      {
        id: 'review-1',
        author: 'CosmicWatcher',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        timestamp: '2 days ago',
        vibeTag: '★ 98% Mind Blow',
        vibeType: 'mind_blow',
        content: 'The movie was good and interesting for a historic fantasy kind of genre but it is seriously overhyped. The best part was by far the music. If I rated the score alone it would be around an 8.5/10.',
        helpfulCount: 124,
        commentsCount: 12,
        userLiked: false,
      }
    ]
  },
  {
    id: 'moonlight',
    title: 'Moonlight',
    description: 'A look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the support, love, and pain of those who help shape his path.',
    year: 2016,
    duration: '1H 51M',
    rating: 'A 18+',
    certificateDetails: 'language, drug content, sexuality',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80',
    categories: ['Drama', 'LGBTQ+'],
    imdbRating: '7.4/10',
    rottenTomatoesRating: '98% Fresh',
    rewatchValue: 82,
    stillUrl: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 59',
      }
    ],
    reviews: [
      {
        id: 'ml-rev-1',
        author: 'IndieLover',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=120&auto=format&fit=crop',
        timestamp: '3 weeks ago',
        vibeTag: '★ 98% Masterpiece',
        vibeType: 'masterpiece',
        content: 'Beautifully shot and deeply emotional. The three-act structure works wonders, showing Chiron at three pivotal moments in his life. Best Picture winner for a reason.',
        helpfulCount: 220,
        commentsCount: 15,
        userLiked: false,
      }
    ]
  },
  {
    id: 'modern-family',
    title: 'Modern Family',
    description: 'Three different but related families face trials and tribulations in their own uniquely comedic and heartwarming ways, captured through a hilarious mockumentary camera lens.',
    year: 2009,
    duration: '11 Seasons',
    rating: 'U/A 13+',
    certificateDetails: 'suggestive humor, language',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Modern_Family_season_1_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    categories: ['Comedy', 'Romance'],
    imdbRating: '8.5/10',
    rottenTomatoesRating: '85% Fresh',
    rewatchValue: 90,
    stillUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 49',
      }
    ],
    reviews: [
      {
        id: 'mf-rev-1',
        author: 'SitcomNerd',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
        timestamp: '6 days ago',
        vibeTag: '★ 90% Mind Blow',
        vibeType: 'mind_blow',
        content: 'One of the best mockumentaries of all time! Phil Dunphy is absolute comedy gold. The characters have genuine growth and it has high rewatch value.',
        helpfulCount: 195,
        commentsCount: 8,
        userLiked: false,
      }
    ]
  },
  {
    id: 'the-backrooms',
    title: 'The Backrooms',
    description: 'Lost in an infinite maze of empty, yellow office rooms with buzzing fluorescent lights, a lost wanderer tries to escape the terrifying anomalies that live within the fabric of this non-euclidean reality.',
    year: 2024,
    duration: '1H 30M',
    rating: 'U/A 16+',
    certificateDetails: 'fear, intense suspense',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/The_Backrooms_model.png',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    categories: ['Horror', 'Mystery', 'Thriller'],
    imdbRating: '7.2/10',
    rottenTomatoesRating: '78% Fresh',
    rewatchValue: 70,
    stillUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      }
    ],
    reviews: [
      {
        id: 'br-rev-1',
        author: 'CreepyCreep',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=120&auto=format&fit=crop',
        timestamp: '1 day ago',
        vibeTag: '🔥 85% Emotional Damage',
        vibeType: 'emotional_damage',
        content: 'Captures the liminal space horror of the internet creepypasta perfectly. Eerie, claustrophobic, and leaves you with an unsettling feeling of being watched.',
        helpfulCount: 78,
        commentsCount: 6,
        userLiked: false,
      }
    ]
  },
  {
    id: 'dhurandhar',
    title: 'Dhurandhar',
    description: 'Dhurandhar is an intense, monochromatic neo-noir crime thriller set in the underbelly of a bustling metropolis, exploring a police detective\'s descent into madness while chasing a clever serial mastermind.',
    year: 2025,
    duration: '2H 20M',
    rating: 'U/A 16+',
    certificateDetails: 'violence, strong language, crime',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    categories: ['Action', 'Thriller', 'Crime'],
    imdbRating: '8.1/10',
    rottenTomatoesRating: '88% Fresh',
    rewatchValue: 81,
    stillUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 109',
      }
    ],
    reviews: [
      {
        id: 'dd-rev-1',
        author: 'NoirDetective',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=120&auto=format&fit=crop',
        timestamp: 'Just now',
        vibeTag: '★ 90% Mind Blow',
        vibeType: 'mind_blow',
        content: 'Stunning cinematography and a bleak atmosphere. The cat-and-mouse chase is highly engaging and keeps you guessing until the final frame. A solid neo-noir entry.',
        helpfulCount: 42,
        commentsCount: 2,
        userLiked: false,
      }
    ]
  },
  {
    id: 'nosferatu',
    title: 'Nosferatu',
    description: 'A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake. Robert Eggers directs a hauntingly beautiful, deeply atmospheric remake that honors the classic silent film while forging its own nightmare path.',
    year: 2024,
    duration: '2H 12M',
    rating: 'R',
    certificateDetails: 'terror, gore, violence, sexual content',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800',
    categories: ['Horror', 'Gothic', 'Supernatural'],
    imdbRating: '8.1/10',
    rottenTomatoesRating: '93% Fresh',
    rewatchValue: 88,
    stillUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 129',
      }
    ],
    reviews: [
      {
        id: 'review-3',
        author: 'GothicScribe',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=120&auto=format&fit=crop',
        timestamp: '3 days ago',
        vibeTag: '★ 92% Masterpiece',
        vibeType: 'masterpiece',
        content: 'Eggers has done it again. The atmosphere is so thick you can cut it with a knife. Lily-Rose Depp gives a mesmerizing performance of vulnerability and terror.',
        helpfulCount: 45,
        commentsCount: 3,
        userLiked: false,
      }
    ]
  },
  {
    id: 'substance',
    title: 'The Substance',
    description: 'A fading celebrity decides to use a black-market drug, a cell-replicating substance that temporarily creates a younger, better, more perfect version of herself. It unleashes a visceral, stylish, and grotesque body-horror descent that critiques aging and fame with savage bite.',
    year: 2024,
    duration: '2H 21M',
    rating: 'R',
    certificateDetails: 'extreme gore, body horror, strong violence, nudity',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800',
    categories: ['Horror', 'Body Horror', 'Drama'],
    imdbRating: '7.9/10',
    rottenTomatoesRating: '91% Fresh',
    rewatchValue: 85,
    stillUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 149',
      }
    ],
    reviews: [
      {
        id: 'review-4',
        author: 'HorrorJunkie',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop',
        timestamp: '5 days ago',
        vibeTag: '🔥 90% Mind Blow',
        vibeType: 'mind_blow',
        content: 'Visually brilliant, shocking, and deeply unsettling! The final 30 minutes of this movie will leave your jaw on the floor.',
        helpfulCount: 72,
        commentsCount: 14,
        userLiked: false,
      }
    ]
  },
  {
    id: 'oblivion',
    title: 'Oblivion',
    description: "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission and his past after rescuing a stranger from a downed spacecraft.",
    year: 2013,
    duration: '2H 4M',
    rating: 'PG-13',
    certificateDetails: 'action, violence, sci-fi images',
    posterUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
    categories: ['Action', 'Sci-Fi', 'Mystery'],
    imdbRating: '7.0/10',
    rottenTomatoesRating: '54% Fresh',
    rewatchValue: 70,
    stillUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
    streamProviders: [
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 79',
      }
    ],
    reviews: []
  },
  {
    id: 'stranger-things',
    title: 'Stranger Things 5',
    description: "The final season of the epic supernatural series. As Vecna's terrifying shadow looms over Hawkins, the gang must band together for one last stand to close the gate and save their town once and for all.",
    year: 2025,
    duration: '5 Seasons',
    rating: '16+',
    certificateDetails: 'terror, language, supernatural elements',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    categories: ['Sci-Fi', 'Drama', 'Horror'],
    imdbRating: '8.7/10',
    rottenTomatoesRating: '92% Fresh',
    rewatchValue: 95,
    stillUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 99',
      }
    ],
    reviews: []
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    description: "An astronaut fights to save Earth from an extinction-level event. Based on Andy Weir's best-selling novel, this high-stakes space survival thriller details human ingenuity and friendship in the cold depths of the universe.",
    year: 2026,
    duration: '2H 35M',
    rating: 'PG-13',
    certificateDetails: 'intense sequences of sci-fi action',
    posterUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80',
    categories: ['Sci-Fi', 'Adventure', 'Thriller'],
    imdbRating: '8.5/10',
    rottenTomatoesRating: '90% Fresh',
    rewatchValue: 92,
    stillUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 119',
      }
    ],
    reviews: []
  },
  {
    id: 'raees',
    title: 'Raees',
    description: "A clever bootlegger goes on a daring rise in Gujarat, building an empire while evading a relentless police officer determined to shut down his operations.",
    year: 2017,
    duration: '2H 23M',
    rating: 'U/A 13+',
    certificateDetails: 'action, violence, intense drama',
    posterUrl: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=400&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=400&q=80',
    categories: ['Action', 'Crime', 'Drama'],
    imdbRating: '6.8/10',
    rottenTomatoesRating: '67% Fresh',
    rewatchValue: 74,
    stillUrl: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=400&q=80',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'YouTube',
        logo: '',
        watchUrl: '#watch-youtube',
        priceText: 'Rent From Rs. 69',
      }
    ],
    reviews: []
  },
  {
    id: 'kalki',
    title: 'Kalki 2898 AD',
    description: "A modern avatar of Vishnu, a Hindu god, is believed to have descended to earth to protect the world from evil forces in a dystopian future.",
    year: 2024,
    duration: '3H 0M',
    rating: 'U/A 13+',
    certificateDetails: 'action, violence, sci-fi imagery',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    categories: ['Action', 'Sci-Fi', 'Fantasy'],
    imdbRating: '7.2/10',
    rottenTomatoesRating: '82% Fresh',
    rewatchValue: 80,
    stillUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    streamProviders: [
      {
        name: 'Amazon Prime Video',
        logo: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-prime',
      },
      {
        name: 'Jio Hotstar',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-hotstar',
      },
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      }
    ],
    reviews: []
  },
  {
    id: 'joker',
    title: 'Joker',
    description: "Arthur Fleck, a clown-for-hire, is driven to madness and crime by a society that ignores and rejects him, triggering an epic descent into chaos.",
    year: 2019,
    duration: '2H 2M',
    rating: 'R',
    certificateDetails: 'extreme violence, language, dark themes',
    posterUrl: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=400&q=80',
    trailerThumbUrl: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=400&q=80',
    categories: ['Drama', 'Crime', 'Thriller'],
    imdbRating: '8.4/10',
    rottenTomatoesRating: '69% Fresh',
    rewatchValue: 88,
    stillUrl: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=400&q=80',
    streamProviders: [
      {
        name: 'Netflix',
        logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop',
        watchUrl: '#watch-netflix',
      }
    ],
    reviews: []
  }
];
