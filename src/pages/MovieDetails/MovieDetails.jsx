import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { Feedback } from '../../components/Feedback/Feedback';
import { Loader } from '../../components/Loader/Loader';
import {
  getImageUrl,
  getMovieDetails,
  getRequestError,
} from '../../services/moviesApi';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setMovie(null);
    setError('');
    setIsLoading(true);

    getMovieDetails(movieId, controller.signal)
      .then(setMovie)
      .catch(requestError => {
        if (!controller.signal.aborted) setError(getRequestError(requestError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <Feedback variant="error">{error}</Feedback>;
  if (!movie) return null;

  const poster = getImageUrl(movie.poster_path);

  return (
    <section>
      <Link className={styles.backLink} to="/movies">
        <span aria-hidden="true">←</span> До пошуку фільмів
      </Link>

      <div className={styles.details}>
        <div className={styles.posterWrap}>
          {poster ? (
            <img
              className={styles.poster}
              src={poster}
              alt={`${movie.title} — постер`}
            />
          ) : (
            <div className={styles.noPoster}>Постер відсутній</div>
          )}
        </div>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            ФІЛЬМ · {movie.release_date?.slice(0, 4) || '—'}
          </span>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>«{movie.tagline}»</p>}
          <div className={styles.meta}>
            <span className={styles.rating}>
              ★ {movie.vote_average?.toFixed(1) || '—'}
            </span>
            {movie.runtime > 0 && <span>{movie.runtime} хв</span>}
            {movie.genres?.map(genre => (
              <span className={styles.genre} key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
          <h2 className={styles.subheading}>Про фільм</h2>
          <p className={styles.overview}>
            {movie.overview || 'Опис цього фільму поки що відсутній.'}
          </p>
          <div className={styles.tabs} aria-label="Додаткова інформація">
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.active}` : styles.tab
              }
              end
              to={`/movies/${movieId}`}
            >
              Огляд
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.active}` : styles.tab
              }
              to="cast"
            >
              Акторський склад
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.active}` : styles.tab
              }
              to="reviews"
            >
              Відгуки
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
