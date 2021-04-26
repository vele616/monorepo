import React from "react";
import rehypeReact from "rehype-react";
import Demo from "../CodeExample/Demo";
import Snippet from "../CodeExample/Snippet";
import Row from "../CodeExample/Row";
import Column from "../CodeExample/Column";
import ListToggle from "../CodeExample/ListToggle";
import { Typography } from "@crocoder-dev/components";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    demo: Demo,
    snippet: Snippet,
    column: Column,
    row: Row,
    "list-toggle": ListToggle,
    typography: Typography,
  },
}).Compiler;

export default renderAst;
