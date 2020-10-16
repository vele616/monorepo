import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import logoImage from '../../assets/images/logo.png';
import navigationImage from '../../assets/images/navigation.png';
import styles from './index.module.scss';
import Icon from '../Icon';
import Button from '../Button';


/**
 * Basic button component of the CroCoder component library
 */
const Navigation = ({
  className,
  children,
  style,
  ...other
}) => {
  const [scrolled, setIsScrolled] = useState(false);
  const [opened, setIsOpened] = useState(false);

  const scrollHandler = useCallback(() => {
    if (window.scrollY > 100 && !scrolled) {
      setIsScrolled(true);
    }
    if (window.scrollY === 0) {
      setIsScrolled(false);
    }
  }, [scrolled]);

  // TODO add detection of screen size (+ for hidden)
  // TODO add option to disable hamburger
  // TODO fix style for single element nav
  // TODO animations?


  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler]);

  const toggleMenu = useCallback(() => setIsOpened(!opened), [opened]);

  return (
    <>
      <nav
        {...other}
        style={style}
        className={`${className}  ${styles.navigation} ${scrolled && styles.scroll} ${!opened && styles.closed}`}
      >
        <picture>
          <source media="(max-width: 499px)" srcSet={logoImage} />
          <source media="(min-width: 500px)" srcSet={navigationImage} />
          <img src={navigationImage} className={styles.navigation__image} />
        </picture>
        <Button
          hidden={!opened} // todo not accurate
          aria-hasPopup="true"
          aria-expanded={opened}
          aria-controls="navigation-content-menu"
          variant="sneaky"
          onClick={toggleMenu}
          className={styles.navigation__burger}
        >
          <label hidden="true" for="navigation-content-menu">
            Navigation
          </label>
          <Icon icon={opened ? "close" : "burger"} />
        </Button>
        <div
          id="navigation-content-menu"
          className={styles.navigation__content}
        >
          {children}
        </div>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

Navigation.defaultProps = {
  disabled: false,
  variant: 'primary'
};

export default Navigation;
