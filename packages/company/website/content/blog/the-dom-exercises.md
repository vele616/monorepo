---
title: "DOM"
description: ""
category: "learn javascript"
image: "../images/map-filter-reduce.png"
date: 1717288653
blog: true
author: lukaucur
---



<row>

  <column>

  ```html
    <ul></ul>
  ```

  </column>

  <column>

  <demo>
    <ul>
      <li>apple</li>
      <li>banana</li>
      <li>tomato</li>
    </ul>
  </demo>

  </column>

</row>



```javascript
const fruitList = ['apple', 'banana', 'tomato' ];

const ulElement = document.querySelector('ul');

fruitList.forEach((fruit) => {
  const itemElement = document.createElement('li');
  itemElement.textContent = fruit;
  ulElement.appendChild(itemElement);
});

```

