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
  callToActionPostAJob,
  scrollToSubscribe,
}) => {
  return (
    <Section className={styles.wrapper}>
      <Grid
        justifyItems="start"
        alignItems="start"
        rows="auto auto auto auto"
        columns="auto"
        className={styles.grid}
      >
        <Img
          fadeIn={false}
          className={styles.image}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={'CroCoder Jobs'}
          objectFit="contain"
        />
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
          <Link to="/post-a-job" className={'link--secondary'}>
            {callToActionPostAJob}
          </Link>
        </div>
      </Grid>
    </Section>
  );
};

const HeroWithQuery = ({ scrollToSubscribe }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          hero {
            title
            callToActionSubscribe
            callToActionPostAJob
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
      <Hero scrollToSubscribe={scrollToSubscribe} {...data.homeJson.hero} />
    )}
  />
);

export default HeroWithQuery;
