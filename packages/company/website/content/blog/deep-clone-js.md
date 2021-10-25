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

<typography>Helpful links</typography>

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

<typography id="using-spread-syntax" element="h3">Using Spread syntax</typography>

- For object literals (new in ECMAScript 2018)
- passes all key:value pairs from an object

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

<typography>Helpful links</typography>

- [MDN Spread Syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)



<typography id="using-object-assign" element="h3">Using Object.assign()</typography>

- copies all property values from the object.

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

<typography>Helpful links</typography>

- [MDN Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<typography id="using-object-entries-fromentries" element="h3">Using Object.entries & Object.fromEntries</typography>

- entries extract all key:value pairs to an array then merges it back together with fromEntries to an object

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

<typography>Helpful links</typography>

- [MDN Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [MDN Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

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

<typography id="using-json-stringify-parse" element="h3">Using JSON.stringify & JSON.parse</typography>

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

<typography>Helpful links</typography>

- [MDN JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

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

<typography>Helpful links</typography>

- [Node.js docs v8.serialize()](https://nodejs.org/api/v8.html#v8serializevalue)
- [Node.js docs v8.deserialize()](https://nodejs.org/api/v8.html#v8deserializebuffer)

<typography id="using-external-libraries" element="h2">Using external libraries</typography>

<typography id="using-jquery-extend" element="h3">Using $.extend()</typography>

- shallow copy
- very popular library jQuery
- nice for the legacy systems that doesn't support Object.assign or Spread Syntax (IE) -> older than chrome 45, Firefox 34 or node.js 4.0.0.

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

<typography>Helpful links</typography>

- [jQuery docs jquery.extend()](https://api.jquery.com/jquery.extend/)

<typography id="using-underscore-clone" element="h3">Using _.clone()</typography>

- a shallow copy 
- underscore is somewhat popular and used, unfortunately doesn't have a deep clone.

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

<typography>Helpful links</typography>

- [Underscore docs _.clone()](http://underscorejs.org/#clone)


<typography id="using-lodash-clonedeep" element="h3">Using _.cloneDeep()</typography>

- a deep copy
- recursively copies properties from the object

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

<typography>Helpful links</typography>

- [Lodash docs _.cloneDeep()](https://lodash.com/docs/4.17.15#cloneDeep)