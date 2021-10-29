import React from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import {
  Typography,
  Flexbox,
  Input,
  Textarea,
  Icon,
  Button,
} from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Section from "../Layout/Section";

const waitGrecaptchaReady = () => {
  return new Promise((resolve) => {
    window.grecaptcha.ready(resolve());
  });
};

const executeGrecaptchaAsync = async () => {
  await waitGrecaptchaReady();
  const token = await window.grecaptcha.execute(
    process.env.GATSBY_RECAPTCHA_KEY,
    { action: "submit" }
  );
  return token;
};

const ContactUs = ({ title, text, image, contactUsRef, confirm }) => {
  const [confirmed, setConfirmed] = React.useState(false);

  const handleConfirm = React.useCallback(() => {
    // setTouched(true);
    setConfirmed(!confirmed);
  }, [confirmed]);

  const submit = async () => {
    console.log(await executeGrecaptchaAsync());
  };

  return [
    <div
      key="ref"
      style={{ position: "relative", top: "-100px" }}
      ref={contactUsRef}
    />,
    <div key="contact-us" className={styles.wrapper}>
      <Section as="section" className={styles.section}>
        <Typography
          className={styles.title}
          element="h2"
          fontSize={36}
          fontWeight={700}
          color="gray_2"
        >
          {title}
        </Typography>
        <Typography
          element="p"
          className={styles.p}
          fontSize={18}
          fontWeight={300}
          color="gray_2"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <Flexbox justifyContent="space-between">
          <div className={styles.text}>
            <Flexbox className={styles.form} direction="column">
              <Input
                required
                id="form-full-name"
                className={styles.input}
                label="Full name"
              />
              <Input
                required
                id="form-email"
                className={styles.input}
                label="E-mail"
              />
              <Textarea
                showCharCount
                maxLength={1500}
                fluidHeight
                fluidHeightOptions={{ lineHeight: 18, minRows: 5, maxRows: 7 }}
                required
                id="form-message"
                className={styles.textarea}
                label="Tell us about your project"
              />
              <Flexbox
                alignItems="baseline"
                className={styles.flex}
                onClick={handleConfirm}
              >
                <Icon
                  fontSize={14}
                  color="gray_2"
                  className={styles.icon}
                  icon={confirmed ? "checkbox-checked" : "checkbox-unchecked"}
                />
                <Typography fontSize={16} color="gray_2">
                  {confirm}
                </Typography>
              </Flexbox>
              <Button onClick={submit} className={styles.button}>
                Submit
              </Button>
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">
                Privacy Policy
              </a>{" "}
              and
              <a href="https://policies.google.com/terms">
                Terms of Service
              </a>{" "}
              apply.
            </Flexbox>
          </div>

          <Img
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={""}
            className={styles.image}
            imgStyle={{
              objectFit: "contain",
            }}
          />
        </Flexbox>
      </Section>
    </div>,
  ];
};

const ContactUsWithQuery = ({ contactUsRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          contactUs {
            title
            text
            confirm
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
