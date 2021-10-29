import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Section from "../Layout/Section";
import Img from "gatsby-image";

const Hero = ({ title, text, action, image, scrollToContactUs, topRef }) => (
  <Section as="section" className={styles.section}>
    <Flexbox className={styles.flex} alignItems="center">
      <Img
        fadeIn={false}
        fluid={image ? image.childImageSharp.fluid : {}}
        alt={""}
        className={styles.image}
      />
      <div className={styles.text}>
        <Typography
          className={styles.title}
          element="h1"
          fontSize={34}
          dangerouslySetInnerHTML={{ __html: title }}
          fontWeight={400}
          color="gray_2"
        />
        <Typography
          className={styles.paragraph}
          element="p"
          fontSize={22}
          dangerouslySetInnerHTML={{ __html: text }}
          fontWeight={400}
          color="gray_2"
        />
        <Button
          className={styles.button}
          onClick={() => {
            scrollToContactUs && scrollToContactUs();
          }}
          variant="primary"
        >
          {action}
        </Button>
      </div>
    </Flexbox>
  </Section>
);

const HeroWithQuery = ({ scrollToContactUs, scrollToHowWeWork, topRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          hero {
            title
            text
            action
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
    render={(data) => (
      <Hero
        topRef={topRef}
        scrollToContactUs={scrollToContactUs}
        {...data.homeJson.hero}
      />
    )}
  />
);

export default HeroWithQuery;
