import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/main.css';
import Button from '../Button';
import Hamburger from './Hamburger';
import navigationImage from '../../assets/images/navigation.png';
import styles from './index.module.scss';
import useDevice from '../../hooks/useDevice';
import useScrollPrevent from '../../hooks/useScrollPrevent';


/**
 * Basic button component of the CroCoder component library
 */
const Navigation = ({
  className,
  children,
  style,
  onLogoClick,
  ...other
}) => {
  const [scrolled, setIsScrolled] = useState(false);
  const [opened, setIsOpened] = useState(false);
  const { isMobile } = useDevice();
  const { disableScroll, enableScroll,} = useScrollPrevent();


  // TODO fix style for single element nav
  // TODO animations?


  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100 && !scrolled) {
        setIsScrolled(true);
      }
      if (window.scrollY === 0) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler)
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpened(!opened);
  
    if (isMobile && !opened) {
      disableScroll();
    } else if (isMobile && !!opened) {
      enableScroll();
    }
  }, [opened, isMobile]);

  return (
    <>
      <nav
        {...other}
        style={style}
        className={`${className}  ${styles.navigation} ${scrolled && styles.scroll} ${!opened && styles.closed}`}
      >
        <picture onClick={onLogoClick}>
          <source media="(max-width: 499px)" srcSet={navigationImage} />
          <source media="(min-width: 500px)" srcSet={navigationImage} />
          <img src={navigationImage} className={styles.navigation__image} />
        </picture>
        <Button
          hidden={!opened || !isMobile}
          aria-haspopup="true"
          aria-expanded={opened && isMobile}
          aria-controls="navigation-content-menu"
          variant="sneaky"
          onClick={toggleMenu}
          className={styles.navigation__burger}
        >
          <label hidden={true} htmlFor="navigation-content-menu">
            Navigation
          </label>
          {isMobile && <Hamburger open={opened} />}
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
  /**
   * Function for redirecting on clicking the CroCoder navigation logo.
   */
  onLogoClick: PropTypes.func,
};

Navigation.defaultProps = {
  disabled: false,
  variant: 'primary'
};

export default Navigation;
