/* eslint-disable no-plusplus */
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import useTypeAhead from "../useTypeAhead";

describe("useTypeAhead", () => {
  const array = [
    /* 0 */ "Ananas",
    /* 1 */ "Banana",
    /* 2 */ "Candy",
    /* 3 */ "Avocado",
    /* 4 */ "Lollipop",
    /* 5 */ "Munchmellow",
    /* 6 */ "Apple Pie",
    /* 7 */ "Banana Pie",
    /* 8 */ "Lemon",
    /* 9 */ "Bread",
    /* 10 */ "Carrot",
    /* 11 */ "Orange",
  ];

  let i = 0;
  const values = [
    { key: "a", index: 0 },
    { key: "a", index: 3 },
    { key: "a", index: 6 },
    { key: "a", index: 0 },
    { key: "b", index: -1 },
  ];

  function next() {
    return values[i++];
  }

  test("Empty renders without issue", () => {
    const Component = () => {
      const typeAhead = useTypeAhead(array);

      function handleClick() {
        const { key, index } = next();
        const typeAheadIndex = typeAhead.next(key);
        expect(typeAheadIndex).toBe(index);
      }

      return (
        <button data-testid="btn" onClick={handleClick}>
          Click
        </button>
      );
    };

    const { container } = render(<Component />);

    const button = getByTestId(container, "btn");
    values.forEach(() => {
      fireEvent.click(button);
    });
  });
});
