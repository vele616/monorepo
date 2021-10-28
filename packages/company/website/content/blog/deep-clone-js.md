---
title: "All the ways you can clone an object in JavaScript"
description: "In JavaScript, you cannot clone an object just by assigning its value to another variable, but you can use any of these techniques to shallow or deep clone an object!"
category: "Code Bits"
image: "../images/blogs/map-filter-reduce.png"
date: 1635090948
blog: true
author: davidabram
---

Cloning is hard because some properties have different behaviour when values are assigned to another variables.

Explain primitive values and objects - explain their behaviour when copied

<br>

<subtitle>Helpful links</subtitle>

- [MDN Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

<br/>
<br/>


<typography element="h2">Contents</typography>

- [Shallow Clone](#shallow-clone)
  - [Using Spread syntax](#using-spread-syntax)
  - [Using Object.assign()](#using-object-assign)
  - [Using Object.entries & Object.fromEntries](#using-object-entries-fromentries)
- [Deep Clone](#deep-clone)
  - [Using JSON.stringify & JSON.parse](#using-json-stringify-parse)
  - [\[Node.js ONLY\] Using v8.serialize & v8.deserialize](#using-v8-serialize-deserialize)
- [External libraries](#using-external-libraries)
  - [Using $.extend()](#using-jquery-extend)
  - [Using _.clone()](#using-underscore-clone)
  - [Using _.cloneDeep()](#using-lodash-clonedeep)


<br/>
<br/>


<typography id="shallow-clone" element="h2">Shallow Clone</typography>


Explain what is shallow clone.

Shallow Cloning is when you copy all the properties of an object; primitive types are copied by 

Performing shallow cloning is the default behaviour in JavaScript in most cases. When performing shallow cloning you copy all properties of an object, but not the object itself and it works for an object that contains only primitive values. 

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = shallowCopy(object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);

  object.laptop = '🖨️';
  object.animals.bear = '🐻';
  object.smiles = 42;

  // { laptop: '🖨️', smiles: 42,  animals: { wolf: '🐺', fox: '🦊', bear: '🐻' }, alien: Symbol('👽')}
  console.log(object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊', bear: '🐻' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<br>
<br>

<typography id="using-spread-syntax" element="h3">Using Spread syntax</typography>

The Spread syntax (...) is proposal that was accepted in ECMAScript 2018. It shallows clone any object

Spread Syntax is new in ECMAScript 2018 and it passes all keys:value pairs from the original object. In Spread Syntax mergedObj is a copy of the original object and every enumerable property will be copied to the final object. It can be used when all elements from an object need to be included in any kind of list.


```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = {...object};

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [MDN Spread Syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Object Rest/Spread Properties for ECMAScript](https://github.com/tc39/proposal-object-rest-spread)

<br>
<br>

<typography id="using-object-assign" element="h3">Using Object.assign()</typography>

By using this method you will clone all the property values from one or more source objects to a target object.

It's also used for merging multiple objects into a single object with combined properties. 

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = Object.assign({}, object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [MDN Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<br>
<br>

<typography id="using-object-entries-fromentries" element="h3">Using Object.entries & Object.fromEntries</typography>


```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = Object.fromEntries(Object.entries(object));

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [MDN Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [MDN Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

<br>
<br>

<typography id="deep-clone" element="h2">Deep Clone</typography>

Explain what is deep clone.

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = shallowCopy(object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);

  object.laptop = '🖨️';
  object.animals.bear = '🐻';
  object.smiles = 42;

  // { laptop: '🖨️', smiles: 42,  animals: { wolf: '🐺', fox: '🦊', bear: '🐻' }, alien: Symbol('👽')}
  console.log(object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<br>
<br>

<typography id="using-json-stringify-parse" element="h3">Using JSON.stringify & JSON.parse</typography>

JSON.parse/JSON.stringify way of deep cloning offers a easy but unreliable deep cloning because it tends to lose some data along the way. It is slow for larger objects and can copy only valid JSON data types which don't include functions, symbols and undefined. JSON.parse() method parses a JSON string, constructing the JS object described by the string, while JSON.stringify() converts JS object to a JSON string but optionally can replace values if that function is specified. 

- json stringify parse is slow for larger objects
- JSON stringify parse can copy only valid JSON data types which don't include functions, symbols and undefined.

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = JSON.parse(JSON.stringify(object));

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' } }
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [MDN JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

<br>
<br>

<typography id="using-v8-serialize-deserialize" element="h3">[Node.js ONLY] Using v8.serialize & v8.deserialize</typography>

- serialize transform the data to a buffer then deserialize tries to transform data to JavaScript Object.
- It will throw an error if you try to copy symbols or functions

```javascript
  const v8 = require('v8');

  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = v8.deserialize(v8.serialize(object));

  // Uncaught Error: Symbol(👽) could not be cloned.
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [Node.js docs v8.serialize()](https://nodejs.org/api/v8.html#v8serializevalue)
- [Node.js docs v8.deserialize()](https://nodejs.org/api/v8.html#v8deserializebuffer)

<br>
<br>

<typography id="using-external-libraries" element="h2">Using external libraries</typography>

<br>
<br>

<typography id="using-jquery-extend" element="h3">Using $.extend()</typography>

This is a shallow cloning method and its very popular library jQuery. When multiple object arguments are supplied to $.extend(), properties from all those objects are added to the targeted object, but if only one object argument is supplied to $.extend() the target argument was ommited, so the jQuery object is assumed to be the target. 

It's a nice to use in legacy projects that don't support Object.assign or Spread Syntax (older than Chrome 45, Firefox 34 or Node.js 4.0.0).

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };

  const clonedObject = $.extend({}, object);
  
  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [jQuery docs jquery.extend()](https://api.jquery.com/jquery.extend/)

<br>
<br>

<typography id="using-underscore-clone" element="h3">Using _.clone()</typography>

Underscore clone() is also a shallow cloning method, and it's a method somewhat popular and used library but doesn't support deep cloning.

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };
  
  const clonedObject = _.clone(object);
  
  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [Underscore docs _.clone()](http://underscorejs.org/#clone)

<br>
<br>

<typography id="using-lodash-clonedeep" element="h3">Using _.cloneDeep()</typography>

The last method we'll cover is a deep clone method, _.cloneDeep(), which recursively copies properties from the object and keeps the object inheritance. 

Lodash is a well-tested and popular library and what's great about it is that you can import each function individually.

```javascript
  const object = {
    laptop: '💻',
    smiles: ['😀', '😁', '😆'],
    animals: {
      wolf: '🐺',
      fox: '🦊',
    },
    alien: Symbol('👽'),
  };
  
  const clonedObject = _.cloneDeep(object);
  
  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

<subtitle>Helpful links</subtitle>

- [Lodash docs _.cloneDeep()](https://lodash.com/docs/4.17.15#cloneDeep)