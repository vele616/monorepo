import React from "react";
import renderer from "react-test-renderer";
import Pagination from "../index";

describe("Pagination Component", () => {
  test("renders without issue", () => {
    renderer.create(<Pagination />);
  });
});
