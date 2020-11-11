import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import Button from '../Button';
import Listbox from '../Listbox';
import Icon from '../Icon';

/**
 * Basic select component of the CroCoder component library
 */
const Select = ({
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
  ...other
}) => {

  const [ expanded, setExpanded ] = useState(false);

  const handleClick = useCallback((e) => {
    setExpanded(!expanded);
  }, [onClick, expanded]);

  return (
    <div
      style={style}
      className={`${className || ''}
      ${styles.select__wrapper} `}>
      <label className={styles.select__label}>{label}</label>
      <Button 
        className={styles.select__button}
        onClick={handleClick}
        variant="sneaky">
        Select country
        <Icon className={styles.select__button__icon} icon="chevron-down" />
      </Button>
      { expanded && children }
    </div>
)};

Select.propTypes = {

};


export default Select;
