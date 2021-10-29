---
title: "All the ways you can clone an object in JavaScript"
description: "In JavaScript, you cannot clone an object just by assigning its value to another variable, but you can use any of these techniques to shallow or deep clone an object!"
category: "Code Bits"
image: "../images/blogs/map-filter-reduce.png"
date: 1635090948
blog: true
author: davidabram
---

In JavaScript, object cloning isn't obvious as it seems. You cannot just assign the value of one object to another variable and create a copy of it. The problem is related to the data types you can use in JavaScript.

There are two groups of JavaScript data types: primitive values and objects. Primitive values are Boolean, Null, Undefined, Number, BigInt, String & Symbol. Objects are all other data types that are collection of properties (including Arrays!).

The big difference between primitive values and objects happen when you try using the `=` operator.

<br/>

<subtitle>Primitives</subtitle>

When working with primitives, the `=` operator creates a copy of the original variable. We call this passing by value. 

```javascript

var smiles = '😀😁😆';

// '😀😁😆'
console.log(smiles);

var animals = smiles;

// '😀😁😆'
console.log(animals);



animals = '🐺🦊🐻';

// '🐺🦊🐻'
console.log(animals);

// '😀😁😆'
console.log(smiles);

```

Variable smiles is a primitive value, in this example a String, which means variable animals in the line `var animals = smiles;` becomes a copy of the variable smiles. 

When you change the value of the variable animals in the line `animals = '🐺🦊🐻';`, it doesn't change the value of the variable smiles.


<subtitle>Objects</subtitle>

When working with objects, the `=` operator creates an 'alias' to the original object, it doesn’t create a new object. We call this passing by reference. 

```javascript

var drinks = {
  cocktail: '🍹',
  coffee: '☕',
  beer: '🍺',
} 

// { cocktail: '🍹', coffee: '☕', beer: '🍺' } 
console.log(drinks);


var foods = drinks;

// { cocktail: '🍹', coffee: '☕', beer: '🍺' } 
console.log(foods);

foods.cocktail = '🍤';
foods.coffee = '🧁';
foods.beer = '🍖';

// { cocktail: '🍤', coffee: '🧁', beer: '🍖' } 
console.log(foods);

// { cocktail: '🍤', coffee: '🧁', beer: '🍖' } 
console.log(drinks);

```

The type of variable drinks is an object, which means variable foods in the line `var foods = drinks;` becomes a reference to the value of the variable drinks.

When you change the value of the properties of variable foods in the lines `foods.cocktail = '🍤'; foods.coffee = '🧁'; foods.beer = '🍖';`, it changes the value of properties of variable drinks.


Passing by reference complicates the cloning process of the objects, you cannot use a simple variable assignment to copy a non-primitive value.

Hopefully, the next examples will help you to learn some of the techniques how to clone objects. When working with objects, the `=` operator creates an 'alias' to the original object, it doesn’t create a new object. We call this passing by reference. 


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

Shallow cloning is an act of object cloning where you copy all the properties of an object to another newly created object, but the non-primitive properties are copied by reference. 

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

  object.laptop = '🍹';
  object.animals.bear = '🐻';
  object.smiles = 42;

  // { laptop: '🍹', smiles: 42,  animals: { wolf: '🐺', fox: '🦊', bear: '🐻' }, alien: Symbol('👽')}
  console.log(object);

  // { laptop: '💻', smiles: ['😀', '😁', '😆'],  animals: { wolf: '🐺', fox: '🦊', bear: '🐻' }, alien: Symbol('👽')}
  console.log(clonedObject);
```

If you change the value of the properties of the non-primitive properties of the original object, you will change the value in the clonedObject.

As you can see in the line `object.animals.bear = '🐻';` we are changing the proprety of the non-primitive property animals in the original object. It changes the `clonedObject.animals.bear` because it was passed by reference.


<br>
<br>

<typography id="using-spread-syntax" element="h3">Using Spread syntax</typography>

The Spread syntax (...) is proposal that was accepted in ECMAScript 2018. It destructures the object and keys and their values are copied onto a new object.

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

Object.entries() transforms the object to an array of arrays containing key names and values of the original object properties. 

Sounds confusing? 

For our example object `Object.entries(object)` result looks something like this: `[['laptop', '💻'], ['smiles', ['😀', '😁', '😆']], ...]`.

Object.fromEntries() takes the array of arrays and transforms it back to an object.

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


Shallow cloning is an act of object cloning where you copy all the properties of an object to another newly created object and all the properties of all non-primitive properties of that object, and so on recursively. 

You will get a true clone of the object you want a clone; it's doesn't reference any value of the original object.

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

JSON.parse() & JSON.stringify() way of deep cloning offers an easy but unreliable deep cloning because it tends to lose some data along the way (Valid JSON data types don't include functions, symbols and undefined). It is extremely slow for larger objects.


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

As you can see from the example, Symbol isn't a valid JSON data type; alien property is ignored in JSON.stringify() and missing in the clonedObject.

<subtitle>Helpful links</subtitle>

- [MDN JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

<br>
<br>

<typography id="using-v8-serialize-deserialize" element="h3">[Node.js ONLY] Using v8.serialize & v8.deserialize</typography>

v8.serialize() & v8.deserialize() is only availiable in Node.js enviroments. Unfortunately it throws an errror when trying to serialize objects that have symbols or functions as their properties.

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

The example throws an error with `Uncaught Error: Symbol(👽) could not be cloned.` message. If you remove the alien property from the object, the code works.


<subtitle>Helpful links</subtitle>

- [Node.js docs v8.serialize()](https://nodejs.org/api/v8.html#v8serializevalue)
- [Node.js docs v8.deserialize()](https://nodejs.org/api/v8.html#v8deserializebuffer)

<br>
<br>

<typography id="using-external-libraries" element="h2">Using external libraries</typography>

The next few methods are just some examples of cloning using popular external libraries and they are in no way an exaustive list. 

<br>
<br>

<typography id="using-jquery-extend" element="h3">Using $.extend()</typography>

This is a shallow and deep cloning method from very popular library jQuery. From usability standpoint it functions almost the same as Object.assign(). If you pass true as the first argument, the the $.extend() method will deep clone.

It's a nice to use in legacy projects that don't support Object.assign() or Spread Syntax (older than Chrome 45, Firefox 34 or Node.js 4.0.0).

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

  // deep cloning -> value of the first argument is true
  const clonedObject = $.extend(true, {}, object);
  
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