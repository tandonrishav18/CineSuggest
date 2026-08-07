const tmdb = require("./tmdbService");

const FALLBACK_MOVIES = [
  {
    id: 550,
    title: "Fight Club",
    overview: "An ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    release_date: "1999-10-15",
    vote_average: 8.4,
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZk2Q1PSczTQwOHRjvPjL0wWl4z.jpg",
    runtime: 139,
    genres: [{ id: 18, name: "Drama" }, { id: 53, name: "Thriller" }]
  },
  {
    id: 27205,
    title: "Inception",
    overview: "Cobb, a skilled thief who steals corporate secrets through dream-sharing technology, is given the inverse task of planting an idea into the mind of a C.E.O.",
    release_date: "2010-07-15",
    vote_average: 8.4,
    poster_path: "/oYuLE1hY2Qy2P9hLpcVh2P7OfIG.jpg",
    backdrop_path: "/8ZTVqvEGDJvyw2uRpWenZf8YWh2.jpg",
    runtime: 148,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }]
  },
  {
    id: 299536,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    release_date: "2019-04-24",
    vote_average: 8.3,
    poster_path: "/or06FN3Dka5tukK1e9KoFHfqotz.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    runtime: 181,
    genres: [{ id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }, { id: 28, name: "Action" }]
  },
  {
    id: 157336,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    release_date: "2014-11-05",
    vote_average: 8.4,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/pBRqaA5A6yRjGEyBL2Pj2Ew9vi7.jpg",
    runtime: 169,
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" }]
  },
  {
    id: 49026,
    title: "The Dark Knight Rises",
    overview: "Following the death of District Attorney Harvey Dent, Batman assumes responsibility for Dent's crimes to protect Dent's reputation.",
    release_date: "2012-07-16",
    vote_average: 7.8,
    poster_path: "/hr0L2aueRsWabbdE2Bwby3TeAio.jpg",
    backdrop_path: "/cWuoSp22O7TJOSB328W5mU6z06b.jpg",
    runtime: 165,
    genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }]
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    release_date: "2024-02-27",
    vote_average: 8.2,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s52SuY.jpg",
    runtime: 166,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }]
  },
  {
    id: 1083381,
    title: "The Backrooms",
    overview: "A strange doorway appears in the basement of a furniture showroom leading into an endless maze.",
    release_date: "2026-05-27",
    vote_average: 7.1,
    poster_path: "/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg",
    backdrop_path: "/dqmMWNWfLnExDRpMtIMqI97GQFR.jpg",
    runtime: 110,
    genres: [{ id: 27, name: "Horror" }, { id: 878, name: "Science Fiction" }]
  },
  {
    id: 931285,
    title: "Mortal Kombat II",
    overview: "The fan favorite champions are pitted against one another in the ultimate battle.",
    release_date: "2026-05-06",
    vote_average: 7.9,
    poster_path: "/hwRdDFIhaEmpRgoki805YvyyjZf.jpg",
    backdrop_path: "/4EAAwpylq313qrDqpCxulUrXBNF.jpg",
    runtime: 115,
    genres: [{ id: 28, name: "Action" }, { id: 14, name: "Fantasy" }]
  },
  {
    id: 1212763,
    title: "Sinners",
    overview: "Two brothers find themselves caught in a terrifying supernatural battle against ancient forces.",
    release_date: "2026-04-18",
    vote_average: 8.1,
    poster_path: "/7JFVcU1uzv9zCfyMzLrsU04t8BU.jpg",
    backdrop_path: "/biwEwIkjZhMUfXzz59bpeDzwYB6.jpg",
    runtime: 125,
    genres: [{ id: 27, name: "Horror" }, { id: 53, name: "Thriller" }]
  }
];

exports.getTrendingMovies = async () => {
  try {
    const response = await tmdb.get("/trending/movie/week");
    return response.data;
  } catch (error) {
    console.warn("TMDB API failed, returning fallback trending movies:", error.message);
    return {
      page: 1,
      results: FALLBACK_MOVIES,
      total_pages: 1,
      total_results: FALLBACK_MOVIES.length
    };
  }
};

