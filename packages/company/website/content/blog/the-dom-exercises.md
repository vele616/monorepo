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

  ```javascript
  const fruitList = ['apple', 'banana', 'tomato' ];
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

<list-toggle title="Solution">

```javascript
const fruitList = ['apple', 'banana', 'tomato' ];

const ulElement = document.querySelector('ul');

fruitList.forEach((fruit) => {
  const itemElement = document.createElement('li');
  itemElement.textContent = fruit;
  ulElement.appendChild(itemElement);
});

```

</list-toggle>


<row>

  <column>

  ```html
  <div></div>
  ```

  ```javascript
  const imageSrc = 'https://crocoder.dev/icon.png';
  ```

  </column>

  <column>

  <demo>
    <div>
      <img height="30%" src="https://crocoder.dev/icon.png">
    </div>
  </demo>

  </column>

</row>

<list-toggle title="Solution">

```javascript
  const imageSrc = 'https://crocoder.dev/icon.png';

  const divElement = document.querySelector('div');

  const imgElement = document.createElement('img');

  imgElement.src = imageSrc;

  divElement.appendChild(imgElement);

```

</list-toggle>

<row>

  <column>

  ```html
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
  <ul>
    <li>👻</li>
    <li>👽</li>
    <li>🦁</li>
  </ul>
  ```

  </column>

  <column>

  <demo>
  <div>
    <ul>
      <li>first</li>
      <li>2</li>
      <li>last</li>
    </ul>
    <ul>
      <li>first</li>
      <li>b</li>
      <li>last</li>
    </ul>
    <ul>
      <li>first</li>
      <li>👽</li>
      <li>last</li>
    </ul>
    </div>
  </demo>

  </column>

</row>

<list-toggle title="Solution">

```javascript

  const firstLis = [...document.querySelectorAll('ul > li:first-child')];
  const lastLis = [...document.querySelectorAll('ul > li:last-child')];

  firstLis.forEach(li => li.textContent = 'first');

  lastLis.forEach(li => li.textContent = 'last');


```

</list-toggle>