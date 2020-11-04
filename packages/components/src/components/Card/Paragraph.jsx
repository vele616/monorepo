import React from 'react';
import styles from './index.module.scss';
import Typography from '../Typography';

/**
 * A standard paragraph for cards defined via CroCoder's design system.
 */
const Paragraph = ({children, ...props}) => (
<Typography
  {...props}
  className={styles.paragraph}
  element="div"
  fontSize={18}
  fontWeight={500}
  color="gray_11"
>
  {children}
</Typography>);

export default Paragraph;