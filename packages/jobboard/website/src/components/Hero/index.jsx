import React from 'react';
import styled from "styled-components";
import { StaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image/withIEPolyfill";
import { Grid, Typography, Button, Section, Card } from '@crocoder-dev/components';
import styles from './index.module.scss';

const Wrapper = styled.div`
  max-width: 1600px;
 
`;

const Hero = ({ image, title, titleEmphasis }) => {

  return (
    <Section className={styles.wrapper}>
      <Grid
        justifyItems="center"
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
        <Typography fontSize={18} color="gray_6" className={styles.typography} >
          {title} <b> {titleEmphasis} </b>
        </Typography>
        <Button className={styles.button} variant="secondary">Post a job</Button>
      </Grid>
    </Section>
  )
};

const HeroWithQuery = () => (
  <StaticQuery
    query={graphql`
    query {
      homeJson {
        hero {
          title
          titleEmphasis
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={data => (<Hero {...data.homeJson.hero} />)}
  />
);

export default HeroWithQuery;