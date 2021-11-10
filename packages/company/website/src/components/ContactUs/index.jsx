import React, { useCallback, useRef, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

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

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 30%)"
    strokeLinecap="round"
    {...props}
  />
);

const ContactUs = ({
  form,
  title,
  description,
  image,
  contactUsRef,
  consent,
  imageAlt,
  notification,
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

  const [notificationVisible, setNotificationVisible] = useState(false);

  const successNotification = {
    title: notification.title,
    text: notification.text,
    class: "positive",
  };

  const errorNotification = {
    title: notification.errorTitle,
    text: notification.errorText,
    class: "negative",
  };

  const notificationTimeout = useRef();

  const [notificationText, setNotificationText] = useState(successNotification);

  const handleOnCloseNotification = useCallback(() => {
    setNotificationVisible(false);
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
  }, []);

  const handleConfirm = React.useCallback(() => {
    setConfirmed(!confirmed);
    if (triedToSubmit) {
      setConfirmedError(!confirmed === false);
    }
  }, [triedToSubmit, confirmed]);

  const clearForm = useCallback(() => {
    if (document) {
      const children = [...document.querySelectorAll("input,textarea")];
      children.forEach((child) => (child.value = null));

      setEmail(null);
      setFullName(null);
      setAboutProject(null);
      setConfirmed(false);
    }
  }, []);

  const showNotification = useCallback(
    (error) => {
      if (error) setNotificationText(errorNotification);
      else setNotificationText(successNotification);

      setNotificationVisible(true);

      if (!error) clearForm();

      notificationTimeout.current = setTimeout(() => {
        handleOnCloseNotification();
      }, 10000);
    },
    [
      handleOnCloseNotification,
      successNotification,
      errorNotification,
      clearForm,
    ]
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
      window.sa_event(
        `submit_form_${
          window.location.pathname === "/" ? "landing" : "contact_us"
        }`
      );
      executeGrecaptchaAsync()
        .then((token) => {
          fetch(`${process.env.GATSBY_API_URL}contacts`, {
            method: "POST",
            mode: "cors",
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
            .then((response) => {
              if (!response.ok) {
                showNotification(true);
              } else {
                showNotification();
              }
            })
            .catch((ex) => {
              showNotification(true);
            });
        })
        .catch((ex) => {
          showNotification(true);
        });
    }
  }, [fullName, email, aboutProject, form, confirmed, showNotification]);

  const handleOnFullNameChange = useCallback(
    (event) => {
      setFullName(event.target.value);
      if (triedToSubmit) {
        const errorMessageFullName = validateFullName(event.target.value, form);
        setFullNameError(errorMessageFullName);
      }
    },
    [triedToSubmit, form]
  );

  const handleOnEmailChange = useCallback(
    (event) => {
      setEmail(event.target.value);
      if (triedToSubmit) {
        const errorMessageEmail = validateEmail(event.target.value, form);
        setEmailError(errorMessageEmail);
      }
    },
    [triedToSubmit, form]
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
    [triedToSubmit, form]
  );

  return [
    <div
      key="ref"
      style={{ position: "relative", top: "-100px" }}
      ref={contactUsRef}
    />,
    <ul className={styles.notifications} key="notification">
      <AnimatePresence initial={false}>
        {notificationVisible && (
          <motion.li
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={styles[notificationText.class]}
          >
            <Typography
              element="p"
              fontSize={18}
              fontWeight={700}
              dangerouslySetInnerHTML={{ __html: notificationText.title }}
              color="gray_1"
              className={styles.notifications__title}
            />
            <Button
              variant="sneaky"
              onClick={handleOnCloseNotification}
              className={styles.notifications__button}
            >
              <svg width="23" height="23" viewBox="0 0 23 23">
                <Path d="M 3 16.5 L 17 2.5" />
                <Path d="M 3 2.5 L 17 16.346" />
              </svg>
            </Button>
            <Typography
              color="gray_1"
              element="p"
              fontSize={16}
              fontWeight={400}
              dangerouslySetInnerHTML={{ __html: notificationText.text }}
              className={styles.notifications__content}
            />
          </motion.li>
        )}
      </AnimatePresence>
    </ul>,
    <Section
      key="contact-us"
      as="section"
      className={styles.wrapper}
      styleChild
    >
      <div className={styles.section}>
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
          fontWeight={400}
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
          notification {
            title
            text
            errorTitle
            errorText
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
