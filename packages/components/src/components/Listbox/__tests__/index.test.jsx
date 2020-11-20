import React from "react";
import {
  getByTestId,
  getAllByRole,
  getByRole,
  fireEvent,
} from "@testing-library/dom";
import { render } from "@testing-library/react";
import Listbox from "../index";

describe("Listbox Component", () => {
  describe("Single Select Listbox", () => {
    test("Empty renders without issue", () => {
      const { container } = render(<Listbox testId="listbox-1" />);
      const listbox = getByTestId(container, "listbox-1");

      expect(listbox.getAttribute("aria-multiselectable")).toBe("false");
      expect(listbox.getAttribute("aria-orientation")).toBe("vertical");
      expect(listbox.getAttribute("aria-disabled")).toBe("false");
    });

    test("1 option renders without issue", () => {
      const { container } = render(
        <Listbox>
          <Listbox.Option>Ananas</Listbox.Option>
        </Listbox>
      );

      const options = getAllByRole(container, "option");
      expect(options.length).toBe(1);
      options.forEach((option) => {
        expect(option.getAttribute("aria-disabled")).toBe("false");
        expect(option.getAttribute("aria-selected")).toBe("false");
      });
    });

    test("5 options renders without issue", () => {
      const { container } = render(
        <Listbox testId="listbox-1">
          <Listbox.Option>Ananas</Listbox.Option>
          <Listbox.Option>Australia</Listbox.Option>
          <Listbox.Option>Banana</Listbox.Option>
          <Listbox.Option>Bloom</Listbox.Option>
          <Listbox.Option>Doom</Listbox.Option>
        </Listbox>
      );

      const listbox = getByRole(container, "listbox");
      expect(listbox.getAttribute("aria-multiselectable")).toBe("false");
      expect(listbox.getAttribute("aria-orientation")).toBe("vertical");
      expect(listbox.getAttribute("aria-disabled")).toBe("false");

      const options = getAllByRole(container, "option");
      expect(options.length).toBe(5);
      options.forEach((option) => {
        expect(option.getAttribute("aria-disabled")).toBe("false");
        expect(option.getAttribute("aria-selected")).toBe("false");
      });
    });

    test("Supports keyboard interaction", () => {
      const handleOnChange = jest.fn();

      const { container } = render(
        <Listbox onChange={handleOnChange} testId="listbox-1">
          <Listbox.Option>Ananas</Listbox.Option>
          <Listbox.Option disabled>Australia</Listbox.Option>
          <Listbox.Option>Banana</Listbox.Option>
          <Listbox.Option>Bloom</Listbox.Option>
          <Listbox.Option>Doom</Listbox.Option>
        </Listbox>
      );

      const listbox = getByTestId(container, "listbox-1");
      listbox.focus();

      const options = getAllByRole(container, "option");

      // Press Enter to select first option
      fireEvent.keyDown(listbox, { keyCode: 13 });
      expect(options[0].getAttribute("aria-selected")).toBe("true");
      // Press Arrow Down to focus next non disabled option
      fireEvent.keyDown(listbox, { keyCode: 40 });
      // Press Enter to select first option
      fireEvent.keyDown(listbox, { keyCode: 13 });
      expect(options[0].getAttribute("aria-selected")).toBe("false");
      expect(options[2].getAttribute("aria-selected")).toBe("true");

      expect(handleOnChange).toHaveBeenCalledTimes(2);
    });
  });
});
