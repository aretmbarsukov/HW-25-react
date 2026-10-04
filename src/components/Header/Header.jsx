import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <NavLink className={styles.brand} to="/" aria-label="Кадр — на головну">
        <span className={styles.brandMark}>К</span>
        <span>КАДР</span>
      </NavLink>
      <nav className={styles.navigation} aria-label="Головна навігація">
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          end
          to="/"
        >
          Головна
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/movies"
        >
          Фільми
        </NavLink>
      </nav>
      <span className={styles.caption}>Знайди свій наступний фільм</span>
    </div>
  </header>
);
