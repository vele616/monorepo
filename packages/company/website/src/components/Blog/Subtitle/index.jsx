import React from "react";
import { Typography } from "@crocoder-dev/components";

const Subtitle = ({ children }) => {
  return (
    <Typography
      element="div"
      className="subtitle"
      fontSize={30}
      fontFamily="rubik"
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
