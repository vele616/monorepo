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
}) => [
  <div style={{ position: 'relative', top: '-100px' }} ref={contactUsRef} />,
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
          <a
            onClick={() => window.sa_event(`${process.env.GATSBY_SCHEDULE_CALL_CONTACT_US_CLICK_SA_EVENT}`)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={`${process.env.GATSBY_CALENDLY_URL}`}
            class="link--primary"
          >
            {scheduleCall}
          </a>
          <a
            onClick={() => window.sa_event(`${process.env.GATSBY_SEND_US_EMAIL_CONTACT_US_CLICK_SA_EVENT}`)}
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
];

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
