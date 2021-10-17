import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Section, Flexbox } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const ContactUs = ({ title, text, image, contactUsRef }) => [
  <div
    key="ref"
    style={{ position: "relative", top: "-100px" }}
    ref={contactUsRef}
  />,
  <Section key="section" backgroundColor="white">
    <h2>{title}</h2>
    <p>{text}</p>
    <Img
      fadeIn={false}
      fluid={image ? image.childImageSharp.fluid : {}}
      alt={""}
    />
    {/*<Flexbox
      className={styles.flex}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        className={styles.title}
        element="h3"
        fontSize={50}
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
            onClick={() =>
              window.sa_event(
                `${process.env.GATSBY_SCHEDULE_CALL_CONTACT_US_CLICK_SA_EVENT}`
              )
            }
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={`${process.env.GATSBY_CALENDLY_URL}`}
            className="link--primary"
            style={{ textAlign: "center" }}
          >
            {scheduleCall}
          </a>
          <a
            onClick={() =>
              window.sa_event(
                `${process.env.GATSBY_SEND_US_EMAIL_CONTACT_US_CLICK_SA_EVENT}`
              )
            }
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={`mailto:${process.env.GATSBY_EMAIL}`}
            className="link--secondary"
            style={{ textAlign: "center" }}
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
    </Flexbox>*/}
  </Section>,
];

const ContactUsWithQuery = ({ contactUsRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          contactUs {
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
    `}
    render={(data) => (
      <ContactUs contactUsRef={contactUsRef} {...data.homeJson.contactUs} />
    )}
  />
);

export default ContactUsWithQuery;
