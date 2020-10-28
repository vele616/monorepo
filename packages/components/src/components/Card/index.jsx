import React from 'react';
import styled from 'styled-components';
import styles from './index.module.scss';
import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import PropTypes from 'prop-types';



const StyledImageHodler = styled.div`
position: relative;
overflow:hidden;
  & > div {
    position: absolute;
    width: 100%;
    bottom: -4px;
    left: 0;
  }
  ${({ imageAspectRatio }) => {
    if (imageAspectRatio === "16:9") {
      return "padding-top: 56.25%;";
    } else if (imageAspectRatio === "4:3") {
      return "padding-top: 75%;";
    } else if (imageAspectRatio === "21:9") {
      return "padding-top: 42.85%;";
    } else if (imageAspectRatio === "1:1") {
      return "padding-top: 100%;";
    } else if (imageAspectRatio === "3:2") {
      return "padding-top: 66.66%;";
    } else if (imageAspectRatio === "3:1") {
      return "padding-top: 33.33%;";
    } else if (imageAspectRatio === "4:1") {
      return "padding-top: 25%;";
    } else if (imageAspectRatio === "2:1") {
      return "padding-top: 50%;";
    }
    return;
  }}
  ${({ backgroundColor }) => backgroundColor ? `background-color: ${styles[backgroundColor]};` : ''}
`;

/**
 * A wrapper element that should be used to create sections of content in a document.
 * Use this component whenever you do not have a more specific semantic element.
 * 
 * This component specifies a padding/max-width for each supported device size and
 * wrapps content inside a container.
 */
const Card = ({
  children,
  image,
  className,
  backgroundColor,
  imageAspectRatio,
  narrow,
  ...props
}) => (
    <div className={`${styles.card} ${className || ''}`}  {...props}>
      {
        image &&
        <StyledImageHodler
          imageAspectRatio={imageAspectRatio}
          backgroundColor={backgroundColor}
          className={styles.card__image}
        >
          {imageAspectRatio && (
            <div>
              {image}
            </div>
          )}
          {!imageAspectRatio && image}
        </StyledImageHodler>
      }
      <div className={`${styles.card__content} ${narrow && styles.narrow}`}>
        {children}
      </div>
    </div>
  );

Card.propTypes = {
  children: PropTypes.node,
  /**
   * Optional. Background color of the section. Will be applied to fully available space.
   */
  backgroundColor: PropTypes.oneOf([
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
  image: PropTypes.node,
  className: PropTypes.string,
  /**
   * If set to a value, our component will set the image height and width relative
   * to the width of the container and in a way to respect the specified aspect ratio.
   */
  imageAspectRatio: PropTypes.oneOf(["16:9", "4:3", "4:1", "21:9", "1:1", "3:2", "3:1", "2:1"]),


  /**
   * If set to true, will make paddings of content smaller. Usefull when you have larger content.
   */
  narrow: PropTypes.bool,
};

Card.defaultProps = {
};

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Paragraph = Paragraph;
export default Card;
