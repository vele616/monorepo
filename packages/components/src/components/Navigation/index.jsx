import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/main.css";
import classnames from "classnames";
import Button from "../Button";
import Hamburger from "./Hamburger";
import styles from "./index.module.scss";
import useDevice from "../../hooks/useDevice";
import useScrollPrevent from "../../hooks/useScrollPrevent";

/**
 * Basic Navigation component for the CroCoder component library.
 */
const Navigation = ({
  className,
  children,
  style,
  Logo,
  transparentOnZeroScroll = false,
  defaultScrolled = false,
  ...other
}) => {
  const [scrolled, setIsScrolled] = useState(defaultScrolled || false);
  const [opened, setIsOpened] = useState(false);
  const { isMobile } = useDevice({ mobile: 1, tablet: 720 });
  const { disableScroll, enableScroll } = useScrollPrevent();

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
    return () => {
      enableScroll();
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [enableScroll, scrolled]);

  const toggleMenu = useCallback(() => {
    setIsOpened(!opened);
    if (isMobile && !opened) {
      disableScroll();
    } else if (isMobile && !!opened) {
      enableScroll();
    }
  }, [opened, isMobile, disableScroll, enableScroll]);


  return (
    <header
      {...other}
      style={style}
      className={classnames(className, styles.header, {
        [styles.scroll]: scrolled,
        [styles.closed]: !opened,
        [styles.transparent]: transparentOnZeroScroll && !scrolled && !opened,
      })}
    >
      <div className={styles.header__image}>{Logo}</div>
      <Button
        hidden={!opened || !isMobile}
        aria-haspopup="true"
        aria-expanded={opened && isMobile}
        aria-controls="navigation-content-menu"
        aria-label="Navigation"
        variant="sneaky"
        onClick={toggleMenu}
        className={styles.header__burger}
      >
        {isMobile && (
          <Hamburger className={styles.header__hamburger} open={opened} />
        )}
      </Button>
      <nav id="navigation-content-menu" className={styles.header__content}>
        {typeof children === "function"
          ? children(toggleMenu)
          : children || null}
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  /**
   * Indicator whether navigation is already scrolled. This is useful to prevent navigation "jumps"
   * when changing page but scroll preserves position.
   */
  defaultScrolled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  style: PropTypes.shape({}),
  /**
   * Logo component with an image of the CroCoder logo and the link to the homepage.
   * Excluded from this component as it should be handled via the webapp (e.g. optimization of image resources).
   */
  Logo: PropTypes.node,
  /**
   * Indicator if navigation should be transparent if page is not scrolled.
   */
  transparentOnZeroScroll: PropTypes.bool,
};

export default Navigation;
