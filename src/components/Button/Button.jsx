import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onloadMore }) => {
  return (
    <div className={css.Buttoncontainer} onClick={onloadMore}>
      <button type="button" className={css.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
