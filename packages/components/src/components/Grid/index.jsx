import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  display: ${({inline}) => inline ? 'inline-grid' : 'grid'};

  ${({ columnGap }) => columnGap ? `column-gap: ${columnGap};` : ''}
  ${({ rowGap }) => rowGap ? `row-gap: ${rowGap};` : ''}

  ${({ columns }) => columns ? `grid-template-columns: ${columns};` : ''}
  ${({ rows }) => rows ? `grid-template-rows: ${rows};` : ''}
  ${({ areas }) => areas ? `grid-template-areas: ${areas};` : ''}

  ${({ justifyItems }) => justifyItems ? `justify-items: ${justifyItems};` : ''}
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''}
  ${({ alignContent }) => alignContent ? `align-content: ${alignContent};` : ''}
`;


/**
 * A basic component for creating two dimensional layouts using the CSS grid.
 */
const Grid = ({ children, ...props}) =>{
  console.log (props);

  return (
    <StyledGrid {...props}>
      {children}
    </StyledGrid>
  );
} 

Grid.propTypes = {
  children: PropTypes.node,
  /**
   * If set to true, will create an inline grid.
   */
  inline: PropTypes.bool,

  /**
   * A definition of columns inside of the grid.
   * Will be used to set the grid-template-columns CSS
   * property.
   */
  columns: PropTypes.string.isRequired,

  /**
   * Grid template areas
   */
  areas: PropTypes.string,
  /**
   * A definition of rows inside of the grid.
   * Will be used to set the grid-template-rows CSS
   * property.
   */
  rows: PropTypes.string,

  /**
   * Specifies the size of the grid lines in respect to columns.
   */
  columnGap: PropTypes.string,

   /**
   * Specifies the size of the grid lines in respect to rows.
   */
  rowGap: PropTypes.string,

  /**
   * Alignment of items along the inline/row axis.
   */
  justifyItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

  /**
   * Alignment of items along the block/column axis.
   */
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

  /**
   * When there is extra space available inside the grid, you 
   * can use this property to align the whole grid along the inline/row axis.
   */
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
  
  /**
   * When there is extra space available inside the grid, you 
   * can use this property to align the whole grid along the inline/row axis.
   */
  alignContent:  PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
};

Grid.defaultProps = {
  inline: false,
  rows: 'auto',
  justifyItems: 'stretch',
  alignItems: 'stretch',
};

export default Grid;
