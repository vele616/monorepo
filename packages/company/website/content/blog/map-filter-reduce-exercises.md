---
title: "Map, Filter, Reduce - Code Exercises"
description: "Map, filter and reduce are the most useful array methods to manipulate arrays and often the hardest to master. Try to solve the given exercises!"
category: "Learn JavaScript"
image: "../images/blogs/map-filter-reduce.png"
date: 1619474400
blog: true
author: davidabram
abstract: "It's really hard to test your programming knowledge after you have completed a tutorial or some lecture. We have prepared some exercises to help out the beginner devs to solidify their understanding of map, filter, reduce, and other useful array methods. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution."

---

It's really hard to test your programming knowledge after you have completed a tutorial or some lecture. We have prepared some exercises to help out the beginner devs to solidify their understanding of **map, filter, reduce**, and other useful array methods. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

If you need some additional help, you can check out our [Arrays video](https://youtu.be/pkRW2RJ2LzQ) from **#lockdown learning** series in which we discuss **map, filter and reduce** or contact the author of the article directly.

<br />
<hr />
<br />

As a **JavaScript** developer, you will come across arrays. Arrays of numbers, arrays of objects, arrays of arrays of objects, multi-dimensional arrays, and you will need to simplify, transform or manipulate them. 

You could use nested for loops to solve most of the problems you will encounter, but that leaves the code hard to read and understand.  
I would like to prove to you that by using map, filter, and reduce array methods, not only that the code will be more readable, but you will be able to analyze the problem better and write the code with ease.

<br/>
<br/>


<typography element="h2">Exercises</typography>

- [Array Squared](#array-squared)
- [Sum of every positive element](#sum-of-every-positive-element)
- [Calculate median and mean](#calculate-median-and-mean)
- [Get Name initials](#get-name-initials)
- [Age Difference from the youngest and oldest](#age-difference-from-the-youngest-and-oldest)
- [Numeronyms](#numeronyms)
- [n! with map and reduce](#n-with-map-and-reduce)
- [Count elements in array of arrays](#count-elements-in-array-of-arrays)


<br/>
<br/>

<typography id="array-squared" element="h2">Array Squared</typography>

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

<typography id="sum-of-every-positive-element" element="h2">Sum of every positive element</typography>

Input is an array of numbers, return the sum of all of the positives ones. If the array is empty or there aren't any positive numbers return 0.

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

<typography id="calculate-median-and-mean" element="h2">Calculate median and mean</typography>

Calculate the mean and median values of the number elements from the input array.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Math.abs()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)


<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript

    const input = [12, 46, 32, 64];
    
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    { mean: 38.5, median: 32 }
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = [12, 46, 32, 64];
    input.sort((a, b) => a - b);

    input
    .reduce((accumulator, currentValue, index, array) => {

      accumulator.mean += currentValue /  array.length;

      if(Math.abs(index + 1  - array.length / 2) < 1) { 
        accumulator.median = currentValue 
      }

      return accumulator;
    }, { mean: 0, median: 0 });


  ```

</list-toggle>

<typography id="get-name-initials" element="h2">Get Name initials</typography>

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

<typography id="age-difference-from-the-youngest-and-oldest" element="h2">Age Difference from the youngest and oldest</typography>

Find the difference in age between the oldest and youngest family members, and return their respective ages and the difference.

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
- [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript

    const input = [
      {
        name: 'John',
        age: 13
      },
      {
        name: 'Mark',
        age: 56,
      },
      {
        name: 'Rachel',
        age: 45,
      },
      {
        name: 'Nate',
        age: 67,
      },
      {
        name: 'Jeniffer',
        age: 65,
      }
    ];
    
  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    [13, 67, 54]
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = [
      {
        name: 'John',
        age: 13
      },
      {
        name: 'Mark',
        age: 56,
      },
      {
        name: 'Rachel',
        age: 45,
      },
      {
        name: 'Nate',
        age: 67,
      },
      {
        name: 'Jeniffer',
        age: 65,
      }
    ];

    const ages = input.map(person => person.age);

    [Math.min(...ages), Math.max(...ages), Math.max(...ages) - Math.min(...ages)];


  ```

</list-toggle>



<typography id="numeronyms" element="h2">Numeronyms</typography>

Devs like to abbreviate everything: k8s means Kubernetes, a11y means accessibility, l10n means localization. You get the Dev numeronyms by taking the first and the last letter and counting the number of letters in between. Words that have less than 4 letters aren't abbreviated, because that would be just odd. 
The input is a sentence, and you should abbreviate every word that is 4 letters long or longer. There won't be any punctuation in the sentence. g2d l2k e6e

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

<typography id="n-with-map-and-reduce" element="h2">n! with map and reduce </typography>

Input is a number and you should return the factorial of that number. The factorial of a natural number n is the product of the positive integers less than or equal to n. So, 2! = 2, 3! = 6, 4! = 24 and so on.

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

<typography id="count-elements-in-array-of-arrays" element="h2">Count elements in array of arrays</typography>

Count the occurrences of distinct elements in the given 2D array. The given input is an array in which elements are arrays of strings. A result is an object which properties' names are values from the arrays and their value is the number of their occurrences. 

<typography element="h4">Helpful MDN Docs links</typography>

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)


<row>

  <column>
  <typography element="h4">Input</typography>

  ```javascript
    const input = [
      ['a', 'b', 'c'],
      ['c', 'd', 'f'],
      ['d', 'f', 'g'],
    ];

  ```

  </column>

  <column>

  <typography element="h4">Result</typography>

  ```javascript
    {
      a: 1,
      b: 1,
      c: 2,
      d: 2,
      f: 2,
      g: 1,
    }
  ```

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
    const input = [
      ['a', 'b', 'c'],
      ['c', 'd', 'f'],
      ['d', 'f', 'g'],
    ];

    input
    .flat()
    .reduce((accumulator, currentValue) => {
      if(accumulator[currentValue]) {
        accumulator[currentValue] += 1;
      } else {
        accumulator[currentValue] = 1;
      }
      return accumulator;
    }, {});
  
  ```

</list-toggle>