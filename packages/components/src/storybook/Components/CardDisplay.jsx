import React from "react";
import PropTypes from "prop-types";
import { cardPadding } from "../../styles/main.module.scss";

const padding = cardPadding.split('";"');

const screenMap = {
  desktop: 0,
  tabletLandscape: 1,
  tabletPortrait: 2,
  mobile: 3,
  mobileMini: 4,
};

const dimensionMap = {
  vertical: 0,
  horizontal: 1,
};

const getPadding = (screen, dimension) => {
  return padding[screenMap[screen]].split(",")[dimensionMap[dimension]];
};

const CardDisplay = ({ screen, title }) => (
  <div>
    <b style={{ textTransform: "capitalize" }}>{title}</b>
    <ul>
      <li>
        <b>Vertical:</b> {getPadding(screen, "vertical")}{" "}
      </li>
      <li>
        <b>Horizontal:</b> {getPadding(screen, "horizontal")}{" "}
      </li>
    </ul>
  </div>
);

CardDisplay.propTypes = {
  screen: PropTypes.oneOf(Object.keys(screenMap)),
  title: PropTypes.string,
};

export default CardDisplay;
