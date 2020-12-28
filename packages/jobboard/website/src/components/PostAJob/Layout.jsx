/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './layout.module.scss';
import Footer from '../Footer';
import Img from 'gatsby-image/withIEPolyfill';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import CrocNav from '../../images/croc-nav-xmas.svg';
import Head from '../Head';
import {
  Typography,
  Button,
  Section,
  Flexbox,
  Navigation,
} from '@crocoder-dev/components';

const PostAJobLayout = ({
  title,
  buttonTextRight,
  buttonTextLeft,
  image,
  subtitle,
  text,
  urlToPR,
}) => {
  return (
    <Section className={styles.section}>
      <Flexbox className={styles.flex}>
        <div className={styles.rightContainer}>
          <Img
            fadeIn={false}
            className={styles.image}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={'CroCoder Jobs'}
          />
        </div>
        <div className={styles.leftContainer}>
          <Flexbox direction="column" className={styles.float}>
            <Typography
              fontFamily="rubik"
              className={styles.title}
              color="green_4"
              fontWeight={700}
              fontSize={50}
            >
              {title}
            </Typography>
            <Typography
              fontFamily="roboto"
              className={styles.subtitle}
              color="gray_2"
              fontSize={18}
            >
              <span dangerouslySetInnerHTML={{ __html: subtitle }}></span>
            </Typography>
            <Typography
              fontFamily="roboto"
              className={styles.text}
              color="gray_2"
              fontSize={18}
            >
              <span dangerouslySetInnerHTML={{ __html: text }}></span>
            </Typography>
            <Flexbox className={styles.buttonContainer}>
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={`mailto:${process.env.GATSBY_EMAIL}`}
                className={`link--primary ${styles.button}`}
                style={{ textAlign: 'center' }}
              >
                {buttonTextRight}
              </a>
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={urlToPR}
                className={`link--secondary ${styles.button}`}
                style={{ textAlign: 'center' }}
              >
                {buttonTextLeft}
              </a>
            </Flexbox>
          </Flexbox>
        </div>
      </Flexbox>
    </Section>
  );
};

const FullLayout = ({ stickyFooter, ...other }) => (
  <>
    <Head />
    <Navigation
      Logo={
        <Link to="/">
          <CrocNav />
        </Link>
      }
    >
      <Link to="/post-a-job">
        <Button variant="secondary">Post a job</Button>
      </Link>
    </Navigation>
    <PostAJobLayout {...other} />
    <Footer sticky={stickyFooter} />
  </>
);

export default FullLayout;
