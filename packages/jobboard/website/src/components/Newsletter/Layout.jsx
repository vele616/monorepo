/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './layout.module.scss';
import Footer from '../Footer';
import Img from 'gatsby-image/withIEPolyfill';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import CrocNav from '../../images/croc-nav.svg';
import Head from '../Head';
import {
  Typography,
  Button,
  Section,
  Flexbox,
  Navigation,
} from '@crocoder-dev/components';

const NewsletterLayout = ({ isSubscribeSuccess, title, buttonText, image, subtitle, text, titleColor = 'gray_2' }) => {
  return (
    <Section className={styles.section}>
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
            <Typography fontFamily="rubik" className={styles.subtitle} color="gray_6" fontSize={26}>{subtitle}</Typography>
            <Typography fontFamily="rubik" className={styles.text} color="gray_2" fontSize={18}>{text}</Typography>
            { buttonText && <Button className={styles.button}>{buttonText}</Button>}
          </Flexbox>
        </div>
      </Flexbox>
    </Section>
  );
}

const FullLayout = ({
  stickyFooter,
  ...other
}) => (
    <>
      <Head />
      <Navigation Logo={<Link to='/'><CrocNav /></Link>}>
        <Link to="/post-a-job"><Button variant="secondary">Post a job</Button></Link>
      </Navigation>
      <NewsletterLayout {...other} />
      <Footer sticky={stickyFooter} />
    </>
  );

export default FullLayout;
