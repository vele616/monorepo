---
title: "CSS Position Property - Code Exercises"
description: ""
image: "../images/blogs/map-filter-reduce.png"
date: 1631570400
blog: true
author: danicapivalicaabram
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar vulputate nisl, sit amet interdum mi imperdiet vitae. Nunc eget tellus nisi. Proin vel elit mollis, ornare felis sed, malesuada orci. Praesent consequat erat enim, ac mattis justo gravida vel. Cras consectetur elit ante, a consectetur nunc ornare vel. Nunc dolor leo, efficitur in consequat a, malesuada in nisi. Vivamus imperdiet porta consequat. Praesent sed ligula purus. Proin rutrum pharetra ante vitae blandit. 



Praesent tincidunt lorem id nibh venenatis, sed finibus velit lobortis. Nam consequat, massa at efficitur porta, metus magna hendrerit libero, ac sollicitudin nulla elit in enim. Nam molestie sem vitae dolor eleifend, eget consectetur quam dapibus.

<br />
<hr />
<br />

Proin in tellus eros. Integer tortor sapien, dignissim in eros in, maximus gravida ante. Duis ante odio, imperdiet a libero vel, feugiat fermentum diam. Ut quis ultricies turpis, sed pulvinar mi. Praesent maximus tempus malesuada. 

Cras consectetur interdum risus, vel interdum lectus tempus nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque augue ex, posuere quis porta et, euismod non odio. Integer commodo lorem vel nibh tempor, ut dignissim massa condimentum. Integer vitae lacinia sapien. Vestibulum lorem est, suscipit vitae neque et, mollis rutrum lorem. Mauris quis tincidunt nibh. Vestibulum nunc nulla, aliquam ac condimentum at, tempus quis tellus. Sed ac efficitur nisi, non lobortis ligula.

<br/>
<br/>


<typography element="h2">Exercises</typography>

- [1](#position-element-relative-to-parent)
- [2](#position-elements-in-corners)


<br/>
<br/>

<typography id="position-element-relative-to-parent" element="h2">Position element relative to the parent element</typography>

Aenean gravida dui eu bibendum condimentum.

<typography>Helpful MDN Docs links</typography>

- [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

<row>

  <column>
  <typography>Input</typography>

  ```html
    <div class="text">
      <div class="overlay">Lorem Ipsum<div>
      Maecenas vestibulum vel 
      risus ut euismod. 
      Aenean faucibus fringilla accumsan.
      Maecenas lacinia ligula vitae 
      velit lobortis,
      eu interdum mauris rhoncus.
      Proin quis augue sit 
      amet arcu volutpat 
      porta tincidunt ut metus.
      Mauris at dictum nibh.
    </div>
  ```

  ```css
    text {
      height: 200px;
      width: 300px;
      margin-top: 50px;
    }
    overlay {
        background-color:rgba(255, 0, 0, 0.8);
        line-height: 100px;
        width: 300px;
        font-weight: 800;
    }
  ```

  </column>

  <column>

  <typography>Result</typography>

  
  <demo>
    <div style="
      position:relative;
      height: 200px;
      width: 300px;
      margin-top: 50px;
    ">
      <div style="
        position:absolute;
        background-color:rgba(255, 0, 0, 0.8);
        height: 100px;
        line-height: 100px;
        width: 300px;
        text-align: center;
        font-weight: 800;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      ">
        LOREM IPSUM
      </div>
      Maecenas vestibulum vel risus ut euismod. Aenean faucibus fringilla accumsan. Maecenas lacinia ligula vitae velit lobortis, eu interdum mauris rhoncus. Proin quis augue sit amet arcu volutpat porta tincidunt ut metus. Mauris at dictum nibh.
    </div>
  </demo>

  </column>

</row>

<list-toggle title="Solution">

<row>
  <column>

  ```css
    text {
      position:relative;
      height: 200px;
      width: 300px;
      margin-top: 50px;
    }

    overlay {
        position:absolute;
        background-color:rgba(255, 0, 0, 0.8);
        height: 100px;
        line-height: 100px;
        width: 300px;
        text-align: center;
        font-weight: 800;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }
  ```

  </column>
  <column>
    <p>
      absafsa
    </p>
  </column>
</row>
</list-toggle>

<typography id="position-elements-in-corners" element="h2">Position elements in corners of the parent</typography>

Aenean gravida dui eu bibendum condimentum.

<typography>Helpful MDN Docs links</typography>

- [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

<row>

  <column>
  <typography>Input</typography>

  ```html
    <div class="parent">
      <div class="child top left"><div>
      <div class="child top right"><div>
      <div class="child bottom left"><div>
      <div class="child bottom left"><div>
      <div class="child center"></div>
    </div>
  ```

  ```css
   .parent {
      height: 300px;
      width: 300px;
      border: 1px solid #000;
    }

    .child {
      height: 100px;
      width: 100px;
    }

    .top .left {
      background: #ff1a00;
    }

    .top .right {
      background: #ff8d00;
    }

    .bottom .right {
      background: #e3ff00;
    }

    .bottom .left {
      background: #00ff04;
    }
    .center {
      background: #0051ff;
    }
  ```

  </column>

  <column>

  <typography>Result</typography>

  
  <demo>
    <div style="
      height: 300px;
      width: 300px;
      position: relative;
      border: 1px solid #000;
    ">
      <div style="
        height: 100px;
        width: 100px;
        background: #ff1a00;
        position: absolute;
        top: 0;
        left: 0;
      ">
      </div>
      <div style="
        height: 100px;
        width: 100px;
        background: #ff8d00;
        position: absolute;
        top: 0;
        right: 0;
      ">
      </div>
      <div style="
        height: 100px;
        width: 100px;
        background: #e3ff00;
        position: absolute;
        bottom: 0;
        left: 0;
      ">
      </div>
      <div style="
        height: 100px;
        width: 100px;
        background: #00ff04;
        position: absolute;
        bottom: 0;
        right: 0;
      ">
      </div>
      <div style="
        height: 100px;
        width: 100px;
        background: #0051ff;
        position: absolute;
        top: 33.333%;
        left: 33.333%;
      ">
      </div>
    </div>
  </demo>

  </column>

</row>

<list-toggle title="Solution">

<row>
  <column>

  ```css
    .parent {
      height: 300px;
      width: 300px;
      border: 1px solid #000;
      position: relative;
    }

    .child {
      height: 100px;
      width: 100px;
      position: absolute;
    }

    .top .left {
      background: #ff1a00;
      top: 0;
      left: 0;
    }

    .top .right {
      background: #ff8d00;
      top: 0;
      right: 0;
    }

    .bottom .right {
      background: #e3ff00;
      bottom: 0;
      right: 0;
    }

    .bottom .left {
      background: #00ff04;
      bottom: 0;
      right: 0;
    }
    .center {
      background: #0051ff;
      bottom: 33.333%;
      right: 33.333%;
    }
  ```

  </column>
  <column>
    <p>
      absafsa
    </p>
  </column>
</row>
</list-toggle>