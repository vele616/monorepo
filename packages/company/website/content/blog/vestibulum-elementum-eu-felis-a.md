---
title: "Vestibulum elementum eu felis a."
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis, orci id iaculis rhoncus, lorem lacus sollicitudin sapien, vitae ac."
category: "growth"
image: "../images/big.jpg"
date: 1617288653
blog: true
author: davidabram
---


## Examples

You can even apply your standard loop methods on it!

### Using it with Map

Use it with the map method to triple each of the number.

```bash{promptUser: alice}{promptHost: dev.localhost}
#!/bin/bash
echo "Printing text with newline"
echo -n "Printing text without newline"
echo -e "\nRemoving \t backslash \t characters\n"
```

```bash
#!/bin/bash
echo "Printing text with newline"
echo -n "Printing text without newline"
echo -e "\nRemoving \t backslash \t characters\n"
```

```javascript{1,4-6}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

```jsx
class FlavorForm extends React.Component { // highlight-line
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // highlight-next-line
    this.setState({value: event.target.value});
  }

  // highlight-start
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  // highlight-end

  render() {
    return (
      { /* highlight-range{1,4-9,12} */ }
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

```javascript
const dropRightWhile = (arr, func) => {
  //change?
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

// Number.prototype[Symbol.iterator] = function*() {...}

const even = [...10].filter(x => x % 2 === 0);

even; // [ 0, 2, 4, 6, 8, 10 ]
```

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css">
  </head>
  <body>

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

    <script>
      document.getElementById("demo").innerHTML = "Hello JavaScript!";
    </script>
  </body>
</html>
```

```css
@import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.207/distr/fira_code.css);
/* Specify in CSS */
code { font-family: 'Fira Code', monospace; }

@supports (font-variation-settings: normal) {
  code { font-family: 'Fira Code VF', monospace; }
}
```

```scss
/** Cross-browser filter mixin. */
@mixin filter($value) {
  -moz-filter: $value;
  -ms-filter: $value;
  -o-filter: $value;
  -webkit-filter: $value;
  filter: $value;
}

/** Cross-browser transform mixin. */
@mixin transform($value) {
  -moz-transform: $value;
  -o-transform: $value;
  -webkit-transform: $value;
  transform: $value;
}
/** Cross-browser transition mixin. */
@mixin transition($value) {
  -moz-transition: $value;
  -o-transition: $value;
  -webkit-transition: $value;
  transition: $value;
}

/** Cross-browser non selectable element mixin. */
@mixin user-select-none() {
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Adds elipsis to element */
@mixin ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

```