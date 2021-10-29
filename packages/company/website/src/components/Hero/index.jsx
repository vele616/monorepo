import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Section from "../Layout/Section";
import Img from "gatsby-image";

const Hero = ({ title, text, action, image, scrollToContactUs, topRef }) => (
  <Section as="header" className={styles.section} backgroundColor="white">
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

    {/*<Typography
      className={styles.title}
      element="h1"
      fontSize={50}
      fontWeight={700}
      color="gray_2"
    >
      {title}
    </Typography>
    <Typography
      className={styles.subtitle}
      element="h2"
      fontSize={30}
      fontWeight={300}
      color="gray_2"
    >
      {subtitle}
    </Typography>
    <Typography
      className={styles.paragraph}
      fontSize={26}
      fontFamily="rubik"
      color="gray_11"
    >
      <div ref={topRef} dangerouslySetInnerHTML={{ __html: paragraph }} />
    </Typography>
    <Flexbox className={styles.callToAction}>
      <Button
        onClick={() => {
          window.sa_event(
            `${process.env.GATSBY_SCHEDULE_CALL_HERO_CLICK_SA_EVENT}`
          );
          scrollToContactUs();
        }}
      >
        {scheduleCall}
      </Button>
      <Button
        onClick={() => {
          window.sa_event(
            `${process.env.GATSBY_HOW_WE_WORK_HERO_CLICK_SA_EVENT}`
          );
          scrollToHowWeWork();
        }}
        variant="secondary"
      >
        {howWeWork}
      </Button>
      </Flexbox>*/}
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
