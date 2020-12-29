/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';

const Typing = ({ children }) => {
  const [text, setText] = useState('');

  let count = 0;

  const randomLetter = useCallback(() => {
    const allLetters = 'abcdefghijklmnopqrstuvwxyz';
    return allLetters[Math.floor(Math.random() * allLetters.length)];
  }, []);

  useEffect(() => {
    if (!children) return;
    setText('');

    const newText = children.split('');
    const random = Math.floor(Math.random() * (newText.length - 5)) + 3;
    newText.splice(
      random,
      0,
      ...[
        randomLetter(),
        newText[random + 1],
        newText[random + 2],
        'backspace',
        'backspace',
        'backspace',
      ]
    );

    const timer = setInterval(() => {
      if (newText[count] !== 'backspace') {
        setText((prev) => prev + newText[count]);
      } else {
        setText((prev) => prev.slice(0, -1));
      }

      count++;
      if (count >= newText.length) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [children]);

  return text;
};

export default Typing;
