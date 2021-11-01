import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Grid, Button } from "@crocoder-dev/components";
import Section from "../Layout/Section";
import styles from "./index.module.scss";
import Card from "./Card";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // delayChildren: 0.1,
      // staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const buttonvariants = {
  small: { width: "70%" },
  large: { width: "100%" },
};

const OurClients = ({ title, text, lastCard, cards, scrollToContactUs }) => {
  return (
    <Section as={motion.section} styleChild className={styles.blue}>
      <div className={styles.section}>
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
        <motion.div
          layout
          variants={container}
          initial="show"
          animate="show"
          className={styles.grid}
        >
          {cards.map(({ title, image, text, client, imageAlt }, index) => (
            <Card
              delay={3 * index}
              key={title}
              name={title}
              image={image}
              description={text}
              client={client}
              imageAlt={imageAlt}
            />
          ))}
          <motion.div
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={item}
            className={styles.card}
            key="join-us"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

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
              client
              imageAlt
              image {
                childImageSharp {
                  fixed(width: 140) {
                    ...GatsbyImageSharpFixed
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
