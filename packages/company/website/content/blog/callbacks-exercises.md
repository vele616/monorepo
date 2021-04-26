---
title: "JS Exercises: Callbacks"
description: "Callbacks are so common in JavaScript, you certainly used callbacks without knowing they're called that. Let's try to solve some exercises that will help you learn callbacks in JavaScript."
category: "Learn JavaScript"
image: "../images/blogs/callbacks.png"
date: 1619463600
blog: true
author: davidabram
---

It's really hard to test your programming knowledge after you have completed a tutorial or some lecture. We have prepared some exercises to help out the beginner devs to solidify their understanding of **callbacks**. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

If you need some additional help, you can check out our [Functions video](https://youtu.be/VkjE7CebnPQ) from **#lockdown learning** series in which we discuss **functions and callbacks** or contact the author of the article directly.

<br />
<hr />
<br />

**Callbacks** are a critical concept in **JavaScript** and you won't get very far without knowing how to use them. They are often as confusing to experienced developers as to beginners. A **callback** is nothing more than a function that is passed into another function as an argument to be executed later.

They are so common in **JavaScript**, you certainly used **callbacks** without knowing they're called that. You probably wrote a similar snippet multiple times: 

```javascript

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
  this.classList.add('clicked')
});

```

The second parameter passed into addEventListener is a **callback**. I have compiled some exercises to improve your understanding of callbacks. Try not to skip them as some code is reused in later exercises.

<br/>
<br/>


<typography element="h2">Exercises</typography>

- [Is this number odd?](#is-odd)
- [Exclaim](#exclaim)
- [Double the chars!](#double-the-chars)
- [At least two elements](#at-least-two-elements)
- [Group By](#group-by)
- [Repeat the function x times](#repeat-the-function-x-times)

<br/>
<br/>

<typography id="is-odd" element="h2">Is this number odd?</typography>

Write a function that returns true or false for a given number. We will reuse this function, so make it reusable.

<typography element="h4">Helpful MDN Docs links</typography>

- [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    isOdd(4);
    isOdd(5);
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    false
    true
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript
const isOdd = (num) => num % 2 === 1;

```

</list-toggle>

<typography id="exclaim" element="h2">Exclaim</typography>

Write a function that returns the given string with a concated exclamation ! at the end. We will reuse this function, so make it reusable.

<typography element="h4">Helpful MDN Docs links</typography>

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    exclaim('Adrian');
    exclaim(exclaim('Adrian'));
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    "Adrian!"
    "Adrian!!"
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript
  const exclaim = (str) => `${str}!`;

  exclaim('Adrian');
  exclaim(exclaim('Adrian'));

```

</list-toggle>

<typography id="double-the-chars" element="h2">Double the chars!</typography>

Write a function that duplicates each char in a string. If I pass 'abc' to the function, it should return 'aabbcc'.  We will reuse this function, so make it reusable.

<typography element="h4">Helpful MDN Docs links</typography>

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    doubleChars('Adrian');
    doubleChars('ssssnake');
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    "AAddrriiaann"
    "ssssssssnnaakkee"
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript
  const doubleChars = (str) => str.split('').map(c => `${c}${c}`).join('');

  doubleChars('Adrian');
  doubleChars('ssssnake');

```

</list-toggle>

<typography id="at-least-two-elements" element="h2">At least two elements</typography>

Write a function called **atLeastTwo** that receives an array and a callback as its arguments. If at least two elements from the array return a truthy value when passed as an argument to the callback, **atLeastTwo** should return true. If there aren't at least two elements from the array that return a truthy value when passed as arguments to the callback, **atLeastTwo** should return false. 

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    atLeastTwo([1, 2, 3, 4, 5], isOdd);
    atLeastTwo([2, 4, 6], isOdd);
    atLeastTwo([1, 2, 3, 4, 5], t => t > 3)
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    true
    false
    true
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript
    const isOdd = (num) => {
      return num % 2 === 1;
    };

    const atLeastTwo = (array, callback) => array
    .filter(callback).length >= 2;
    
    atLeastTwo([1, 2, 3, 4, 5], isOdd);

    atLeastTwo([2, 4, 6], isOdd);

    atLeastTwo([1, 2, 3, 4, 5], t => t > 3);

```

</list-toggle>

<typography id="group-by" element="h2">Group By</typography>

Write a function **groupBy** that groups elements from an array by the returned value from callback when an element from the array is passed as an argument. 

This is a really common pattern when doing array manipulation.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    const input = [
      {
        name: 'John',
        yearOfBirth: 1988,
        placeOfBirth: 'New York',
      },
      {
        name: 'Nancy',
        yearOfBirth: 1963,
        placeOfBirth: 'New York',
      },
      {
        name: 'John',
        yearOfBirth: 1980,
        placeOfBirth: 'Toronto',
      },
    ];

    // 1
    groupBy(input, t => t.name);

    // 2
    groupBy(input, t => isOdd(t.yearOfBirth));
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    // 1
    {
      John: [
        {
          name: 'John',
          yearOfBirth: 1988,
          placeOfBirth: 'New York',
        },
        {
          name: 'John',
          yearOfBirth: 1980,
          placeOfBirth: 'Toronto',
        }
      ],
      Nancy: [
        {
          name: 'Nancy',
          yearOfBirth: 1963,
          placeOfBirth: 'New York',
        }
      ]
    }

    // 2
    {
      false: [
        {
          name: 'John',
          yearOfBirth: 1988,
          placeOfBirth: 'New York',
        },
        {
          name: 'John',
          yearOfBirth: 1980,
          placeOfBirth: 'Toronto',
        }
      ],
      true: [
        {
          name: 'Nancy',
          yearOfBirth: 1963,
          placeOfBirth: 'New York',
        }
      ]
    }
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript

     const input = [
      {
        name: 'John',
        yearOfBirth: 1988,
        placeOfBirth: 'New York',
      },
      {
        name: 'Nancy',
        yearOfBirth: 1963,
        placeOfBirth: 'New York',
      },
      {
        name: 'John',
        yearOfBirth: 1980,
        placeOfBirth: 'Toronto',
      },
    ];

    const isOdd = (num) => {
      return num % 2 === 1;
    };

    const groupBy = (array, callback) => array.reduce(
      (accumulator, currentValue) => {
        const key = callback(currentValue);
        
        if(accumulator[key]) {
          accumulator[key].push(currentValue);
        } else {
          accumulator[key] = [currentValue];
        }

        return accumulator;
      },
      {},
    );

    groupBy(input, t => t.name);

    groupBy(input, t => isOdd(t.yearOfBirth));

```

</list-toggle>

<typography id="repeat-the-function-x-times" element="h2">Repeat the function x times</typography>

Write a function **repeat** that receives 3 arguments: a string, number of repetitions, and a callback that will be repeated. The **repeat** function should pass the string to the callback as an argument and repeat x times the callback with the result of the previous repetition as an argument. 

<typography element="h4">Helpful MDN Docs links</typography>

- [For loop](https://developer.mozilla.org/en-US/docs/Glossary/loop#for_loop)
- [Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)

<row>

  <column>

  <typography element="h4">Function calls</typography>

  ```javascript
    repeat('infinite power', 3, exclaim);
    repeat('triple', 2, doubleChars);
    repeat('trogdor', 3, t => `°${t}°`);
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    "infinite power!!!"
    "tttrrriiipppllleee"
    "°°°trogdor°°°"
  ```
  </column>

</row>


<list-toggle title="Solution">

```javascript

  const repeatRecursive = (input, num, callback) => {
    if(num === 0) return input;
    return repeatRecursive(callback(input), num-1, callback);
  }

  const repeat = (input, num, callback) => {
    let result = input;
    for (i = 0; i < num; i++) {
      result = callback(result);
    }
    return result;
  }

  repeat('infinite power', 3, exclaim);
  repeat('triple', 2, doubleChars);
  repeat('trogdor', 3, t => `°${t}°`);

```

</list-toggle>