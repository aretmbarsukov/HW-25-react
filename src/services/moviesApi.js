import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'uk-UA',
  },
});

const requireApiKey = () => {
  if (!process.env.REACT_APP_TMDB_API_KEY) {
    throw new Error(
      'Додайте ключ TMDB у REACT_APP_TMDB_API_KEY у файлі .env у корені проєкту.'
    );
  }
};

export const getTrendingMovies = async signal => {
  requireApiKey();
  const { data } = await api.get('/trending/movie/day', { signal });
  return data.results;
};

export const searchMovies = async (query, signal) => {
  requireApiKey();
  const { data } = await api.get('/search/movie', {
    params: { query },
    signal,
  });
  return data.results;
};

export const getMovieDetails = async (movieId, signal) => {
  requireApiKey();
  const { data } = await api.get(`/movie/${movieId}`, { signal });
  return data;
};

export const getMovieCredits = async (movieId, signal) => {
  requireApiKey();
  const { data } = await api.get(`/movie/${movieId}/credits`, { signal });
  return data.cast;
};

export const getMovieReviews = async (movieId, signal) => {
  requireApiKey();
  const { data } = await api.get(`/movie/${movieId}/reviews`, { signal });
  return data.results;
};

export const getImageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const getRequestError = error => {
  if (error.response?.status === 404) {
    return 'Фільм не знайдено. Перевірте посилання або спробуйте інший запит.';
  }
  if (error.response) {
    return 'Не вдалося отримати дані від TMDB. Спробуйте ще раз трохи пізніше.';
  }
  return error.message || 'Сталася помилка. Спробуйте ще раз.';
};
