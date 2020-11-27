import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const StyledSection = styled.section`
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${styles[backgroundColor]};` : ""}
  ${({ color }) => (color ? `color: ${styles[color]};` : "")}
`;

/**
 * A wrapper element that should be used to create sections of content in a document.
 * Use this component whenever you do not have a more specific semantic element.
 *
 * This component specifies a padding/max-width for each supported device size and
 * wrapps content inside a container. You can use it to support standard spacing
 * inside of your application.
 */
const Section = ({
  children,
  className,
  removeMobilePadding,
  removeVerticalPadding,
  ...props
}) => (
  <StyledSection
    className={classnames(styles.section, className, {
      [styles.removeMobile]: removeMobilePadding,
      [styles.removeVerticalPadding]: removeVerticalPadding,
    })}
    {...props}
  >
    <div className={styles.content}>{children}</div>
  </StyledSection>
);

Section.propTypes = {
  /**
   * If set to true, the padding will be removed for screens smaller than `tabletPortrait` minimum
   * width.
   */
  removeMobilePadding: PropTypes.bool,
  /**
   * If set to true remove all vertical paddings
   */
  removeVerticalPadding: PropTypes.bool,
  children: PropTypes.node,
  /**
   * Optional. Background color of the section. Will be applied to fully available space.
   */
  backgroundColor: PropTypes.oneOf([
    "black",
    "blue_1",
    "blue_2",
    "blue_3",
    "blue_4",
    "blue_5",
    "blue_6",
    "gray_1",
    "gray_2",
    "gray_3",
    "gray_4",
    "gray_5",
    "gray_6",
    "green_1",
    "green_2",
    "green_3",
    "green_4",
    "green_5",
    "orange_1",
    "orange_2",
    "orange_3",
    "red_1",
    "red_2",
    "red_3",
    "red_4",
    "red_5",
    "white",
    "yellow_1",
    "yellow_2",
    "yellow_3",
    "yellow_4",
    "yellow_5",
  ]),
  /**
   * Optional. Color of the section.
   */
  color: PropTypes.oneOf([
    "black",
    "blue_1",
    "blue_2",
    "blue_3",
    "blue_4",
    "blue_5",
    "blue_6",
    "gray_1",
    "gray_2",
    "gray_3",
    "gray_4",
    "gray_5",
    "gray_6",
    "green_1",
    "green_2",
    "green_3",
    "green_4",
    "green_5",
    "orange_1",
    "orange_2",
    "orange_3",
    "red_1",
    "red_2",
    "red_3",
    "red_4",
    "red_5",
    "white",
    "yellow_1",
    "yellow_2",
    "yellow_3",
    "yellow_4",
    "yellow_5",
  ]),
  style: PropTypes.shape({}),
  className: PropTypes.string,
};

Section.defaultProps = {};

export default Section;
