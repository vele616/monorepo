import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Grid, Input, Button, Flexbox, Icon, Section } from '@crocoder-dev/components';
import styles from './index.module.scss';


const Newsletter = ({
  title_1,
  title_2,
  subtitle,
  data,
  confirm,
  inputLabel,
  submitButtonLabel,
  ...other
}) => {
  return (
    <Section className={styles.section}>
      <Typography
        fontSize={65}
        element="div"
        className={styles.title}
        color="gray_2"
        fontWeight={700}
      >
        {title_1}
        <Typography fontWeight={700} color="green_4">CroCoder</Typography>
        {title_2}
      <Typography className={styles.subtitle} element="div" fontSize={24}>
        {subtitle}
      </Typography>
      </Typography>
      <Grid
        className={styles.grid}
        columnGap="60px"
      >
        <Input required label={inputLabel} className={styles.input} />
        <Button className={styles.button}>
          {submitButtonLabel}
        </Button>
        <Flexbox alignItems="baseline" className={styles.flex}>
          <Icon fontSize={14} color="gray_2" className={styles.icon} icon="checkbox-unchecked" />
          <Typography fontSize={16} color="gray_2" >
            {confirm}
          </Typography>
        </Flexbox>
      </Grid>
    </Section>
  )
};


const NewsletterWithQuery = () => (
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
        }
      }
    }
  `}
    render={data => (<Newsletter data={data} {...data.homeJson.newsletter} />)}
  />
);

export default NewsletterWithQuery;