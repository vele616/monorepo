import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Grid, Button } from "@crocoder-dev/components";
import Section from "../Layout/Section";
import styles from "./index.module.scss";
import Card from "./Card";
import Img from "gatsby-image";

const OurClients = ({ title, text, lastCard, cards, scrollToContactUs }) => (
  <div className={styles.blue}>
    <Section as="section" className={styles.section}>
      <Typography
        className={styles.title}
        element="h2"
        fontSize={36}
        fontWeight={700}
        color="gray_2"
      >
        {title}
      </Typography>
      <Typography
        className={styles.text}
        element="p"
        fontSize={18}
        fontWeight={300}
        color="gray_2"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <Grid className={styles.grid}>
        {cards.map(({ title, image, text }) => (
          <Card key={title} name={title} image={image} description={text} />
        ))}
        <div className={styles.card}>
          <Typography
            color="gray_2"
            as="div"
            fontSize={26}
            fontWeight={100}
            className={styles.join}
          >
            {lastCard.text}
          </Typography>
          <Button
            className={styles.button}
            onClick={() => {
              scrollToContactUs && scrollToContactUs();
            }}
            variant="primary"
          >
            {lastCard.action}
          </Button>
        </div>
      </Grid>
    </Section>
  </div>
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
