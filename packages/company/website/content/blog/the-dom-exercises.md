---
title: "DOM"
description: ""
category: "learn javascript"
image: "../images/map-filter-reduce.png"
date: 1717288653
blog: true
author: lukaucur
---

The DOM or the Document Object Model of the page is created after the web page is loaded. It's constructed as a tree of objects, and with it JavaScript can access and change all the elements of an HTML document. The following excercises are meant to teach you to effectively manipulate the content and style of HTML elements.

<br/>
<br/>


<typography element="h2">Exercises</typography>

- [Fruit list](#fruit-list)
- [CroCoder Logo](#crocoder-logo)
- [Change first and last item from an unordered list](#change-first-and-last-item-from-an-unordered-list)

<br/>
<br/>

<typography id="fruit-list" element="h2">Fruit List</typography>

Input is a string of multiple words with a single space between each of them. You should abbreviate the name and get the name initials.

<typography element="h4">Helpful MDN Docs links</typography>

- [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [Document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

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

<typography id="crocoder-logo" element="h2">CroCoder Logo</typography>

Input is a string of multiple words with a single space between each of them. You should abbreviate the name and get the name initials.

<typography element="h4">Helpful MDN Docs links</typography>

- [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [Document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

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

<typography id="change-first-and-last-item-from-an-unordered-list" element="h2">Change first and last item from an unordered list</typography>

Input is a string of multiple words with a single space between each of them. You should abbreviate the name and get the name initials.

<typography element="h4">Helpful MDN Docs links</typography>

- [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- [Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

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