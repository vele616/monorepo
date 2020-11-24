import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const ContactUs = ({ title, text, sendEmail, scheduleCall, email, image }) => (
  <Section className={styles.section} backgroundColor="white">
    <Flexbox
      className={styles.flex}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        className={styles.title}
        element="h3"
        fontSize={26}
        fontWeight={700}
        color="gray_2"
      >
        {title}
        <br />
        <Typography
          className={styles.text}
          fontSize={18}
          fontWeight={300}
          element="div"
          color="gray_2"
        >
          {text}
        </Typography>
        <Flexbox className={styles.callToAction}>
          <a href="#ContacUs">{scheduleCall}</a>
          <Button variant="secondary">{sendEmail}</Button>
        </Flexbox>
      </Typography>
      <Img
        className={styles.image}
        fadeIn={false}
        fluid={image ? image.childImageSharp.fluid : {}}
        alt={"abc"}
      />
    </Flexbox>
  </Section>
);

const ContactUsWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          contactUs {
            title
            text
            scheduleCall
            sendEmail
            email
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
    `}
    render={(data) => <ContactUs id="ContactUs" {...data.homeJson.contactUs} />}
  />
);

export default ContactUsWithQuery;
