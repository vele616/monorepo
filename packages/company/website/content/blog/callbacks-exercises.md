---
title: "Callbacks"
description: ""
category: "learn javascript"
image: "../images/map-filter-reduce.png"
date: 1717288653
blog: true
author: davidabram
---

<typography id="is-odd" element="h2">Is this number odd?</typography>

Square value of every element in the array. Presume that you will get only numbers in the input array.

<typography element="h4">Helpful MDN Docs links</typography>

- [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)

<row>

  <column>

  ```javascript
    isOdd(4);
    isOdd(5);
  ```

  </column>

  <column>

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

<typography id="array-squared" element="h2">At least two elements</typography>

Square value of every element in the array. Presume that you will get only numbers in the input array.

<typography element="h4">Helpful MDN Docs links</typography>

- [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

<row>

  <column>

  ```javascript
    atLeastTwo([1, 2, 3, 4, 5], isOdd);
    atLeastTwo([2, 4, 6], isOdd);
    atLeastTwo([1, 2, 3, 4, 5], t => t > 3)
  ```

  </column>

  <column>

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

<row>

  <column>

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