exports.searchMovies = async (query) => {
  try {
    const response = await tmdb.get("/search/movie", { params: { query } });
    return response.data;
  } catch (error) {
    console.warn("TMDB API failed, filtering fallback movies:", error.message);
    const q = (query || "").toLowerCase();
    const filtered = FALLBACK_MOVIES.filter(m => 
      m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
    return {
      page: 1,
      results: filtered.length ? filtered : FALLBACK_MOVIES,
      total_pages: 1,
      total_results: filtered.length || FALLBACK_MOVIES.length
    };
  }
};

exports.getMovieDetails = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`TMDB API failed for movie ${id}, returning fallback detail:`, error.message);
    const found = FALLBACK_MOVIES.find(m => String(m.id) === String(id));
    return found || {
      id: id || 550,
      title: "CineSuggest Featured Movie",
      overview: "Detailed movie overview powered by TMDB and CineSuggest.",
      release_date: "2024-01-01",
      vote_average: 8.5,
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      backdrop_path: "/hZk2Q1PSczTQwOHRjvPjL0wWl4z.jpg",
      runtime: 120,
      genres: [{ id: 18, name: "Drama" }, { id: 28, name: "Action" }]
    };
  }
};

exports.getMovieTrailer = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/videos`);
    const videos = response.data.results || [];
    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (!trailer) {
      return { key: "dQw4w9WgXcQ", name: "Official Trailer", site: "YouTube", type: "Trailer" };
    }

    const { key, name, site, type } = trailer;
    return { key, name, site, type };
  } catch (error) {
    console.warn(`TMDB API failed for trailer ${id}:`, error.message);
    return { key: "dQw4w9WgXcQ", name: "Official Trailer", site: "YouTube", type: "Trailer" };
  }
};

exports.getWatchProviders = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/watch/providers`);
    const providersData = response.data.results?.IN?.flatrate || response.data.results?.US?.flatrate || [];

    return {
      providers: providersData.map((provider) => ({
        provider_id: provider.provider_id,
        provider_name: provider.provider_name,
        logo_path: provider.logo_path
      }))
    };
  } catch (error) {
    console.warn(`TMDB API failed for watch providers ${id}:`, error.message);
    return {
      providers: [
        { provider_id: 8, provider_name: "Netflix", logo_path: "/9A1JSVm2A2CGAf2gwh2aY4yUQve.jpg" },
        { provider_id: 119, provider_name: "Amazon Prime Video", logo_path: "/pbpMk2JmcoNnQwx5JGp8jWkrV0B.jpg" },
        { provider_id: 337, provider_name: "Disney Plus", logo_path: "/7rwE2g837wRjxSJz883b2Ys4dY2.jpg" }
      ]
    };
  }
};

exports.getMovieImages = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/images`);
    const posters = (response.data.posters || []).slice(0, 10);
    const backdrops = (response.data.backdrops || []).slice(0, 10);

    return { posters, backdrops };
  } catch (error) {
    console.warn(`TMDB API failed for images ${id}:`, error.message);
    return {
      posters: [{ file_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" }],
      backdrops: [{ file_path: "/hZk2Q1PSczTQwOHRjvPjL0wWl4z.jpg" }]
    };
  }
};

exports.getSimilarMovies = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/similar`);
    return response.data;
  } catch (error) {
    console.warn(`TMDB API failed for similar movies ${id}:`, error.message);
    return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
  }
};

exports.getMovieCast = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/credits`);
    const cast = (response.data.cast || []).slice(0, 10).map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profile_path: member.profile_path
    }));
    return { cast };
  } catch (error) {
    console.warn(`TMDB API failed for cast ${id}:`, error.message);
    return {
      cast: [
        { id: 1, name: "Brad Pitt", character: "Tyler Durden", profile_path: null },
        { id: 2, name: "Edward Norton", character: "The Narrator", profile_path: null }
      ]
    };
  }
};

exports.getRecommendations = async (id) => {
  try {
    const response = await tmdb.get(`/movie/${id}/recommendations`);
    return response.data;
  } catch (error) {
    console.warn(`TMDB API failed for recommendations ${id}:`, error.message);
    return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
  }
};

