import React, { useState } from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import { useMemo } from "react";
import { useCallback } from "react";

const SectionTitle = ({ index, title, onClick, selected }) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick(index);
  }, [onClick, index]);

  return (
    <Button
      variant="sneaky"
      className={`${styles.sectionTitle} ${selected && styles.selected}`}
      onClick={handleOnClick}
    >
      <Typography
        fontSize={26}
        fontFamily="rubik"
        color="gray_11"
        element="div"
        textAlign="center"
      >
        <span className={styles.underline}>{title}</span>
      </Typography>
    </Button>
  );
};

const SectionImage = ({ index, image, title, text, onClick }) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick(index);
  }, [onClick, index]);

  return (
    <>
      <Button variant="sneaky" className={styles.image} onClick={handleOnClick}>
        <Img
          className={styles.image}
          fadeIn={false}
          imgStyle={{
            objectFit: "contain",
          }}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={title}
        />
      </Button>

      <div className={styles.hidden}>
        <Typography
          className={styles.subtitle}
          fontSize={26}
          fontWeight={700}
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
  );
};

const HowWeWork = ({ title, text, sections, howWeWorkRef }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionText = useMemo(() => {
    return sections[selectedIndex] ? sections[selectedIndex].text : "";
  }, [selectedIndex]);

  const images = useMemo(() => {
    return sections.map(({ title, image, text }, index) => (
      <SectionImage
        onClick={setSelectedIndex}
        key={title}
        title={title}
        image={image}
        text={text}
        index={index}
      />
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
    <div style={{ position: 'relative', top: '-100px' }} ref={howWeWorkRef} />,
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
          className={styles.description}
          fontSize={18}
          fontFamily="rubik"
          color="gray_11"
          element="div"
        >
          <div
            key={sectionText}
            dangerouslySetInnerHTML={{ __html: sectionText }}
          />
        </Typography>
      </div>
    </Section>
  ];
};

const WithQuery = ({ howWeWorkRef }) => (
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
    render={(data) => (
      <HowWeWork howWeWorkRef={howWeWorkRef} {...data.homeJson.howWeWork} />
    )}
  />
);

export default WithQuery;
