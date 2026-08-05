const express = require("express");
const router = express.Router();

const {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
  getWatchProviders,
  getMovieImages,
  getSimilarMovies
} = require("../controllers/movieController");

router.get("/trending", getTrendingMovies);
router.get("/search", searchMovies);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/watch-providers", getWatchProviders);
router.get("/:id/images", getMovieImages);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id", getMovieDetails);

module.exports = router;