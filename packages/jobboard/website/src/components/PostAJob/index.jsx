/* eslint-disable react/prop-types */
import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Section, Flexbox } from '@crocoder-dev/components';
import { useMemo } from 'react';
import styles from './index.module.scss';

const PostAJob = ({ title, subtitle, contactUs, email, companies }) => {
  const companyLogos = useMemo(() => {
    return companies.map(({ logo, name }) => {
      return (
        <Img
          fadeIn={false}
          key={name}
          className={`${styles.logo} ${styles[name.toLowerCase()]}`}
          imgStyle={{
            objectFit: 'contain',
          }}
          fluid={logo ? logo.childImageSharp.fluid : {}}
          alt={name}
        />
      );
    });
  }, [companies]);

  return (
    <Section className={styles.wrapper}>
      <Flexbox direction="column" alignItems="center">
        <Typography
          fontSize={34}
          element="div"
          className={styles.title}
          color="gray_2"
          fontWeight={300}
          fontFamily="rubik"
        >
          {title}
        </Typography>

        <div className={styles.companyLogos}>
          {companyLogos}
          <Typography
            textAlign="center"
            fontSize={26}
            color="gray_2"
            component="div"
            className={styles.andMore}
            fontWeight={300}
            fontFamily="rubik"
          >
            AND MORE...
          </Typography>
        </div>

        <div className={styles.subtitle}>
          <Typography
            fontSize={26}
            element="div"
            color="gray_2"
            fontWeight={300}
            fontFamily="rubik"
          >
            {subtitle}
          </Typography>
          <Typography
            fontSize={26}
            element="div"
            color="gray_2"
            fontWeight={300}
            fontFamily="rubik"
          >
            {contactUs}
            <Typography
              fontSize={26}
              color="green_4"
              fontWeight={900}
              fontFamily="rubik"
            >
              <strong>{email}</strong>
            </Typography>
          </Typography>
        </div>
      </Flexbox>
    </Section>
  );
};

const PostAJobWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          postAJob {
            title
            subtitle
            contactUs
            email
            companies {
              name
              logo {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <PostAJob {...data.homeJson.postAJob} />}
  />
);

export default PostAJobWithQuery;
