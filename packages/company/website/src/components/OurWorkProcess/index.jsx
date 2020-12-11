import React, { useMemo } from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Tabs } from "@crocoder-dev/components";
//import useDevice from "@crocoder-dev/components/src/hooks/useDevice";
import styles from "./index.module.scss";

// max sirina 250px underlina
// resize handler
// ako je manji od 360 onda stavi vert inace horizonlta, smanji malo font ako treba

const OurWorkProcess = ({ title, text, sections, ourWorkProcessRef }) => {
  // const { isMobile } = useDevice({ tablet: styles.limit });
  // const orientation = useMemo(() => isMobile ? 'vertical' : 'horizontal');

  const titles = useMemo(() => {
    return sections.map(({ title }) => (
      <Tabs.Tab className={styles.tabs__tabList__tab} key={title}>
        <Typography
          className={styles.tabs__title}
          fontSize={26}
          fontFamily="rubik"
          element="div"
          fontWeight={400}
        >
          {title}
        </Typography>
      </Tabs.Tab>
    ));
  }, [sections]);

  const panels = useMemo(() => {
    return sections.map(({ title, image, text }) => (
      <Tabs.Panel className={styles.tabs__panelList__panel} key={text}>
        <div>
          <Typography
            className={styles.descriptionTitle}
            fontSize={26}
            fontFamily="rubik"
            color="gray_2"
            element="div"
            fontWeight={700}
          >
            {title}
          </Typography>
          <Typography
            className={styles.description}
            fontSize={18}
            fontFamily="rubik"
            color="gray_11"
            element="div"
          >
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </Typography>
        </div>
        <Img
          className={styles.image}
          fadeIn={false}
          imgStyle={{
            objectFit: "contain",
          }}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={title}
        />
      </Tabs.Panel>
    ));
  }, [sections]);

  return (
    <>
      <div
        key="ref"
        style={{ position: "relative", top: "-100px" }}
        ref={ourWorkProcessRef}
      />
      ,
      <Section key="section" className={styles.section} backgroundColor="white">
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

        <Tabs orientation="horizontal" className={styles.tabs}>
          <Tabs.TabList className={styles.tabs__tabList}>{titles}</Tabs.TabList>
          <Tabs.PanelList className={styles.tabs__panelList}>
            {panels}
          </Tabs.PanelList>
        </Tabs>
      </Section>
    </>
  );
};

const WithQuery = ({ ourWorkProcessRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          ourWorkProcess {
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
      <OurWorkProcess
        ourWorkProcessRef={ourWorkProcessRef}
        {...data.homeJson.ourWorkProcess}
      />
    )}
  />
);

export default WithQuery;
