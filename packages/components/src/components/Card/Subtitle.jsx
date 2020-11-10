import React from 'react';
import styles from './index.module.scss';
import Typography from '../Typography';

/**
 * A standard subtitle for cards defined via CroCoder's design system.
 */
const Subtitle = ({children, ...props}) => (
<Typography
  {...props}
  className={styles.subtitle}
  element="div"
  fontSize={16}
  fontFamily="rubik"
  fontWeight={300}
  color="gray_2"
>
  {children}
</Typography>);

export default Subtitle;