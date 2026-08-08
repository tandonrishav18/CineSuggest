const API_BASE = "https://cinesuggest-b2ea.onrender.com";

async function request(path: string) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getTrendingMovies() {
  return request(`/movies/trending`);
}

export async function searchMovies(query: string) {
  return request(`/movies/search?query=${encodeURIComponent(query)}`);
}

export async function getMovieDetails(id: string) {
  return request(`/movies/${id}`);
}

export async function getMovieTrailer(id: string) {
  return request(`/movies/${id}/trailer`);
}

export async function getWatchProviders(id: string) {
  return request(`/movies/${id}/watch-providers`);
}

export async function getMovieCast(id: number | string) {
  return request(`/movies/${id}/cast`);
}

export async function getMovieImages(id: number | string) {
  return request(`/movies/${id}/images`);
}

export async function getRecommendations(id: number | string) {
  return request(`/movies/${id}/recommendations`);
}
