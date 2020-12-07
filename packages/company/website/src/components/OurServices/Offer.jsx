import React from "react";
import { Typography, Card, Button, Flexbox } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const OffersTitle = ({ children, onClick, className, isActive }) => (
  <Button onClick={onClick} variant="sneaky" className={className}>
    <Typography
      color="gray_2"
      fontFamily="rubik"
      fontSize={30}
      fontWeight={300}
      className={`${isActive && styles.active}`}
    >
      {children}
    </Typography>
  </Button>
);

const lineHeight = { lineHeight: "1.6" };
const bottomMargin = { marginBottom: "15px" };

const OfferCard = ({ title, text, isVisible, isSmall }) => (
  <Card
    narrow
    className={`${styles.card} ${isSmall && styles.small} ${
      isVisible && styles.visible
    }`}
  >
    <Typography
      element="div"
      fontWeight={600}
      style={bottomMargin}
      fontSize={34}
      color="gray_2"
      fontFamily="rubik"
    >
      {title}
    </Typography>
    <Typography fontSize={18} style={lineHeight} color="gray_11">
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
  </Card>
);

const OfferHeadline = ({ isVisible, headline, callToAction }) => (
  <Flexbox
    justifyContent="space-between"
    alignItems="baseline"
    className={`${styles.headline} ${isVisible && styles.visible}`}
  >
    <Typography
      style={lineHeight}
      fontFamily="rubik"
      fontSize={36}
      color="gray_2"
      fontWeight={300}
    >
      <Typography fontWeight={600}>
        <em>Cro</em>Coder{" "}
      </Typography>
      <span dangerouslySetInnerHTML={{ __html: headline }} />
    </Typography>
    {/*  <Button style={buttonStyle}>{callToAction}</Button> */}
  </Flexbox>
);

export { OffersTitle, OfferCard, OfferHeadline };
