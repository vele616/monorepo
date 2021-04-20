---
title: "Map Filter Reduce Exercises"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis, orci id iaculis rhoncus, lorem lacus sollicitudin sapien, vitae ac."
category: "learn"
image: "../images/big.jpg"
date: 1617288653
blog: true
author: davidabram
---

<typography element="h2">Array Squared</typography>

Square value of every element in the array. Presume that you will get only numbers in the input array.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Math.pow()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)

<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = [ 1, 2, 3, 4, 5 ];
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    [ 1, 4, 9, 16, 25]
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = [ 1, 2, 3, 4, 5 ];

    input.map(function(num) {
      return Math.pow(num, 2);
    });

    // or written with Arrow function 
    input.map(num => Math.pow(num, 2));
  
  ```

</list-toggle>

<typography element="h2">Sum of every positive element</typography>

Input is an array of numbers, return the sum of all of the positives ones. If the array is empty or there aren't any postitive numbers return 0.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = [ 1, -4, 12, 0, -3, 29, -150];
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    42
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = [ 1, -4, 12, 0, -3, 29, -150];

    input
    .filter(function(num) {
      return num > 0;
    })
    .reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

    // or written with Arrow function 
    input.filter(num => num > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  ```

</list-toggle>

<typography element="h2">Get Name initials</typography>

Input is a string of multiple words with a single space between each of them. You should abbreviate the name and get the name initials.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = 'George Raymond Richard Martin';
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    'GRRM'
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = 'George Raymond Richard Martin';

    input
    .split(' ')
    .map(function(word) {
      return word[0];
    })
    .join('');

    // or written with Arrow function 
    input.split(' ').map(word => word[0]).join('');
  
  ```

</list-toggle>


<typography element="h2">Numeronyms</typography>

Devs like to abbreviate everything: k8s means Kubernetes, a11y means accessibility, l10n means localization. You get the Dev numeronyms by taking the first and the last letter and counting the number of letters in between. Words that have less than 4 letters aren't abbreviated, because that would be just odd. 
The input is a sentence, and you should abbreviate every word that is 4 letters long or longer. There won't be any punctuation in the sentence.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)


<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = 'Every developer likes to mix kubernetes and javascript';
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    'E3y d7r l3s to mix k8s and j8t'
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = 'Every developer likes to mix kubernetes and javascript';

    const createNumeronym = (word) => word[0] + (word.length - 2) +  word[word.length - 1];

    input
    .split(' ')
    .map(function(word) {
      if(word.length >= 4) {
        return createNumeronym(word);
      }
      return word;
    })
    .join(' ');


    // or written with Arrow function and Conditional operator
    input
    .split(' ')
    .map(word => word.length >= 4 ? createNumeronym(word) : word)
    .join(' ');
  
  ```

</list-toggle>

<typography element="h2">n! with map and reduce </typography>

Input is a number and you should return factorial of that number. The factorial of a natural number n is the product of the positive integers less than or equal to n. So, 2! = 2, 3! = 6, 4! = 24 and so on.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)


<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = 6;
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    720
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = 6;

    const array = new Array(input).fill(null);
    // array is [null, null, null, null, null, null]

    array
    .map(function(currentValue, index) {
      return index + 1;
    })
    .reduce(function(accumulator, currentValue) {
      return accumulator * currentValue;
    });


    // or written with Arrow function
    new Array(input)
    .fill(null)
    .map((currentValue, index) => index + 1)
    .reduce((accumulator, currentValue) => accumulator * currentValue);
  
  ```

</list-toggle>
