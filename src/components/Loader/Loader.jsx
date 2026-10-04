import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.loader} role="status" aria-label="Завантаження">
    <span className={styles.spinner} />
  </div>
);
