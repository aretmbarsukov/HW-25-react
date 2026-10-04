import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Feedback } from '../../components/Feedback/Feedback';
import { Loader } from '../../components/Loader/Loader';
import { getMovieReviews, getRequestError } from '../../services/moviesApi';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError('');

    getMovieReviews(movieId, controller.signal)
      .then(setReviews)
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
  if (!reviews.length)
    return <Feedback>Для цього фільму відгуків поки немає.</Feedback>;

  return (
    <div className={styles.list}>
      {reviews.slice(0, 10).map(review => (
        <article className={styles.review} key={review.id}>
          <div className={styles.header}>
            <h3 className={styles.author}>{review.author}</h3>
            {review.author_details?.rating != null && (
              <span className={styles.rating}>
                ★ {review.author_details.rating}/10
              </span>
            )}
          </div>
          <p className={styles.content}>{review.content}</p>
        </article>
      ))}
    </div>
  );
};

export default Reviews;
