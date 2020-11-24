import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import {
  Typography,
  Section,
  Card,
  Grid,
  Button,
  Flexbox,
} from "@crocoder-dev/components";
import styles from "./index.module.scss";

const OurServices = ({ title, startups, business }) => {
  const [visibleBusiness, setVisibleBusiness] = useState(false);

  return (
    <Section
      removeMobilePadding
      key="initial"
      className={styles.section}
      backgroundColor="background_base"
    >
      <Typography
        className={styles.title}
        element="h1"
        fontSize={50}
        fontWeight={700}
        color="gray_2"
      >
        {title}
      </Typography>
      <Grid
        alignItems="start"
        className={styles.grid}
        justifyContent="space-between"
      >
        <Button
          onClick={() => setVisibleBusiness(false)}
          variant="sneaky"
          className={styles.startupTitle}
        >
          <Typography
            color="gray_2"
            fontFamily="rubik"
            fontSize={30}
            fontWeight={300}
            className={`${!visibleBusiness && styles.active}`}
          >
            {startups.title}
          </Typography>
        </Button>
        {startups.offer.map((offer) => (
          <Card
            narrow
            key={offer.title}
            className={`${styles.card} ${
              startups.offer.length > 1 && styles.small
            } ${!visibleBusiness && styles.visible}`}
          >
            <Typography
              element="div"
              fontWeight={600}
              style={{ marginBottom: "15px" }}
              fontSize={34}
              color="gray_2"
              fontFamily="rubik"
            >
              {offer.title}
            </Typography>
            <Typography
              fontSize={18}
              style={{ lineHeight: "1.6" }}
              color="gray_11"
            >
              <div dangerouslySetInnerHTML={{ __html: offer.text }} />
            </Typography>
          </Card>
        ))}
        <Flexbox
          justifyContent="space-between"
          alignItems="center"
          className={`${styles.headline} ${!visibleBusiness && styles.visible}`}
        >
          <Typography
            style={{ lineHeight: "1.6" }}
            fontFamily="rubik"
            fontSize={36}
            fontWeight={300}
          >
            <Typography fontWeight={600}>
              <em>Cro</em>Coder{" "}
            </Typography>
            <span dangerouslySetInnerHTML={{ __html: startups.headline }} />
          </Typography>
          <Button
            style={{
              marginLeft: "10px",
              width: "200px",
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            {startups.callToAction}
          </Button>
        </Flexbox>
        <Button
          onClick={() => setVisibleBusiness(true)}
          variant="sneaky"
          className={styles.businessTitle}
        >
          <Typography
            color="gray_2"
            fontFamily="rubik"
            fontSize={30}
            fontWeight={300}
            className={`${visibleBusiness && styles.active}`}
          >
            {business.title}
          </Typography>
        </Button>
        {business.offer.map((offer) => (
          <Card
            narrow
            key={offer.title}
            className={`${styles.card} ${
              business.offer.length > 1 && styles.small
            } ${visibleBusiness && styles.visible}`}
          >
            <Typography
              element="div"
              style={{ marginBottom: "15px" }}
              fontSize={34}
              color="gray_2"
              fontFamily="rubik"
            >
              {offer.title}
            </Typography>
            <Typography
              fontSize={18}
              style={{ lineHeight: "1.6" }}
              color="gray_11"
            >
              <div dangerouslySetInnerHTML={{ __html: offer.text }} />
            </Typography>
          </Card>
        ))}
        <Flexbox
          justifyContent="space-between"
          alignItems="center"
          className={`${styles.headline} ${visibleBusiness && styles.visible}`}
        >
          <Typography
            style={{ lineHeight: "1.6" }}
            color="gray_2"
            fontFamily="rubik"
            fontSize={36}
            fontWeight={300}
          >
            <Typography fontWeight={600}>
              <em>Cro</em>Coder{" "}
            </Typography>
            <span dangerouslySetInnerHTML={{ __html: business.headline }} />
          </Typography>
          <Button
            style={{
              marginLeft: "10px",
              width: "200px",
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            {business.callToAction}
          </Button>
        </Flexbox>
      </Grid>
    </Section>
  );
};

const WithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          ourServices {
            title
            startups {
              title
              headline
              callToAction
              offer {
                title
                text
              }
            }
            business {
              title
              headline
              callToAction
              offer {
                title
                text
              }
            }
          }
        }
      }
    `}
    render={(data) => <OurServices {...data.homeJson.ourServices} />}
  />
);

export default WithQuery;
