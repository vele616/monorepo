import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import Button from '../Button';
import Icon from '../Icon';

const Listbox = ({
  className,
  type,
  children,
  disabled,
  color,
  onClick,
  title,
  style,
  variant,
  value,
  label,
  size,
  ...other
}) => {

  // react.children.map(children, (child) => {  })

  return (
    <div className={styles.listbox}>
      {children}
    </div>
)};

Listbox.Item = ({
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
}) => {

  const [ selected, setSelected ] = useState(false);

  const handleClick = useCallback(() => {
    setSelected(!selected);
  }, [onClick, selected]);

  return (
    <div 
      className={`${styles.listbox__item}
        ${selected && styles.selected}`}
      onClick={handleClick} >
      {children}
    </div>
)};

Listbox.propTypes = {

};


export default Listbox;
