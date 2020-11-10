import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';


/**
 * Basic button component of the CroCoder component library
 */
const Button = ({
  className,
  type,
  children,
  disabled,
  color,
  onClick,
  title,
  style,
  variant,
  ...other
}) => (
  <button
    {...other}
    style={style}
    title={title}
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={`${className}  ${styles.button} ${styles[variant]}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
  title: PropTypes.string,
  /**
   * Available styling of the CroCoder buttons.
   * Defined via style guide.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'sneaky']),
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
};

Button.defaultProps = {
  disabled: false,
  variant: 'primary'
};

export default Button;
