import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const WhatCanWeDo = ({ title1, text1, title2, text2, image1, image2 }) => (
  <Section className={styles.section} backgroundColor="background_base">
    <Flexbox alignItems="center" className={styles.flex}>
      <Img
        className={styles.image}
        fadeIn={false}
        fluid={image1 ? image1.childImageSharp.fluid : {}}
        alt={"abc"}
      />
      <Typography
        className={styles.first}
        element="h3"
        fontSize={26}
        fontWeight="700"
        color="gray_2"
      >
        {title1}
        <Typography
          className={styles.paragraph}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div dangerouslySetInnerHTML={{ __html: text1 }} />
        </Typography>
      </Typography>
    </Flexbox>
    <Flexbox alignItems="center" className={styles.flex}>
      <Typography
        className={styles.second}
        element="h3"
        fontSize={26}
        fontWeight="700"
        color="gray_2"
      >
        {title2}
        <Typography
          className={styles.paragraph}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div dangerouslySetInnerHTML={{ __html: text2 }} />
        </Typography>
      </Typography>

      <Img
        fadeIn={false}
        className={styles.image}
        fluid={image2 ? image2.childImageSharp.fluid : {}}
        alt={"abc"}
      />
    </Flexbox>
  </Section>
);

const WithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          whatCanWeDo {
            title1
            text1
            title2
            text2
            image1 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image2 {
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
    render={(data) => <WhatCanWeDo {...data.homeJson.whatCanWeDo} />}
  />
);

export default WithQuery;
