import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:4000";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function buildErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const statusText = error.response?.statusText;
    const message = error.response?.data?.message || error.message;
    return status ? `Request failed: ${status} ${statusText || ""} - ${message}` : `Request failed: ${message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

async function request<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api.request<T>({ url: path, ...config });
    return response.data;
  } catch (error: unknown) {
    throw new Error(buildErrorMessage(error));
  }
}

export interface MovieListResponse<T = any> {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
}

export interface MovieDetailsResponse {
  [key: string]: any;
}

export interface MovieVideoResponse {
  key?: string;
  name?: string;
  site?: string;
  type?: string;
  message?: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProvidersResponse {
  providers: WatchProvider[];
}

export interface MovieImagesResponse {
  posters: any[];
  backdrops: any[];
}

export async function getTrendingMovies() {
  return request<MovieListResponse>(`/movies/trending`);
}

export async function searchMovies(query: string) {
  return request<MovieListResponse>(`/movies/search`, {
    params: { query },
  });
}

export async function getMovieDetails(id: string | number) {
  return request<MovieDetailsResponse>(`/movies/${id}`);
}

export async function getMovieTrailer(id: string | number) {
  return request<MovieVideoResponse>(`/movies/${id}/trailer`);
}

export async function getWatchProviders(id: string | number) {
  return request<WatchProvidersResponse>(`/movies/${id}/watch-providers`);
}

export async function getMovieImages(id: string | number) {
  return request<MovieImagesResponse>(`/movies/${id}/images`);
}

export async function getSimilarMovies(id: string | number) {
  return request<MovieListResponse>(`/movies/${id}/similar`);
}
