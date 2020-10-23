import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import PropTypes from 'prop-types';

const Hamburger = ({ open, className }) => (
  <svg
    className={className}
    viewBox="0 0 96 96"
    height="1em"
    style={{
      overflow: 'visible',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    }}
  >
    <Motion
      style={{
        x: spring(open ? 1 : 0, presets.wobbly),
        y: spring(open ? 0 : 1, presets.wobbly),
      }}
    >
      {({ x, y }) => (
        <g
          id="navicon"
          fill="none"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line
            transform={`translate(${x * 12}, ${x * -7}) rotate(${x *
              45}, 7, 26)`}
            x1="7"
            y1="26"
            x2="89"
            y2="26"
          />
          <line
            transform={`translate(${x * 12}, ${x * 7}) rotate(${x *
              -45}, 7, 70)`}
            x1="7"
            y1="70"
            x2="89"
            y2="70"
          />
          <line
            transform={`translate(${x * -96})`}
            opacity={y}
            x1="7"
            y1="48"
            x2="89"
            y2="48"
          />
        </g>
      )}
    </Motion>
  </svg>
);

Hamburger.propTypes = {
  open: PropTypes.boolean,
};

Hamburger.defaultProps = {
  open: false,
}

export default Hamburger;
