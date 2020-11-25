import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const Hero = ({
  title,
  paragraph,
  subtitle,
  scheduleCall,
  howWeWork,
  scrollToContactUs,
  scrollToHowWeWork,
}) => (
  <Section className={styles.section} backgroundColor="white">
    <Typography
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
      <div dangerouslySetInnerHTML={{ __html: paragraph }} />
    </Typography>
    <Flexbox className={styles.callToAction}>
      <Button onClick={scrollToContactUs}>{scheduleCall}</Button>
      <Button onClick={scrollToHowWeWork} variant="secondary">
        {howWeWork}
      </Button>
    </Flexbox>
  </Section>
);

const HeroWithQuery = ({ scrollToContactUs, scrollToHowWeWork }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          hero {
            title
            subtitle
            paragraph
            howWeWork
            scheduleCall
          }
        }
      }
    `}
    render={(data) => (
      <Hero
        scrollToContactUs={scrollToContactUs}
        scrollToHowWeWork={scrollToHowWeWork}
        {...data.homeJson.hero}
      />
    )}
  />
);

export default HeroWithQuery;
