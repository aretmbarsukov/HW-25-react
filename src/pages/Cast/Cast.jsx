import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Feedback } from '../../components/Feedback/Feedback';
import { Loader } from '../../components/Loader/Loader';
import {
  getImageUrl,
  getMovieCredits,
  getRequestError,
} from '../../services/moviesApi';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError('');

    getMovieCredits(movieId, controller.signal)
      .then(setCast)
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
  if (!cast.length)
    return <Feedback>Інформація про акторський склад відсутня.</Feedback>;

  return (
    <ul className={styles.list}>
      {cast.slice(0, 12).map(actor => {
        const photo = getImageUrl(actor.profile_path, 'w185');
        return (
          <li className={styles.person} key={actor.credit_id}>
            {photo ? (
              <img className={styles.photo} src={photo} alt="" loading="lazy" />
            ) : (
              <div className={styles.photoPlaceholder}>К</div>
            )}
            <div className={styles.info}>
              <p className={styles.name}>{actor.name}</p>
              <p className={styles.character}>
                {actor.character || 'Роль не вказана'}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
