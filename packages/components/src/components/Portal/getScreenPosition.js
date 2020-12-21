const getScreenPosition = ({ parentId, x, y, positionOffset, includeHalf }) => {
  if (!parentId) return {};
  const parent = document.getElementById(parentId);
  if (!parent) return {};
  try {
    const boundingRect = parent.getBoundingClientRect();
    let left;
    let top;
    switch (x) {
      case "left": {
        left = boundingRect.x;
        break;
      }
      case "center": {
        left = includeHalf
          ? boundingRect.x + Math.round(boundingRect.width / 2)
          : boundingRect.x;
        break;
      }
      default: {
        left = boundingRect.x + boundingRect.width;
        break;
      }
    }
    switch (y) {
      case "top": {
        top = boundingRect.y;
        break;
      }
      case "center": {
        top = includeHalf
          ? boundingRect.y + Math.round(boundingRect.height / 2)
          : boundingRect.y;
        break;
      }
      default: {
        top = boundingRect.y + boundingRect.height;
        break;
      }
    }
    return {
      top: top + window.scrollY,
      left: left + window.scrollX,
      padding: `${positionOffset}px`,
    };
  } catch (ex) {
    return { top: 0, left: 0, transform: undefined };
  }
};

export default getScreenPosition;
