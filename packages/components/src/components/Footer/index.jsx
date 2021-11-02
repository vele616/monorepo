import React from "react";
import PropTypes from "prop-types";
import Flexbox from "../Flexbox";
import Typography from "../Typography";
import useDevice from "../../hooks/useDevice";
import styles from "./index.module.scss";

/**
 * Component for displaying a generic footer inside of CroCoder
 * applications. Allows you to display a logo, social media links and
 * relative links inside of the application.
 * Adjusts to screen size.
 */
const Footer = ({
  className,
  children,
  style,
  logo,
  copyrightNotice,
  socialLinks,
  ...other
}) => {
  const { isMobile } = useDevice({ tablet: Number(styles.limit) + 1 });

  return (
    <footer
      {...other}
      style={style}
      className={`${className}  ${styles.footer} `}
    >
      <div className={styles.footer__grid}>
        <div className={styles.footer__logo}>{logo}</div>
        <Flexbox
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "center" : "baseline"}
          className={styles.footer__content}
        >
          {children}
        </Flexbox>
        <Flexbox alignItems="center" className={styles.footer__social_media}>
          <Flexbox justifyContent="space-between">{socialLinks}</Flexbox>
        </Flexbox>
        <div className={styles.line} />
        <Typography fontSize={12} className={styles.copyright}>
          {copyrightNotice}
        </Typography>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /**
   * Central part of the Footer component. Intended for relative links inside of the application.
   * The Footer component places all content passed as children to a Flexbox component.
   */
  children: PropTypes.node,
  /**
   * Passed to the footer element.
   */
  className: PropTypes.string,
  /**
   * Passed to the footer element.
   */
  style: PropTypes.shape({}),
  /**
   * Logo component with an image of the CroCoder logo and the link to the homepage.
   * Excluded from this component as it should be handled via the webapp (e.g. optimization of image resources).
   */
  logo: PropTypes.node,
  /**
   * Social media links of the application. Treated as separate group.
   */
  socialLinks: PropTypes.node,
  /**
   * Copyright notice
   */
  copyrightNotice: PropTypes.string,
};

export default Footer;
