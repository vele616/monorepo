import React, { useState } from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import { useMemo } from "react";
import { useCallback } from "react";

const SectionTitle = ({ index, title, onClick, selected }) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick(index);
  }, [onClick, index]);

  return (
    <Typography
      className={`${styles.sectionTitle} ${selected && styles.selected}`}
      fontSize={18}
      fontFamily="rubik"
      color="gray_11"
      element="div"
      textAlign="center"
      onClick={handleOnClick}
    >
      {title}
    </Typography>
  );
};

const HowWeWork = ({ title, text, sections }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionText = useMemo(() => {
    return sections[selectedIndex] ? sections[selectedIndex].text : "";
  }, [selectedIndex]);

  const images = useMemo(() => {
    return sections.map(({ title, image, text }) => (
      <>
        <Img
          className={styles.image}
          fadeIn={false}
          imgStyle={{
            objectFit: "contain",
          }}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={title}
        />
        <div className={styles.hidden}>
          <Typography
            className={styles.subtitle}
            fontSize={18}
            fontFamily="rubik"
            color="gray_11"
            element="div"
            textAlign="center"
          >
            {title}
          </Typography>
          <Typography
            className={styles.paragraph}
            fontSize={18}
            fontFamily="rubik"
            color="gray_11"
            element="div"
          >
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </Typography>
        </div>
      </>
    ));
  }, [sections]);

  const titles = useMemo(() => {
    return sections.map(({ title }, index) => (
      <SectionTitle
        selected={index === selectedIndex}
        index={index}
        title={title}
        onClick={setSelectedIndex}
      />
    ));
  }, [sections, selectedIndex]);

  return [
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
        className={styles.paragraph}
        fontSize={18}
        fontFamily="rubik"
        color="gray_11"
        element="div"
      >
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </Typography>

      <div className={styles.imagesWrapper} justifyContent="space-between">
        {images}
      </div>
      <div className={styles.sectionsWrapper}>
        <Flexbox justifyContent="space-between">{titles}</Flexbox>
        <Typography
          className={styles.paragraph}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div dangerouslySetInnerHTML={{ __html: sectionText }} />
        </Typography>
      </div>
    </Section>,
  ];
};

const WithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          howWeWork {
            title
            text
            sections {
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

export default WithQuery;
