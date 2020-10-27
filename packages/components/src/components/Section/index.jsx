import React from 'react';
import styled from 'styled-components';
import styles from './index.module.scss';
import PropTypes from 'prop-types';


const StyledSection = styled.section`
  ${({ backgroundColor }) => backgroundColor ? `background-color: ${styles[backgroundColor]};` : ''}
  ${({ color }) => color ? `color: ${styles[color]};` : ''}
`;


/**
 * A wrapper element that should be used to create sections of content in a document.
 * Use this component whenever you do not have a more specific semantic element.
 * 
 * This component specifies a padding/max-width for each supported device size and
 * wrapps content inside a container.
 */
const Section = ({ children, className, ...props}) =>(
  <StyledSection className={`${styles.section} ${className || ''}`}  {...props}>
    <div className={styles.content}>
      {children}
    </div>
  </StyledSection>
);

Section.propTypes = {
  children: PropTypes.node,
  /**
   * Optional. Background color of the section. Will be applied to fully available space.
   */
  backgroundColor:  PropTypes.oneOf([
    'black', 'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'gray_1',
    'gray_2', 'gray_3', 'gray_4', 'gray_5', 'gray_6', 'green_1', 'green_2', 'green_3',
    'green_4', 'green_5', 'orange_1', 'orange_2', 'orange_3', 'red_1', 'red_2', 'red_3',
    'red_4', 'red_5', 'white', 'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5',
  ]),
  /**
   * Optional. Color of the section. 
   */
  color: PropTypes.oneOf([
    'black', 'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'gray_1',
    'gray_2', 'gray_3', 'gray_4', 'gray_5', 'gray_6', 'green_1', 'green_2', 'green_3',
    'green_4', 'green_5', 'orange_1', 'orange_2', 'orange_3', 'red_1', 'red_2', 'red_3',
    'red_4', 'red_5', 'white', 'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5',
  ]),
  style: PropTypes.shape({}),
  className: PropTypes.string,
};

Section.defaultProps = {
};

export default Section;
