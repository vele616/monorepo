import React from "react";
import renderer from "react-test-renderer";
import Button from "../index";

describe("Button Component", () => {
  test("renders without issue", () => {
    renderer.create(<Button>Button</Button>);
  });

  describe("renders html as it should", () => {
    test("default", () => {
      const tree = renderer.create(<Button>Button</Button>).toJSON();
      expect(tree).toMatchInlineSnapshot(`
        <button
          className="  button primary"
          disabled={false}
        >
          Button
        </button>
      `);
    });
  });
});
