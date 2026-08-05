const asyncHandler = require("../utils/asyncHandler");
const movieService = require("../services/movieService");

const getTrendingMovies = asyncHandler(async (req, res) => {
  const data = await movieService.getTrendingMovies();
  res.json(data);
});

const searchMovies = asyncHandler(async (req, res) => {
  const query = req.query.query;
  const data = await movieService.searchMovies(query);
  res.json(data);
});

const getMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await movieService.getMovieDetails(id);
  res.json(data);
});

const getMovieTrailer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await movieService.getMovieTrailer(id);
  res.json(data);
});

const getWatchProviders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await movieService.getWatchProviders(id);
  res.json(data);
});

const getMovieImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await movieService.getMovieImages(id);
  res.json(data);
});

const getSimilarMovies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await movieService.getSimilarMovies(id);
  res.json(data);
});

module.exports = {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
  getWatchProviders,
  getMovieImages,
  getSimilarMovies
};