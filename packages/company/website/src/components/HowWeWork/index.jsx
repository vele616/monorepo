import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Flexbox, Card, Section } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import { useMemo } from "react";

/*const Content = ({ title, text }) => (
  <Flexbox direction="column" className={styles.card__content}>
    <Typography
      className={styles.card__title}
      color="gray_2"
      element="h3"
      fontSize={26}
      fontWeight={700}
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
          key={title}
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
    <div
      key="ref"
      style={{ position: "relative", top: "-100px" }}
      ref={howWeWorkRef}
    />,
    <section key="section" className={styles.section}>
      <Typography
        color="gray_2"
        element="h1"
        fontSize={50}
        fontWeight={700}
        textAlign="center"
        className={styles.title}
      >
        {title}
      </Typography>
      <div className={styles.contentWrapper}>{cards}</div>
    </section>,
  ];
};*/

const HowWeWork = ({ title, content }) => (
  <Section backgroundColor="white">
    <h2>{title}</h2>
    <p>{JSON.stringify(content)}</p>
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
