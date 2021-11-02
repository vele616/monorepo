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

const validateFullName = (fullName, form) => {
  if (typeof fullName !== "string" || !fullName) {
    return form.fullname.requiredField;
  }
  if (fullName.length < 3) {
    return form.fullname.minimalLength;
  }
  return null;
};

const validateEmail = (email, form) => {
  if (typeof email !== "string" || !email) {
    return form.email.requiredField;
  }
  if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email) === false) {
    return form.email.invalidEmail;
  }
  return null;
};

const validateAboutProject = (aboutProject, form) => {
  if (typeof aboutProject !== "string" || !aboutProject) {
    return form.projectInfo.requiredField;
  }
  return null;
};

const ContactUs = ({
  form,
  title,
  description,
  image,
  contactUsRef,
  consent,
  imageAlt,
}) => {
  const [confirmed, setConfirmed] = React.useState(false);
  const [confirmedError, setConfirmedError] = React.useState(false);

  const [triedToSubmit, setTriedToSubmit] = React.useState(false);

  const [fullName, setFullName] = useState(null);
  const [fullNameError, setFullNameError] = useState(null);

  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const [aboutProject, setAboutProject] = useState(null);
  const [aboutProjectError, setAboutProjectError] = useState(null);

  const handleConfirm = React.useCallback(() => {
    setConfirmed(!confirmed);
    if (triedToSubmit) {
      setConfirmedError(!confirmed === false);
    }
  }, [triedToSubmit, confirmed]);

  const handleOnFullNameChange = useCallback(
    (event) => {
      setFullName(event.target.value);
      if (triedToSubmit) {
        const errorMessageFullName = validateFullName(event.target.value, form);
        setFullNameError(errorMessageFullName);
      }
    },
    [triedToSubmit]
  );

  const handleOnEmailChange = useCallback(
    (event) => {
      setEmail(event.target.value);
      if (triedToSubmit) {
        const errorMessageEmail = validateEmail(event.target.value, form);
        setEmailError(errorMessageEmail);
      }
    },
    [triedToSubmit]
  );

  const handleOnAboutProjectChange = useCallback(
    (event) => {
      setAboutProject(event.target.value);
      if (triedToSubmit) {
        const errorMessageAboutProject = validateAboutProject(
          event.target.value,
          form
        );
        setAboutProjectError(errorMessageAboutProject);
      }
    },
    [triedToSubmit]
  );

  const handleOnSubmit = useCallback(() => {
    setTriedToSubmit(true);

    const errorMessageFullName = validateFullName(fullName, form);
    setFullNameError(errorMessageFullName);

    const errorMessageEmail = validateEmail(email, form);
    setEmailError(errorMessageEmail);

    const errorMessageAboutProject = validateAboutProject(aboutProject, form);
    setAboutProjectError(errorMessageAboutProject);

    setConfirmedError(!confirmed);

    if (
      errorMessageAboutProject === null &&
      errorMessageEmail === null &&
      errorMessageAboutProject === null
    ) {
      executeGrecaptchaAsync()
        .then((token) => {
          fetch(process.env.GATSBY_API_URL, {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              token,
              message: aboutProject,
              name: fullName,
            }),
          })
            .then(() => {
              console.log("give user feedback");
            })
            .catch((ex) => {
              console.log("desjo se error");
            });
        })
        .catch((ex) => {
          console.log("desjo se error");
        });
    }
  }, [fullName, email, aboutProject, form, confirmed]);

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
          className={styles.p}
          color="gray_2"
          dangerouslySetInnerHTML={{ __html: description }}
          element="p"
          fontSize={18}
          fontWeight={300}
        />
        <Flexbox justifyContent="center">
          <div className={styles.text}>
            <Flexbox className={styles.form} direction="column">
              <Input
                className={styles.input}
                error={fullNameError !== null}
                errorMessage={fullNameError}
                id="form-full-name"
                label={form.fullname.label}
                maxLength={100}
                onChange={handleOnFullNameChange}
                required
              />
              <Input
                className={styles.input}
                error={emailError !== null}
                errorMessage={emailError}
                id="form-email"
                label={form.email.label}
                maxLength={100}
                onChange={handleOnEmailChange}
                required
              />
              <Textarea
                className={styles.textarea}
                error={aboutProjectError !== null}
                errorMessage={aboutProjectError}
                fluidHeight
                fluidHeightOptions={{ lineHeight: 18, minRows: 5, maxRows: 7 }}
                id="form-message"
                label={form.projectInfo.label}
                maxLength={1500}
                onChange={handleOnAboutProjectChange}
                required
                showCharCount
              />
              <Flexbox
                alignItems="center"
                className={styles.flex}
                onClick={handleConfirm}
              >
                <Icon
                  fontSize={26}
                  color={confirmedError ? "negative" : "gray_2"}
                  className={styles.icon}
                  icon={confirmed ? "checkbox-checked" : "checkbox-unchecked"}
                  aria-labelledby="contact-us-consent-text"
                />
                <Typography
                  dangerouslySetInnerHTML={{ __html: consent }}
                  id="contact-us-consent-text"
                  fontSize={18}
                  color={confirmedError ? "negative" : "gray_2"}
                />
              </Flexbox>
              <Button onClick={handleOnSubmit} className={styles.button}>
                {form.submit}
              </Button>
              <Typography
                fontSize={14}
                className={styles.captcha}
                dangerouslySetInnerHTML={{ __html: form.captcha }}
              />
            </Flexbox>
          </div>

          <Img
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={imageAlt}
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
        contactJson {
          form {
            fullname {
              label
              requiredField
              minimalLength
            }
            email {
              label
              requiredField
              invalidEmail
            }
            projectInfo {
              label
              requiredField
            }
            submit
            captcha
          }
          title
          description
          consent
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
        }
      }
    `}
    render={(data) => (
      <ContactUs contactUsRef={contactUsRef} {...data.contactJson} />
    )}
  />
);

export default ContactUsWithQuery;
