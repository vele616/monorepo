import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox, Card } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import { useMemo } from "react";

const Content = ({ title, text }) => (
  <Flexbox direction="column" className={styles.card__content}>
    <Typography
      className={styles.card__title}
      color="gray_2"
      element="h3"
      fontSize={26}
      fontWeight="700"
    >
      {title}
    </Typography>
    <Typography
      className={styles.paragraph}
      color="gray_11"
      element="div"
      fontFamily="rubik"
      fontSize={18}
    >
      {text}
    </Typography>
  </Flexbox>
);

const HowWeWork = ({ title, content, howWeWorkRef }) => {
  const cards = useMemo(() => {
    return content.map(({ title, text, image }) => {
      const cardImage = (
        <div className={styles.card__image}>
          <Img
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={title}
          />
        </div>
      );

      return (
        <Card
          narrow
          image={cardImage}
          className={styles.card}
          imageAspectRatio="3:2"
        >
          <Content title={title} text={text} />
        </Card>
      );
    });
  }, [content]);

  return [
    <div style={{ position: "relative", top: "-100px" }} ref={howWeWorkRef} />,
    <div className={styles.section} backgroundColor="background_base">
      <Typography
        color="gray_2"
        element="h1"
        fontSize={50}
        fontWeight={700}
        textAlign="center"
      >
        {title}
      </Typography>
      <div className={styles.contentWrapper}>{cards}</div>
    </div>,
  ];
};

const WithQuery = ({ howWeWorkRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          howWeWork {
            title
            content {
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
      <HowWeWork howWeWorkRef={howWeWorkRef} {...data.homeJson.howWeWork} />
    )}
  />
);

export default WithQuery;
