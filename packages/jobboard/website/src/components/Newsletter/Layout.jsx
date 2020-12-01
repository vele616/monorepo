/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './layout.module.scss';
import Footer from '../Footer';
import Img from 'gatsby-image/withIEPolyfill';
import {
  Typography,
  Button,
  Flexbox,
} from '@crocoder-dev/components';

const NewsletterLayout = ({ isSubscribeSuccess, title, buttonText, image, subtitle, text, titleColor = "gray_2"}) => {
  return (
    <>
    <Flexbox className={styles.flex}>
      <div className={styles.rightContainer} >
      <Img
          fadeIn={false}
          className={isSubscribeSuccess ? styles.imageSuccessSubscribe : styles.image}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={'CroCoder Jobs'}
        />
      </div>
      <div className={styles.leftContainer}>
        <Flexbox direction="column" className={styles.float}>
          <Typography fontFamily="rubik" className={styles.title} color={titleColor} fontSize={65}>{title}</Typography>
          <Typography fontFamily="rubik" className={styles.subtitle}color="gray_6" fontSize={26}>{subtitle}</Typography>
          <Typography fontFamily="rubik" className={styles.text} color="gray_2" fontSize={18}>{text}</Typography>
          <Button className={styles.button}>{buttonText}</Button>
        </Flexbox>
      </div>
    </Flexbox>
    <Footer sticky />
    </>
  );
}

export default NewsletterLayout;
