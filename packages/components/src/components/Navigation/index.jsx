import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/main.css";
import Button from "../Button";
import Hamburger from "./Hamburger";
import styles from "./index.module.scss";
import useDevice from "../../hooks/useDevice";
import useScrollPrevent from "../../hooks/useScrollPrevent";

/**
 * Basic button component of the CroCoder component library
 */
const Navigation = ({ className, children, style, Logo, ...other }) => {
  const [scrolled, setIsScrolled] = useState(false);
  const [opened, setIsOpened] = useState(false);
  const { isMobile } = useDevice();
  const { disableScroll, enableScroll } = useScrollPrevent();

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
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [scrolled]);

  const toggleMenu = useCallback(() => {
    setIsOpened(!opened);
    if (isMobile && !opened) {
      disableScroll();
    } else if (isMobile && !!opened) {
      enableScroll();
    }
  }, [opened, isMobile, disableScroll, enableScroll]);

  return (
    <nav
      {...other}
      style={style}
      className={`${className}  ${styles.navigation} ${
        scrolled && styles.scroll
      } ${!opened && styles.closed}`}
    >
      <div className={styles.navigation__image}>{Logo}</div>
      <Button
        hidden={!opened || !isMobile}
        aria-haspopup="true"
        aria-expanded={opened && isMobile}
        aria-controls="navigation-content-menu"
        variant="sneaky"
        onClick={toggleMenu}
        className={styles.navigation__burger}
      >
        <label hidden htmlFor="navigation-content-menu">
          Navigation
        </label>
        {isMobile && (
          <Hamburger className={styles.navigation__hamburger} open={opened} />
        )}
      </Button>
      <div id="navigation-content-menu" className={styles.navigation__content}>
        {typeof children === "function"
          ? children(toggleMenu)
          : children || null}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  /**
   * Logo component with an image of the CroCoder logo and the link to the homepage.
   * Excluded from this component as it should be handled via the webapp (e.g. optimization of image resources).
   */
  Logo: PropTypes.node,
};

Navigation.defaultProps = {};

export default Navigation;
