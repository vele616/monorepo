import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Section, Card } from '@crocoder-dev/components';
import styles from './index.module.scss';

const Banner = ({ image, title, text, email }) => {
  return (
    <Section className={styles.wrapper} backgroundColor="blue_6">
      <div className={styles.text}>
        <div className={styles.image}>
          <Img
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={
              'We love to hear your thoughts about remote jobs and software development'
            }
          />
        </div>
        <Card className={styles.card} narrow>
          <Typography
            color="gray_6"
            className={styles.upper}
            fontWeight={700}
            fontSize={22}
            element="div"
          >
            {title}
          </Typography>
          <Typography
            color="gray_2"
            fontWeight={300}
            fontSize={26}
            element="div"
          >
            {text}
          </Typography>
          <Typography
            color="green_2"
            fontWeight={700}
            fontSize={26}
            element="div"
          >
            <a href={`mailto:${email}`} className={`${styles.link} link`}>
              {email}
            </a>
          </Typography>
        </Card>
      </div>
    </Section>
  );
};

const BannerWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          banner {
            title
            email
            text
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
    render={(data) => <Banner {...data.homeJson.banner} />}
  />
);

export default BannerWithQuery;
