const tmdb = require("./tmdbService");

exports.getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");
  return response.data;
};

exports.searchMovies = async (query) => {
  const response = await tmdb.get("/search/movie", { params: { query } });
  return response.data;
};

exports.getMovieDetails = async (id) => {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
};

exports.getMovieTrailer = async (id) => {
  const response = await tmdb.get(`/movie/${id}/videos`);
  const videos = response.data.results || [];
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (!trailer) {
    return { message: "Trailer not found" };
  }

  const { key, name, site, type } = trailer;
  return { key, name, site, type };
};

exports.getWatchProviders = async (id) => {
  const response = await tmdb.get(`/movie/${id}/watch/providers`);
  const providersData = response.data.results?.IN?.flatrate || [];

  return {
    providers: providersData.map((provider) => ({
      provider_id: provider.provider_id,
      provider_name: provider.provider_name,
      logo_path: provider.logo_path
    }))
  };
};

exports.getMovieImages = async (id) => {
  const response = await tmdb.get(`/movie/${id}/images`);
  const posters = (response.data.posters || []).slice(0, 10);
  const backdrops = (response.data.backdrops || []).slice(0, 10);

  return { posters, backdrops };
};

exports.getSimilarMovies = async (id) => {
  const response = await tmdb.get(`/movie/${id}/similar`);
  return response.data;
};
