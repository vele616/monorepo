import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Flexbox, Card } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Section from "../Layout/Section";
import { useMemo } from "react";

const HowWeWork = ({ title, content }) => (
  <Section as="section" className={styles.section}>
    <Typography
      className={styles.title}
      element="h2"
      fontSize={36}
      fontWeight={700}
      textAlign="center"
      color="gray_2"
    >
      {title}
    </Typography>
    <div>
      {content.map((sectionContent) => (
        <Flexbox key={sectionContent.title} className={styles.flex}>
          <div className={styles.flex__text}>
            <Typography
              color="gray_2"
              element="h3"
              fontSize={26}
              fontWeight={600}
              className={styles.flex__name}
            >
              {sectionContent.title}
            </Typography>
            <Typography
              element="p"
              color="gray_2"
              fontSize={24}
              className={styles.flex__description}
              dangerouslySetInnerHTML={{ __html: sectionContent.text }}
            />
          </div>
          <Img
            fadeIn={false}
            fluid={
              sectionContent.image
                ? sectionContent.image.childImageSharp.fluid
                : {}
            }
            alt={sectionContent.imageAlt}
            className={styles.flex__image}
          />
        </Flexbox>
      ))}
    </div>
  </Section>
);

const HowWeWorkWithQuery = ({ howWeWorkRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          howWeWork {
            title
            content {
              title
              text
              imageAlt
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
      }
    `}
    render={(data) => <HowWeWork {...data.homeJson.howWeWork} />}
  />
);

export default HowWeWorkWithQuery;
