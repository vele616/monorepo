import React, { useRef } from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const ContactUs = ({
  title,
  text,
  sendEmail,
  scheduleCall,
  email,
  image,
  contactUsRef,
}) => (
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
        <div ref={contactUsRef} />
        <Flexbox className={styles.callToAction}>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={`${process.env.GATSBY_CALENDLY_URL}`}
            class="link--primary"
          >
            {scheduleCall}
          </a>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={`mailto:${process.env.GATSBY_EMAIL}`}
            class="link--secondary"
          >
            {sendEmail}
          </a>
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

const ContactUsWithQuery = ({ contactUsRef }) => (
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
    render={(data) => (
      <ContactUs contactUsRef={contactUsRef} {...data.homeJson.contactUs} />
    )}
  />
);

export default ContactUsWithQuery;
