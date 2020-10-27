import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFlexbox = styled.div`
  display: ${({ inline }) => inline ? 'inline-flex' : 'flex'};
  ${({ flexBasis }) => flexBasis ? `flex-basis: ${flexBasis};` : ''}
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''}
  ${({ flexWrap }) => flexWrap ? `flex-wrap: ${flexWrap};` : ''}
  ${({ direction }) => direction ? `flex-direction: ${direction};` : ''}
`;


/**
 * A basic component for creating two dimensional layouts using the CSS grid.
 */
const Flexbox = ({ children, ...props }) => (
  <StyledFlexbox {...props}>
    {children}
  </StyledFlexbox>
);

Flexbox.propTypes = {
  children: PropTypes.node,
  /**
   * If set to true, will create an inline flexbox container.
   */
  inline: PropTypes.bool,
 
  /**
   * Defines the alignment along the main axis of the flexbox container.
   * The property helps define how the extra free space should be distributed.
   */
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'left', 'right', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),

  /**
   * Defines the default behavior for how flex items are laid along the cross axis.
   */
  alignItems: PropTypes.oneOf(['baseline', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),

  /**
   * Defines the flex-basis property of the flexbox container. Useful if using nested flex elements.
   */
  flexBasis: PropTypes.string,
  /**
   * Defines how the elements should wrap inside the flexbox container.
   */
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),

  /**
   * Applied as the flex-direction CSS property.
   */
  direction: PropTypes.oneOf(['row', 'column']),
};

Flexbox.defaultProps = {
  inline: false,
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  direction: 'row',
};

export default Flexbox;
