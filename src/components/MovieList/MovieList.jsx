import PropTypes from 'prop-types';
import { MovieCard } from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

export const MovieList = ({ movies }) => (
  <ul className={styles.list}>
    {movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
