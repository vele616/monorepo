/* eslint-disable react/prop-types */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import {
  Grid,
  Typography,
  Section,
  Flexbox,
  Button,
} from '@crocoder-dev/components';
import styles from './index.module.scss';
import { Link } from 'gatsby';

const Hero = ({
  image,
  title,
  callToActionSubscribe,
  callToActionSearch,
  scrollToSubscribe,
  topRef,
}) => {
  return (
    <Section className={styles.wrapper}>
      <div ref={topRef} />
      <Grid
        justifyItems="start"
        alignItems="start"
        rows="auto auto auto auto"
        columns="auto"
        className={styles.grid}
      >
        <h1 className={styles.title}>
          Cro
          <span className={styles.coder}>Coder</span> Jobs
        </h1>
        <Typography
          fontWeight={700}
          fontSize={50}
          color="gray_2"
          className={styles.typography}
        >
          {title}
        </Typography>
        <div className={styles.buttons}>
          <Button onClick={scrollToSubscribe} className={'link--primary'}>
            {callToActionSubscribe}
          </Button>
          <Link to="/search/" className={'link--secondary'}>
            {callToActionSearch}
          </Link>
        </div>
      </Grid>
    </Section>
  );
};

const HeroWithQuery = ({ scrollToSubscribe, topRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          hero {
            title
            callToActionSubscribe
            callToActionSearch
            image {
              childImageSharp {
                fluid(maxWidth: 1800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <Hero
        scrollToSubscribe={scrollToSubscribe}
        topRef={topRef}
        {...data.homeJson.hero}
      />
    )}
  />
);

export default HeroWithQuery;
