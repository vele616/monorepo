import React, { useCallback, useState, useMemo } from "react";
import Typing from "./index";

export default {
  title: "Components/Typing",
  component: Typing,
};

export const Story1 = () => {
  return <Typing>Hello world!</Typing>;
};
Story1.storyName = "Basic usage";

export const Story2 = () => {
  return <Typing typingInterval={1000}>Hello world!</Typing>;
};
Story2.storyName = "Slow typing interval";
Story2.parameters = {
  docs: {
    description: {
      story: `You can adjust typing speed with typingInterval (in milliseconds) argument.`,
    },
  },
};

export const Story3 = () => {
  return (
    <Typing errorChance={1} typingInterval={1000}>
      Hello world!
    </Typing>
  );
};
Story3.storyName = "Make errors";
Story3.parameters = {
  docs: {
    description: {
      story: `This Typing component will make error while typing. It will correct itself 
        by deleting wrong characters. Error can be made only once.`,
    },
  },
};

export const Story4 = (args) => {
  return (
    <>
      <Typing {...args}>A</Typing>
      <div />
      <Typing {...args}>AB</Typing>
      <div />
      <Typing {...args}>ABC</Typing>
      <div />
      <Typing {...args}>ABCD</Typing>
      <div />
      <Typing {...args}>ABCDE</Typing>
      <div />
      <Typing {...args}>ABCDEF</Typing>
      <div />
      <Typing {...args}>ABCDEFG</Typing>
      <div />
      <Typing {...args}>ABCDEFGH</Typing>
      <div />
      <Typing {...args}>This component can type slowly!</Typing>
      <div />
    </>
  );
};
Story4.storyName = "Bunch of text";
Story4.parameters = {
  docs: {
    description: {
      story: `This story shows multiple typing components, one below another.`,
    },
  },
};
Story4.args = {
  errorChance: 1,
  typingInterval: 100,
};

export const Story5 = (args) => {
  const [text, setText] = useState("We have some");

  const update = useCallback(function* generator() {
    yield setText((prev) => `${prev} colors that`);
    yield setText((prev) => `${prev} are`);
    yield setText((prev) => `${prev} green`);
    yield setText((prev) => `${prev.slice(0, -5)}`);
    yield setText((prev) => `${prev} red.`);
  }, []);

  const generator = useMemo(() => update(), [update]);

  return (
    <>
      <strong>Continue typing:</strong>
      <div>
        <Typing {...args}>{text}</Typing>
      </div>
      <strong>Type from start:</strong>
      <div>
        <Typing {...args} continueOnUpdate={false}>
          {text}
        </Typing>
      </div>
      <div>
        <button onClick={() => generator.next()}>Update sentence</button>
      </div>
    </>
  );
};
Story5.storyName = "Continue typing on update";
Story5.parameters = {
  docs: {
    description: {
      story: `This story shows that text can be continuously typed. Set 'continueOnUpdate' argument to true
      for this to work. Top Typing shows continuously typing. Bottom Typing shows default, (start from begginig) typing.`,
    },
  },
};
Story5.args = {
  errorChance: 0,
  typingInterval: 50,
  continueOnUpdate: true,
};
