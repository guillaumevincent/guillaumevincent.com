---
layout: post
title: 4 ES6 features I use a lot
author: gvincent
lang: en
tags: javascript es6
---

The next version of Javascript came with some nice features. Here the top 4 features for me

## template literals

Template literal is one of the most usefull feature of es6. You can wrap a string with `` ` `` (tick) element and wrap a variable with `${ }` element.

```js
//es5
var string = "Hello " + firstname + " " + lastname;

//es6
const string = `Hello ${firstname} ${lastname}`;
```

This takes all its interest with multi lines:

```js
const fullname = "John Doe";
const address = {
  street: "123 Main Street",
  city: "New York"
};
console.log(`Hello ${fullname},

here my new adress:

    ${address.street}
    ${address.city}

Cheers,

Guillaume`);
```

It will log:

```bash
Hello John Doe,

here my new adress:

    123 Main Street
    New York

Cheers,

Guillaume
```

## arrow function

One another ES6 I really use a lot is the arrow function:

```js
// anonymous arrow function
// es5
function (firstname, lastname){
    console.log(firstname, lastname)
}
// es6
(firstname, lastname) => {
  console.log(firstname, lastname)
};
```

If there is one parameter

```js
// anonymous arrow function
// es5
function (user){
    console.log(user)
}
// es6
user => {
  console.log(user)
};
```

If there is no parameter

```js
// anonymous arrow function
// es5
function (){
    console.log("Hello world!")
}
// es6
() => {
  console.log("Hello world!")
};
```

It makes my code cleaner.

Arrow functions came also with an implicit return if you remove the braces.

```js
// es5
function add(a, b) {
  return a + b;
}
// es6
const add = (a, b) => a + b;
```

Arrows function become usefull in function like `map` or `filter`

```js
// es5
function onlyAdults(users, legalAge) {
  return users.filter(function(user) {
    return user.age > legalAge;
  });
}
// es6
const onlyAdults = (users, legalAge) =>
  users.filter(user => user.age > legalAge);
```

For people doing some functional programming, you start recognizing patterns!

Note that the arrow function does not have the same behavior with the bind of `this`, `super`, `arguments`, etc. I will cover this difference in another blog post.

## destructuring

Destructuring is interesting to extract the value of a key from an object and assign it to a variable in a single line.

```js
// destructuring
var user = {
  firstname: "John",
  lastname: "Doe"
};
// this ES5 code
var firstname = user.firstname;
var lastname = user.lastname;
// is equivalent to this ES6 code
const { firstname, lastname } = user;
```

We destructure an object in variables. Variables are created (`firstname` and `lastname` in my example). Then the value of those variables in the object are assigned to them.

Destructuring works with nested objects and avoid duplication of declarations.

```js
var user = {
  address: {
    principal: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "California"
    }
  }
};
// es5
// duplication of user.address.principal
var street = user.address.principal.street;
var city = user.address.principal.city;
var state = user.address.principal.state;
// es6
const { street, city, state } = user.address.principal;
```

Destructuring is interesting also with default value and variables renaming on the fly

```js
const address = {
  street: "123 Main Street",
  city: "San Francisco",
  _state: "California"
};
const { street, city, _state: state, country = "United States" } = address;
console.log(street, city, state, country);
//123 Main Street San Francisco California United States
```

`street` and `city` are extracted from the `address` object. `_state` is renamed to the variable `state` (see the `:` parameter).
And default value `United States` is affected to the variable `country` if not in `address` (see the `=` parameter).

## spread operator

Destructuring is also very interesting combine with the spread operator. The spread operator or 3 dots (`...`) helps you taking the rest of a destructuring operation. This is interesting in React for example when you want to transfer all properties passed in parameter to the child component.

```jsx
// es6
const Label = ({ children, className, ...rest }) => (
  <span {...rest} className={`pf-c-label ${className}`}>
    {children}
  </span>
);
```

Here we want to get all the properties other than `children` and `className`, and pass them to our child component.

You can see in this example the force of the four ES6 properties combined. You destructure props in the arrow function parameter, you use the implicit return of the arrow function. The template literal to overwrite the className parameter of your children component, and the spread operator to apply the remaining props to your children element.

Try to see the previous code in ES5 using [online compiler](https://babeljs.io/repl). You will be amazed by the size of the equivalent ES5 code.
