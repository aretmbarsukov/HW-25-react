import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Feedback } from '../../components/Feedback/Feedback';
import { Loader } from '../../components/Loader/Loader';
import { MovieList } from '../../components/MovieList/MovieList';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { getRequestError, searchMovies } from '../../services/moviesApi';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim() || '';
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setError('');
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError('');

    searchMovies(query, controller.signal)
      .then(setMovies)
      .catch(requestError => {
        if (!controller.signal.aborted) setError(getRequestError(requestError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  const handleSearch = value => setSearchParams({ query: value });

  return (
    <section>
      <span className={styles.eyebrow}>КАТАЛОГ</span>
      <h1 className={styles.title}>Знайди свій фільм</h1>
      <p className={styles.description}>
        Шукай за назвою та відкривай нові історії.
      </p>
      <SearchForm initialValue={query} onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {error && <Feedback variant="error">{error}</Feedback>}
      {!isLoading && !error && query && movies.length === 0 && (
        <Feedback>
          За запитом «{query}» нічого не знайдено. Спробуйте іншу назву.
        </Feedback>
      )}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      {!query && (
        <div className={styles.hint}>
          <span className={styles.hintIcon}>⌕</span>
          <p>Введи назву фільму, щоб побачити результати пошуку.</p>
        </div>
      )}
    </section>
  );
};

export default Movies;
