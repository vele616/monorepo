import React from "react";
import { render } from "@testing-library/react";
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

  const Component = () => {
    const typeAhead = useTypeAhead(array);

    expect(typeAhead.next("a")).toBe(0);
    expect(typeAhead.next("a")).toBe(3);
    expect(typeAhead.next("q")).toBe(-1); // Non existent
    expect(typeAhead.next("q")).toBe(-1); // Non existent
    expect(typeAhead.next("a")).toBe(6); // Sequence continues
    expect(typeAhead.next("a")).toBe(0);
    expect(typeAhead.next("a")).toBe(3);
    expect(typeAhead.next("b")).toBe(-1); // No 'ab' items due fast typing

    setTimeout(() => {
      expect(typeAhead.next("b")).toBe(1);
      expect(typeAhead.next("b")).toBe(7);
      expect(typeAhead.next("b")).toBe(9);
      expect(typeAhead.next("b")).toBe(1);

      setTimeout(() => {
        expect(typeAhead.next("l")).toBe(8);
        expect(typeAhead.next("e")).toBe(8);
        expect(typeAhead.next("m")).toBe(8);
        expect(typeAhead.next("o")).toBe(8);
        expect(typeAhead.next("n")).toBe(8);
      }, 300);
    }, 300);
    return <></>;
  };

  test("Empty renders without issue", () => {
    render(<Component />);
  });
});
