import React from 'react';
import { Typography } from '@crocoder-dev/components';
import styles from './index.module.scss';

const TitleWithSummary = ({ title, summary }) => (
  <div className={styles.title}>
    <Typography color="gray_2" element="h2" className={styles.noMargin}>
      {title}
    </Typography>
    <Typography fontSize="24" color="gray_2">
      {summary}
    </Typography>
  </div>
);

export default TitleWithSummary;
