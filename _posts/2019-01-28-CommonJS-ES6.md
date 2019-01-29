---
layout: post
title: JavaScript module systems
author: gvincent
lang: en
tags: javascript commonjs amd es6
---

JavaScript is everywhere, and when you start working with JavaScript on the frontend side or on the backend side you will be probably lost with all the information you can find around the module system. In this post I'll try to simplify some concept to help you understand terms like CommonJS, AMD, ES6 imports, etc...

## NodeJS and the browser

Ok so JavaScript is a language. You can run JavaScript directly in your browser (right click on any web page + inspect element > console)

```js
var my_string = "A string";
console.log(my_string); // A string
```

Or you can run JavaScript in your terminal if you have NodeJS installed. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

```js
// main.js
var my_string = "A string";
console.log(my_string);
```

If you run `node main.js` you will have the same result in your terminal.

## ECMAScript 5 versus ECMAScript 6

ECMAScript 5 or ES5 is a version of JavaScript (edition 5).
The version that came after ES5 is ECMAScript 2015 (ES6).
Then ECMAScript 2016 (ES7) ECMAScript 2017 (ES8) and ECMAScript 2018 (ES9).

NodeJS and almost every browsers understand perfectly ES5 code.
But some ES6 new features are missing for some browsers.

So when you write JavaScript, you can write JavaScript (implicitly we understand ES5 JavaScript).

```js
var user = { firstname: "John", lastname: "Doe" };
var firstname = user.firstname;
var lastname = user.lastname;
console.log(firstname, lastname);
```

Or you can write JavaScript with ES6+ features

```js
const user = { firstname: "John", lastname: "Doe" };
const { firstname, lastname } = user;
console.log(firstname, lastname);
```

Depending on your target and the ES6 features you want to use, your code could not work.

## Transpilation

If you want to be sure everything will work on every browsers and version of NodeJS, you will need to transform your ES6 code to ES5 code.
There is a popular tool call [babel](https://babeljs.io/) that transform your ES6 code into a valid ES5 code.

Depending on your workflow you will be able to include babel to automatically transpile your code.
I'm not going to detail how to install babel, because it depends on your workflow.
But we can test the transformation [online](https://babeljs.io/repl). The code is almost equal to the ES5 we already wrote.

```js
"use strict";

var user = { firstname: "John", lastname: "Doe" };
var firstname = user.firstname,
  lastname = user.lastname;

console.log(firstname, lastname);
```

## CommonJS

Ok so let's increase the complexity a little bit.
A common software is splited into different modules or files.
JavaScript had neither a module system, nor facilities to load sources from within the code.

In 2009 a group of developpers created a specification called CommonJS.
CommonJS describe the module system for JavaScript running outside a browser (understand NodeJS).


```js
// main.js
var userModule = require("./user.js");

var user = { firstname: "John", lastname: "Doe" };
userModule.print(user);
```

Here we are writing JavaScript code that will work on **NodeJs** out of the box.
We require the module `userModule` with the `require` syntax.
We use the public methods exported by `userModule`:

```js
// user.js
function printFirstnameLastname(user) {
  var firstname = user.firstname;
  var lastname = user.lastname;
  console.log(firstname, lastname);
}

// declare exports for our 'user.js' module
module.exports = {
  print: printFirstnameLastname
};
```

Nothing to complicated. We have a method `printFirstnameLastname` printing the first and last name of the user given in parameter.
We declare the exports for our module. Here we export an object with one method attached: `print`.

If you run `node main.js` it will print `John Doe`.


Note: CommonJS is designed for synchronous loading


## AMD

In the browser world, we have plenty of solution, but one become a standard: [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
I will not go in details but retains that AMD (Asynchronous Module Definition) is designed for asynchronous loading and browsers.
AMD load modules on demand. 

But Roger, we have a problem: A typical JavaScript web application have hundreds of files, so loading hundred of files asynchronously is not a good idea (until we have HTTP2 everywhere).

So a lot of developers prefer to use CommonJS syntax and concatenate modules in a single JavaScript file rather than using AMD.
The best tool to do that was browserify:

    npx browserify main.js -o main.bundle.js


Now `main.bundle.js` works with NodeJs `node main.bundle.js > John Doe` and in your browser 

```html
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="./main.bundle.js"></script>
    </head>
</html>
<!-- console log John Doe !>
```


## ES6

ECMAScript 2015 (ES6) came with a native module system for JavaScript working in the browser and in NodeJs.
Use `import ... from ...` instead of `var ... = require(...)` and `default export` instead `module.exports`

```js
// main.mjs
import print from "./print.mjs";
const user = { firstname: "John", lastname: "Doe" };
print(user);
```

```js
// print.mjs
export default user => {
  const { firstname, lastname } = user;
  console.log(firstname, lastname);
};
```

NodeJs doesn't understand `export` and `import` statements yet.
If you run the code like this you will have the following error:

```bash
main.mjs:1
(function (exports, require, module, __filename, __dirname) { import print from "./print.mjs";
                                                                     ^^^^^

SyntaxError: Unexpected identifier
```

This is an example where you will need to transpile your code from ES6+ to ES5 with `babel`.


For the demo, I just renamed `.js` files into `.mjs` files.
It helps me to use the new module system with the flag `--experimental-modules`.

```bash
node --experimental-modules main.mjs
(node:21147) ExperimentalWarning: The ESM module loader is experimental.
John Doe
```

In your browser, the code will work if you add ` type="module"` to the `script` tag:

```html
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="./main.mjs"></script>
    </head>
</html>
<!-- console log John Doe !>
```

## Conclusion

ES6 came with a native module system. It helps writing modular code.
ES6 module system didn't solve all problems, like asynchronous loading, mixing CommonJS code and ES6 code valid on NodeJS and inside your browser.

Bundler like Webpack helps you solving those problems. 
You can for example with a little configuration mix CommonJS code, new ES6 modules, and create code specific for your browser or NodeJS.

Tell me if you find this blog post usefull