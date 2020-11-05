import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import useDevice from '../../hooks/useDevice';
import styles from './index.module.scss';


/**
 * Basic button component of the CroCoder component library
 */
const Footer = ({
  className,
  children,
  style,
  logo,
  copyrigtNotice,
  socialLinks,
  ...other
}) => {
  const { isMobile } = useDevice({ tablet : styles.limit});


  return (
    <footer
      {...other}
      style={style}
      className={`${className}  ${styles.footer} `}
    >
      <div className={styles.footer__grid}>
        <div className={styles.footer__logo}>
          {logo}
        </div>
        <Flexbox
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'center' : 'baseline'}
          className={styles.footer__content}
        >
          {children}
        </Flexbox>
        <Flexbox
          alignItems="center"
          className={styles.footer__social_media}
        >
         
          <Flexbox justifyContent="space-between" > 
            {socialLinks}
          </Flexbox>
        </Flexbox>
        <div className={styles.line} />
        <Typography fontSize={12} className={styles.copyright}>
          {copyrigtNotice}
        </Typography>
      </div>

    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  /**
   * Logo component with an image of the CroCoder logo and the link to the homepage.
   * Excluded from this component as it should be handled via the webapp (e.g. optimization of image resources).
   */
  logo: PropTypes.node,


  socialLinks: PropTypes.node,
  copyrigtNotice: PropTypes.string,
};

Footer.defaultProps = {
  copyrigtNotice: "Copyright © Abram j.d.o.o. All rights reserved",
};

export default Footer;
