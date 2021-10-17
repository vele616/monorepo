import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Section } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Img from "gatsby-image";

const OurClients = ({ title, text, lastCard, cards, scrollToContactUs }) => (
  <Section className={styles.section} backgroundColor="white">
    <h2>{title}</h2>
    <p>{text}</p>
    <p>{JSON.stringify(cards)}</p>
    <p>{JSON.stringify(lastCard)}</p>
  </Section>
);

const OurClientsWithQuery = ({ scrollToContactUs }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          ourClients {
            title
            text
            lastCard {
              text
              action
            }
            cards {
              title
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
      }
    `}
    render={(data) => (
      <OurClients
        scrollToContactUs={scrollToContactUs}
        {...data.homeJson.ourClients}
      />
    )}
  />
);

export default OurClientsWithQuery;
