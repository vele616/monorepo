import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Grid } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import { OffersTitle, OfferCard, OfferHeadline } from "./Offer";

const OurServices = ({ title, startups, business }) => {
  const [visibleBusiness, setVisibleBusiness] = useState(false);

  const showStartup = React.useCallback(() => setVisibleBusiness(false), []);
  const showBusiness = React.useCallback(() => setVisibleBusiness(true), []);

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
        <OffersTitle
          onClick={showStartup}
          className={styles.startupTitle}
          isActive={!visibleBusiness}
        >
          {startups.title}
        </OffersTitle>

        {startups.offer.map((offer) => (
          <OfferCard
            {...offer}
            key={offer.title}
            isVisible={!visibleBusiness}
            isSmall={startups.offer.length > 1}
          />
        ))}
        <OfferHeadline
          callToAction={startups.callToAction}
          headline={startups.headline}
          isVisible={!visibleBusiness}
        />
        <OffersTitle
          onClick={showBusiness}
          className={styles.businessTitle}
          isActive={visibleBusiness}
        >
          {business.title}
        </OffersTitle>
        {business.offer.map((offer) => (
          <OfferCard
            {...offer}
            key={offer.title}
            isVisible={visibleBusiness}
            isSmall={business.offer.length > 1}
          />
        ))}
        <OfferHeadline
          callToAction={business.callToAction}
          headline={business.headline}
          isVisible={visibleBusiness}
        />
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
