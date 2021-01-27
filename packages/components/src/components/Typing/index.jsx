/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CHARACTERS = Object.freeze({
  BACKSPACE: "backspace",
  WAIT: "wait",
});

const Typing = ({
  children,
  continueOnUpdate,
  errorChance = 1,
  typingInterval = 50,
  availableLetters = "abcdefghijklmnopqrstuvwxyz",
  onFinish,
}) => {
  const [text, setText] = useState("");
  const currentCharacter = useRef(0);

  useEffect(() => {
    if (!children || typeof children !== "string") return null;

    currentCharacter.current = 0;

    let typedText = children;

    if (continueOnUpdate && text) {
      if (children.startsWith(text)) {
        typedText = children.slice(text.length);
      }
      if (text.startsWith(children)) {
        return setText(children);
      }
    } else {
      setText("");
    }

    const characterSequence = typedText.split("");

    // Add incorrect letter on random position
    if (errorChance >= 0 && errorChance <= 1 && typedText.length >= 6) {
      if (Math.random() > 1 - errorChance) {
        const incorrectLetterPosition =
          Math.floor(Math.random() * (characterSequence.length - 5)) + 3;
        const randomLetter =
          availableLetters[Math.floor(Math.random() * availableLetters.length)];
        characterSequence.splice(
          incorrectLetterPosition,
          0,
          randomLetter,
          characterSequence[incorrectLetterPosition + 1],
          characterSequence[incorrectLetterPosition + 2],
          CHARACTERS.BACKSPACE,
          CHARACTERS.BACKSPACE,
          CHARACTERS.BACKSPACE
        );
      }
    }

    // Add 0-3 pauses on random positions
    if (typedText.length >= 3) {
      for (let index = Math.floor(Math.random() * 4); index > 0; index -= 1) {
        characterSequence.splice(
          Math.floor(Math.random() * characterSequence.length - 1),
          0,
          CHARACTERS.WAIT
        );
      }
    }

    const timer = setInterval(() => {
      switch (characterSequence[currentCharacter.current]) {
        case CHARACTERS.BACKSPACE:
          setText((prev) => prev.slice(0, -1));
          break;
        case CHARACTERS.WAIT:
          break;
        default:
          setText((prev) => prev + characterSequence[currentCharacter.current]);
          break;
      }

      currentCharacter.current += 1;
      if (currentCharacter.current >= characterSequence.length) {
        clearInterval(timer);
        if (onFinish) onFinish();
      }
    }, typingInterval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    availableLetters,
    children,
    errorChance,
    onFinish,
    typingInterval,
    continueOnUpdate,
  ]);

  return text;
};

Typing.propTypes = {
  /**
   * String of letters (without spaces) that can be used to write incorrect letter.
   * Set errorChance argument to number greater that 0 to apply this.
   */
  availableLetters: PropTypes.string,
  /**
   * String that will be typed.
   */
  children: PropTypes.string,
  /**
   * Chance to type wrong letter. Varies from 0 to 1.
   * Child text has to be at least 6 chars long for error change to occur.
   * If wrong letter is typed, typing will continue by two characters.
   * After that, three characters will be deleted and typing will continue
   * with correct letters.
   */
  errorChance: PropTypes.number,
  /**
   * Interval in miliseconds between each letter.
   */
  typingInterval: PropTypes.number,
  /**
   * Callback function that will be called when all text is typed
   */
  onFinish: PropTypes.func,
  /**
   * If set to true, typing will contitnue if updated text starts the same as old text from
   * last typed letter. If set to true, it will type from begining each time.
   */
  continueOnUpdate: PropTypes.bool,
};

export default Typing;
