---
title: "The DOM - Code Exercises"
description: "The DOM or the Document Object Model of the page is created after the web page is loaded. Learn some DOM manuipulation with these exercises."
category: "Learn JavaScript"
image: "../images/blogs/dom.png"
date: 1619463600
blog: true
author: lukaucur
---

It's really hard to test your programming knowledge after you have completed a tutorial or some lecture. We have prepared some exercises to help out the beginner devs to solidify their understanding of **the DOM**. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

If you need some additional help, you can check out our [The DOM video](https://youtu.be/TWV2qERCPG4) from **#lockdown learning** series or contact the author of the article directly.

<br />
<hr />
<br />

The DOM or the Document Object Model of the page is created after the web page is loaded. It's constructed as a tree of objects, and with it JavaScript can access and change all the elements of an HTML document. 

<br/>
<br/>


<typography element="h2">Exercises</subtitle>

- [Fruit list](#fruit-list)
- [CroCoder Logo](#crocoder-logo)
- [Change first and last item from an unordered list](#change-first-and-last-item-from-an-unordered-list)

<br/>
<br/>

<typography id="fruit-list" element="h2">Fruit List</subtitle>

You are given some names of different fruits and an unordered list html element; add a list item for each to the unordered list.

<subtitle>Helpful links</subtitle>

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

<typography id="crocoder-logo" element="h2">CroCoder Logo</subtitle>

Add the CroCoder logo (image element) as a child element to the existing div element.

<subtitle>Helpful links</subtitle>

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

<typography id="change-first-and-last-item-from-an-unordered-list" element="h2">Change first and last item from an unordered list</subtitle>

Change the text in first and the last list item element in every unordered list element on this page. Change it to ```'first'``` and ```'last'```.

<subtitle>Helpful links</subtitle>

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