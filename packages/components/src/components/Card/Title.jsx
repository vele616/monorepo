import React from 'react';
import styles from './index.module.scss';
import Typography from '../Typography';

/**
 * A standard title for Cards defined via CroCoder's design system.
 */
const Title = ({children, ...props}) => (
<Typography {...props} className={styles.title} element="h4" fontWeight={700} color="gray_2">
  {children}
</Typography>);

export default Title;