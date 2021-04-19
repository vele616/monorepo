---
title: "Map Filter Reduce Exercises"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis, orci id iaculis rhoncus, lorem lacus sollicitudin sapien, vitae ac."
category: "learn"
image: "../images/big.jpg"
date: 1617288653
blog: true
author: davidabram
---




<h2>Map Exercises</h2>


<h3>Get all </h3>

<row>

  <column>

  <snippet type="javascript">

  <typography element="h4">Data</typography>
  ```javascript
    const data = {
      a: 3,
      b: 4,
    } 
  ```

  </snippet>

  </column>

  <column>

  <snippet type="javascript">

  <typography element="h4">Result</typography>
  ```javascript
    const result = {
      a: 3,
      b: 4,
    }
  ```

  </snippet>

  </column>

</row>

<list-toggle title="Solution">

  ```javascript
  function sandwich(a, b, c) { return '🍞' };
  const food = ['🍞', '🥬', '🥓'];

  // Old way
  sandwich.apply(null, food);

  // ✅ ES6 way
  sandwich(...food);
  ```

</list-toggle>