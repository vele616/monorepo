import React from "react";
import renderer from "react-test-renderer";
import Input from "../index";

describe("Input Component", () => {
  test("renders without issue", () => {
    renderer.create(<Input />);
  });

  test("renders HTML as it should", () => {
    const tree = renderer.create(<Input label="Banana" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="input__wrapper empty"
      >
        <label
          className="input__label"
        >
          Banana
           
        </label>
        <input
          className="  input "
          disabled={false}
          onChange={[Function]}
          placeholder="Banana"
        />
      </div>
    `);
  });
});
