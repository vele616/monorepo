import React from "react";
import renderer from "react-test-renderer";
import Textarea from "../index";

describe("Textarea Component", () => {
  test("renders without issue", () => {
    renderer.create(<Textarea />);
  });
});
