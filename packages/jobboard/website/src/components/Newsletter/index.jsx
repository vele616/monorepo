/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  Typography,
  Grid,
  Input,
  Button,
  Flexbox,
  Icon,
  Section,
} from '@crocoder-dev/components';
import styles from './index.module.scss';

const Newsletter = ({
  title_1,
  title_2,
  subtitle,
  subscribeRef,
  confirm,
  inputLabel,
  submitButtonLabel,
  mailNotValidErrorMessage,
  mailNotConfirmedErrorMessage,
  responseStatusMailAlreadyInDatabaseErrorMessage,
  responseStatusNotOkErrorMessage,
  responseStatusOKText,
  responseStatusOKTitle,
}) => {
  const [text, setText] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState(null);

  const [confirmed, setConfirmed] = React.useState(false);

  const [touched, setTouched] = React.useState(false);

  const [completed, setCompleted] = React.useState(false);

  const [loadingRequest, setLoadingRequest] = React.useState(false);

  const [inputKey, setInputKey] = React.useState('');

  React.useEffect(() => {
    setInputKey(Math.random().toString());
  }, []);

  const getErrorMessage = React.useCallback(() => {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(text) === false) {
      return mailNotValidErrorMessage;
    } else if (confirmed === false) {
      return mailNotConfirmedErrorMessage;
    } else {
      return null;
    }
  }, [text, confirmed, mailNotValidErrorMessage, mailNotConfirmedErrorMessage]);

  React.useEffect(() => {
    if (touched === false) {
      return;
    }
    const errorMessage = getErrorMessage();
    setErrorMessage(errorMessage);
  }, [touched, getErrorMessage]);

  const handleChange = React.useCallback((event) => {
    setTouched(true);
    setText(event.target.value);
  }, []);

  const handleClick = React.useCallback(async () => {
    const errorMessage = getErrorMessage();
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    setLoadingRequest(true);

    const response = await fetch(process.env.GATSBY_NEWSLETTER_SUBSCRIBE_URL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email: text, confirm: confirmed }),
    });

    setLoadingRequest(false);

    if (response.status === 304) {
      setErrorMessage(responseStatusMailAlreadyInDatabaseErrorMessage);
    } else if (response.status !== 200) {
      setErrorMessage(responseStatusNotOkErrorMessage);
    } else {
      setCompleted(true);
    }
  }, [
    text,
    confirmed,
    responseStatusMailAlreadyInDatabaseErrorMessage,
    responseStatusNotOkErrorMessage,
    getErrorMessage,
  ]);

  const handleConfirm = React.useCallback(() => {
    setTouched(true);
    setConfirmed(!confirmed);
  }, [confirmed]);

  return [
    <div
      key="subscribeRef"
      ref={subscribeRef}
      style={{ position: 'relative', top: '-100px' }}
    />,
    <Section key="section" className={styles.section}>
      <Typography
        fontSize={65}
        element="div"
        className={styles.title}
        color="gray_2"
        fontWeight={700}
      >
        {title_1}
        <Typography fontWeight={700} color="green_4">
          CroCoder
        </Typography>
        {title_2}
        <Typography className={styles.subtitle} element="div" fontSize={24}>
          {subtitle}
        </Typography>
      </Typography>
      <Grid
        className={
          completed ? styles.feedback : `${styles.feedback} ${styles.hide} `
        }
        columns="auto"
        rows="auto auto"
        columnGap="45px"
      >
        <Typography fontSize={26} fontWeight={700} color="gray_2">
          {responseStatusOKTitle}
        </Typography>
        <Typography fontSize={18} color="gray_2">
          {responseStatusOKText}
        </Typography>
      </Grid>
      <Grid
        className={completed ? `${styles.grid} ${styles.hide}` : styles.grid}
        columnGap="60px"
      >
        <Input
          required
          label={inputLabel}
          key={inputKey}
          className={styles.input}
          onChange={handleChange}
          errorMessage={errorMessage}
          error={errorMessage !== null}
        />
        <Button
          className={styles.button}
          onClick={handleClick}
          disabled={errorMessage !== null}
        >
          <span
            className={`${styles.button__text} ${
              loadingRequest && styles.button__loading
            }`}
          >
            {submitButtonLabel}
          </span>
          <Icon
            className={`${styles.loaderIcon} ${
              loadingRequest && styles.loading
            }`}
            icon="spinner8"
          />
        </Button>
        <Flexbox
          alignItems="baseline"
          className={styles.flex}
          onClick={handleConfirm}
        >
          <Icon
            fontSize={14}
            color="gray_2"
            className={styles.icon}
            icon={confirmed ? 'checkbox-checked' : 'checkbox-unchecked'}
          />
          <Typography fontSize={16} color="gray_2">
            {confirm}
          </Typography>
        </Flexbox>
      </Grid>
    </Section>,
  ];
};

const NewsletterWithQuery = ({ subscribeRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          newsletter {
            confirm
            inputLabel
            submitButtonLabel
            subtitle
            title_1
            title_2
            mailNotValidErrorMessage
            mailNotConfirmedErrorMessage
            responseStatusMailAlreadyInDatabaseErrorMessage
            responseStatusNotOkErrorMessage
            responseStatusOKText
            responseStatusOKTitle
          }
        }
      }
    `}
    render={(data) => (
      <Newsletter
        subscribeRef={subscribeRef}
        data={data}
        {...data.homeJson.newsletter}
      />
    )}
  />
);

export default NewsletterWithQuery;
