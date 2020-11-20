/* eslint-disable no-plusplus */
import { useRef, useMemo, useCallback } from "react";

export default function useTypeAhead(array) {
  const value = useRef();
  const typingFast = useRef(false);
  const typingFastTimeoutId = useRef(0);
  const typingFastTimeoutValue = 200;

  const generator = useMemo(() => {
    let elements = [];
    let current = 0;
    let lastResultEmpty;
    let currentChars;

    function next() {
      if (lastResultEmpty) return undefined;
      return elements[current++ % elements.length];
    }

    function first() {
      if (lastResultEmpty) return undefined;
      current = 0;
      return elements[current++];
    }

    function firstCharEqual(char1, char2) {
      return (
        char1 && char2 && char1.toLowerCase()[0] === char2.toLowerCase()[0]
      );
    }

    function filterIndexes(char) {
      const newElements = array.reduce((previousValue, currentValue, index) => {
        if (currentValue && currentValue.toLowerCase().startsWith(char)) {
          return [...previousValue, index];
        }
        return previousValue;
      }, []);

      lastResultEmpty = newElements.length === 0;

      if (!lastResultEmpty) {
        elements = newElements;
        if (firstCharEqual(char, currentChars)) {
          return next();
        }
        currentChars = char;
      }
      return first();
    }

    return {
      next,
      first,
      filterIndexes,
    };
  }, [array]);

  const next = useCallback(
    (key) => {
      if (!key) return -1;

      let pressedKey = key;
      clearTimeout(typingFastTimeoutId.current);

      if (typingFast.current && pressedKey !== value.current) {
        pressedKey = value.current + key;
      }

      const index =
        pressedKey === value.current
          ? generator.next()
          : generator.filterIndexes(pressedKey);

      value.current = pressedKey.toLowerCase();

      if (index !== undefined) {
        typingFast.current = true;
        typingFastTimeoutId.current = setTimeout(() => {
          typingFast.current = false;
        }, typingFastTimeoutValue);
      } else {
        typingFast.current = false;
      }

      return index >= 0 ? index : -1;
    },
    [array]
  );

  const clear = useCallback(() => {
    value.current = undefined;
  }, []);

  return { next, clear };
}
