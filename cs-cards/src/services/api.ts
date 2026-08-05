const API_BASE = "http://localhost:4000";

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
