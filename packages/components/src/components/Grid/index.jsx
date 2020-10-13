import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  display: ${({inline}) => inline ? 'inline-grid' : 'grid'};

`;


/**
 * A basic component for creating two dimensional layouts using the CSS grid.
 */
const Grid = ({
  inline,
  children,
}) => (
  <StyledGrid
    inline={inline}
  >
    {children}
  </StyledGrid>
);

Grid.propTypes = {
  children: PropTypes.node,
  /**
   * If set to true, will create an inline grid.
   */
  inline: PropTypes.bool,
  
};

Grid.defaultProps = {
  inline: false,
};

export default Grid;
