import React, { useCallback, useState } from "react";
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

const validateFullName = (fullName) => {
  if (typeof fullName !== 'string' || !fullName) { 
    return 'Hey, you forgot to enter your name.'; 
  }
  if (fullName.length < 3) {
    return 'Your name should be at least 3 characters long.';
  }
  return null;
}

const validateEmail = (email) => {
  if (typeof email !== 'string' || !email) { 
    return 'Hey, you forgot to enter your email.'; 
  }
  if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email) === false) {
    return 'Looks like this email is not valid.';
  }
  return null;
}

const validateAboutProject = (aboutProject) => {
  if (typeof aboutProject !== 'string' || !aboutProject) { 
    return 'Looks like you forgot to write about your project.'; 
  }
  return null;
}

const ContactUs = ({ title, text, image, contactUsRef, confirm }) => {
  const [confirmed, setConfirmed] = React.useState(false);

  const handleConfirm = React.useCallback(() => {
    // setTouched(true);
    setConfirmed(!confirmed);
  }, [confirmed]);

  const [fullName, setFullName] = useState(null);
  const [fullNameError, setFullNameError] = useState(null);
  
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const [aboutProject, setAboutProject] = useState(null);
  const [aboutProjectError, setAboutProjectError] = useState(null);
  
  const handleOnFullNameChange = useCallback((event) => {
    setFullName(event.target.value);
  }, []);
  
  const handleOnEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleOnAboutProjectChange = useCallback((event) => {
    setAboutProject(event.target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    executeGrecaptchaAsync()
      .then((a) => console.log(a)) // ovo vraca token
      // zacrveni consent ako ga user nije prihvatio

    const errorMessageFullName = validateFullName(fullName);
    setFullNameError(errorMessageFullName);

    const errorMessageEmail = validateEmail(email);
    setEmailError(errorMessageEmail);

    const errorMessageAboutProject = validateAboutProject(aboutProject);
    setAboutProjectError(errorMessageAboutProject);

  }, [fullName, email, aboutProject]);

  return [
    <div
      key="ref"
      style={{ position: "relative", top: "-100px" }}
      ref={contactUsRef}
    />,
    <Section as="section" className={styles.wrapper} styleChild>
      <div key="contact-us" className={styles.section}>
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
                maxLength={100}
                onChange={handleOnFullNameChange}
                error={fullNameError}
                errorMessage={fullNameError}
              />
              <Input
                required
                id="form-email"
                className={styles.input}
                label="E-mail"
                maxLength={100}
                onChange={handleOnEmailChange}
                error={emailError}
                errorMessage={emailError}
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
                onChange={handleOnAboutProjectChange}
                error={aboutProjectError}
                errorMessage={aboutProjectError}
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
              <Button onClick={handleOnSubmit} className={styles.button}>
                Submit
              </Button>
              <div className={styles.captcha}>
                <span>
                  {` This site is protected by reCAPTCHA and the Google `}
                  <a href="https://policies.google.com/privacy">Privacy Policy</a>
                  {` and `}
                  <a href="https://policies.google.com/terms">Terms of Service</a>
                  {` apply. `}
                </span>
              </div>
            </Flexbox>
          </div>

          <Img
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={"Crocoder Contact Us"}
            className={styles.image}
            imgStyle={{
              objectFit: "contain",
            }}
          />
        </Flexbox>
      </div>
    </Section>,
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
