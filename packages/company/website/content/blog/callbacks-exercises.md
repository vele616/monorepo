---
title: "JavaScript Callbacks"
description: ""
category: "learn javascript"
image: "../images/blogs/callbacks.png"
date: 1619463600
blog: true
author: davidabram
---

As a JavaScript developer, you will come across arrays. Arrays of numbers, arrays of objects, arrays of arrays of objects, multi-dimensional arrays, and you will need to simplify, transform or manipulate with them. 

You could use nested for loops to solve most of the problems you will encounter, but that leaves the code hard to read and understand. I would like to prove to you that by using map, filter, and reduce array methods, not only that the code will be more readable, but you will be able to analyze the problem and write the code with ease.

The next exercises aim to help out the beginner devs to solidify their understanding of map, filter, reduce, and other array methods that are useful to master. Every exercise has a brief description of the problem, input code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

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

Square value of every element in the array. Presume that you will get only numbers in the input array.

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

Square value of every element in the array. Presume that you will get only numbers in the input array.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

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

Square value of every element in the array. Presume that you will get only numbers in the input array.

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

Square value of every element in the array. Presume that you will get only numbers in the input array.

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