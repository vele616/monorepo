import { useRef, useMemo, useCallback, useState } from "react";

export default function useTypeAhead(array) {
  const [value, setValue] = useState();
  const [subArray, setSubArray] = useState([]);
  const [subArrayIndex, setSubArrayIndex] = useState(-1);
  const [lastSearchEmpty, setLastSearchEmpty] = useState(false);
  const [lastSuccessKey, setLastSuccessKey] = useState();

  const availableKeys = useMemo(() => {
    return new Set(array.map((item) => item[0].toLowerCase()));
  }, [array]);

  const [typingFast, setTypingFast] = useState(false);
  const typingFastTimeoutId = useRef(0);
  const typingFastTimeoutValue = 300;

  const nextIndex = useCallback(() => {
    const index = subArrayIndex + 1 >= subArray.length ? 0 : subArrayIndex + 1;
    setSubArrayIndex(index);
    return subArray[index];
  }, [subArrayIndex, subArray]);

  const filterIndexes = useCallback(
    (key) => {
      return array.reduce((prev, curr, i) => {
        if (curr && curr.toLowerCase().startsWith(key)) {
          return [...prev, i];
        }
        return prev;
      }, []);
    },
    [array]
  );

  const next = useCallback(
    (key) => {
      const lowerKey = key.toString().toLowerCase();

      if (!lastSearchEmpty) {
        clearTimeout(typingFastTimeoutId.current);
        setTypingFast(true);

        typingFastTimeoutId.current = setTimeout(() => {
          setTypingFast(false);
        }, typingFastTimeoutValue);

        if (value && value.length === 1 && lowerKey === value) {
          return nextIndex();
        }

        const pressedKeys = (typingFast && value && availableKeys.has(value[0])
          ? value + lowerKey
          : lowerKey
        ).toLowerCase();
        setValue(pressedKeys);

        if (typingFast) {
          const index = array.findIndex((item) =>
            item.toString().toLowerCase().startsWith(pressedKeys)
          );
          if (index !== -1)
            setSubArrayIndex(subArray.findIndex((item) => item === index));
          return index;
        }

        if (value && pressedKeys[0] === value[0]) {
          return nextIndex();
        }
      }

      if (lastSuccessKey === lowerKey) {
        setLastSearchEmpty(false);
        return nextIndex();
      }

      const newArray = filterIndexes(lowerKey);
      if (newArray.length > 0) {
        setSubArray(newArray);
        setSubArrayIndex(0);
        setLastSearchEmpty(false);
        setLastSuccessKey(lowerKey);
        return newArray[0];
      }

      setLastSearchEmpty(true);
      return undefined;
    },
    [
      value,
      lastSearchEmpty,
      lastSuccessKey,
      filterIndexes,
      typingFast,
      nextIndex,
      availableKeys,
      array,
      subArray,
    ]
  );

  const clear = useCallback(() => {
    setSubArrayIndex(-1);
  }, []);

  return useMemo(() => {
    return { next, clear };
  }, [clear, next]);
}
