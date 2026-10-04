import { useEffect, useState } from 'react';
import { Feedback } from '../../components/Feedback/Feedback';
import { Loader } from '../../components/Loader/Loader';
import { MovieList } from '../../components/MovieList/MovieList';
import { getRequestError, getTrendingMovies } from '../../services/moviesApi';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getTrendingMovies(controller.signal)
      .then(setMovies)
      .catch(requestError => {
        if (!controller.signal.aborted) setError(getRequestError(requestError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Твій гід у світі кіно</span>
        <h1 className={styles.title}>
          Історії, які
          <br />
          <span>залишаються з тобою.</span>
        </h1>
        <p className={styles.description}>
          Відкривай нові світи. Обирай фільм під свій настрій.
        </p>
      </section>

      <section aria-labelledby="trending-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionLabel}>НЕ ПРОПУСТИ</span>
            <h2 className={styles.sectionTitle} id="trending-title">
              Популярне сьогодні
            </h2>
          </div>
          <span className={styles.today}>TRENDING</span>
        </div>
        {isLoading && <Loader />}
        {error && <Feedback variant="error">{error}</Feedback>}
        {!isLoading && !error && movies.length === 0 && (
          <Feedback>Популярних фільмів поки немає.</Feedback>
        )}
        {!isLoading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
      </section>
    </>
  );
};

export default Home;
