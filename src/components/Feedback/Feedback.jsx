import PropTypes from 'prop-types';
import styles from './Feedback.module.css';

export const Feedback = ({ children, variant = 'empty' }) => (
  <p
    className={`${styles.feedback} ${variant === 'error' ? styles.error : ''}`}
    role={variant === 'error' ? 'alert' : undefined}
  >
    {children}
  </p>
);

Feedback.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['empty', 'error']),
};
