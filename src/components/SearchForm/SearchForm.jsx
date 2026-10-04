import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './SearchForm.module.css';

export const SearchForm = ({ initialValue, onSubmit }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    if (normalizedQuery) onSubmit(normalizedQuery);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <label className={styles.label} htmlFor="movie-search">
        Знайти фільм
      </label>
      <div className={styles.controls}>
        <input
          autoComplete="off"
          className={styles.input}
          id="movie-search"
          onChange={event => setQuery(event.target.value)}
          placeholder="Наприклад, Інтерстеллар"
          type="search"
          value={query}
        />
        <button className={styles.button} type="submit">
          Шукати
        </button>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  initialValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
