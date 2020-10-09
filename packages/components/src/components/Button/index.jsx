import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Button = ({
  className,
  type,
  children,
  isDisabled,
  color,
  onClick,
  title,
  style,
  styleType,
  ...other
}) => (
  <button
    {...other}
    style={style}
    title={title}
    disabled={isDisabled}
    type={type}
    onClick={onClick}
    className={`${className}  ${styles.button} ${styles[styleType]} ${styles[color]} `}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.any,
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit', 'unset']),
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  title: PropTypes.string,
  styleType: PropTypes.oneOf(['basic', 'link', 'outline', 'submit']),
  type: PropTypes.string,
};

Button.defaultProps = {
  children: undefined,
  className: '',
  color: 'primary',
  isDisabled: false,
  onClick: () => {},
  style: {},
  title: '',
  styleType: 'basic',
};

export default Button;
