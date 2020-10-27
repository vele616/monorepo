import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

/** 
 * Simple element for creating textual elements with the
 * CroCoder styling.
*/
const Typography = ({
  className,
  element,
  children,
  title,
  fontSize,
  fontWeight,
  color,
  fontFamily,
  ...other
}) => {
  let Component;
  if ([
    'h1', 'h2', 'h3', 'h4', 'h5',
    'h6', 'div', 'span', 'p', 'label',
  ].includes(element)) {
    Component = element;
  } else {
    Component = 'span';
  }

  let compositeClassName = `${styles.typography} ${className} `;
  compositeClassName += ` ${styles[`size${fontSize}`]} ${styles[`weight${fontWeight}`]} ${styles[`${fontFamily}`]}`;
  if (color) {
    compositeClassName += ` ${styles[`color${color}`]}`;
  }
  return React.createElement(
    Component,
    {
      ...other,
      title,
      className: compositeClassName,
    },
    children
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'black', 'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'gray_1',
    'gray_2', 'gray_3', 'gray_4', 'gray_5', 'gray_6', 'green_1', 'green_2', 'green_3',
    'green_4', 'green_5', 'orange_1', 'orange_2', 'orange_3', 'red_1', 'red_2', 'red_3',
    'red_4', 'red_5', 'white', 'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5',
  ]),
  element: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5',
    'h6', 'div', 'span', 'p', 'label',
  ]),
  /** Represents basic size on desktop */
  fontSize: PropTypes.oneOf([12, 14, 16, 18, 20,  22, 24, 26, 30, 34, 36, 44, 50, 65, 'inherit', 'unset' ]),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontFamily: PropTypes.oneOf(['rubik', 'roboto']),
  title: PropTypes.string,
};

Typography.defaultProps = {
  children: undefined,
  fontSize: 'inherit',
  fontWeight: 400,
  element: 'span',
};

export default Typography;
