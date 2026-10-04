import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/moviesApi';
import styles from './MovieCard.module.css';

export const MovieCard = ({ movie }) => {
  const title = movie.title || movie.name;
  const poster = getImageUrl(movie.poster_path);
  const year = movie.release_date?.slice(0, 4);

  return (
    <li className={styles.item}>
      <Link className={styles.card} to={`/movies/${movie.id}`}>
        <div className={styles.posterWrap}>
          {poster ? (
            <img
              className={styles.poster}
              src={poster}
              alt={`${title} — постер`}
              loading="lazy"
            />
          ) : (
            <div className={styles.noPoster}>Постер відсутній</div>
          )}
          <span className={styles.rating}>
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
          </span>
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.year}>{year || 'Рік невідомий'}</span>
        </div>
      </Link>
    </li>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};
