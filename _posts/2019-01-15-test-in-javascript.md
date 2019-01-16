---
layout: post
title: Test in JavaScript
author: gvincent
lang: en
tags: testing test javascript jest typescript
---

Test a JavaScript application is not as difficult as it sounds.
I propose in this blog post to see what kind of tests you can easily do in JavaScript. I will speak about the static analysis tests and unit tests. I will use Jest and Typescript to show you how you can increase your number of tests in your JavaScript application.

## Different type of testing

### End to End

End to end tests are test run by a software program simulating click and human behaviour to see if the behaviour of you application is correct.
Writing those kind of test is time consuming.

### Integration

Integration tests are test run to see if you application integrated with other system works as expected. For example you want to see if you application consuming an API works correctly.
Everything should work together in harmony.

### Unit

Every module, function or object should in an isolated world work as expected. Those kind of test are easy to write and should run instantaneously.

### Static

When your code is compiled of verified statically. You can catch typo and type errors as you write code.

## What kind of test should I choose?

Every tests are here to catch errors before sending your application in production. Tests are also a good way to give you confidence in your code to encourage refactoring.

If you plan to test correctly your application you should think of using the 4 types of testing. If you are not familiar with the pyramid of test here the recommendation for the amount of test per type:

Try to write tests for each category of the pyramid. The more you climb the pyramid, the more tests are long and expensive to write. Perform tests that are easy to write and easy to maintain. But do not forget a couple of end to end or integration tests and even some manual tests.

## Static Analysis Testing JavaScript Applications

Ok so we should introduce some static analysis testing in your application.

```js
// greetings.js
function greetingUser({ firstName, lastName }) {
  console.log(`Hello ${firstName} ${lastName}`);
}

greetingUser("Dark", "Vador"); // Hello undefined undefined
```

`greetingUser` take only one parameter and we call greetingUser with the wrong number of parameters.

All arguments in JavaScript functions are optional because a function is loosely typed. So `greetingUser("Dark", "Vador")` is a valid syntax.

JavaScript is a [weakly typed](https://en.wikipedia.org/wiki/Weak_typing) language. To enforce type in JavaScript, some people created [Typescript](https://www.typescriptlang.org/) a typed superset of JavaScript that compiles to plain JavaScript.

    npm install typescript

```typescript
// greetings.ts < see the extension
interface Person {
  firstName: string;
  lastName: string;
}

function greetingUser(person: Person) {
  const { firstName, lastName } = person;
  console.log(`Hello ${firstName} ${lastName}`);
}

greetingUser("Dark", "Vador");
//./node_modules/.bin/tsc greetings.ts
//greetings.ts:11:1 - error TS2554: Expected 1 arguments, but got 2.

//11 greetingUser("Dark", "Vador");
//   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

This help you to detect some error during the compilation.
But If you use an IDE like [vscode](https://code.visualstudio.com/) you can see greetingUser is underline in red. You to detect some error during the writing phase!

If you fix and compile your code, it will generate a javascript file:

```js
// greetings.js
function greetingUser(person) {
  var firstName = person.firstName,
    lastName = person.lastName;
  console.log("Hello " + firstName + " " + lastName);
}
greetingUser({ firstName: "Dark", lastName: "Vador" });
```

## Unit and Functional testing

Another kind of test I'm really fan of are the unit/functional tests.
Because I'm doing TDD (Test Driven Development), I write a lot of unit or functional tests.

My tests are **automated** and run **as fast as possible**. The faster my tests are, the more often I run them.

To ensure my code is doing what it should, I install a testing framework and I create a test file with some assertion.

### Unit tests

I used different testing framework but I recommend to use [Jest](https://jestjs.io/) because of his simplicity when you begin, and complexity when you want to write complex test.

    npm install jest

Let's start by writing an test:

```js
// strings.test.js
const strings = require("./strings");

test("should reverse my string", () => {
  expect(strings.reverse("abc")).toBe("cba");
});
// ./node_modules/.bin/jest
// FAIL  ./strings.test.js
//  ● Test suite failed to run

// Cannot find module './strings' from 'strings.test.js'
```

Then write the code to make the test green

```js
// strings.js
function reverse(s) {
  return s
    .split("")
    .reverse()
    .join("");
}
module.exports = {
  reverse
};
// ./node_modules/.bin/jest
//  PASS  ./strings.test.js
//  ✓ should reverse my string (4ms)
//
// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        0.773s
// Ran all test suites.
```

Those tests are run in node. Even with a lot of tests, these tests are fast.

### Functional tests: API call

Sometimes you want to test services consuming an API. Because you are writing some unit tests, you want to catch the HTTP request and simulate the response

Here a complex example: When I call my init method, I want to get the code from the url and post it on a dedicated endpoint

```js
const nock = require("nock");
const jsdom = require("jsdom");

const Keycloak = require("./index");

test("Keycloak get code from url", () => {
  // set the url for this test
  global.window = new jsdom.JSDOM("", {
    url: "http://example.org/login#code=abc"
  }).window;

  // mock the HTTP request using nock library
  const initRequest = nock("http://localhost:8180")
    .post("/auth/realms/test-realm/protocol/openid-connect/token", {
      code: "abc"
    })
    .reply(200, {
      access_token: "jwt"
    });

  const keycloak = new Keycloak({
    url: "http://localhost:8180",
    realm: "test-realm",
    clientId: "test"
  });

  // test asynchronous code
  return keycloak.init().then(authenticated => {
    // ensure initRequest is done
    expect(initRequest.isDone()).toBe(true);
    // ensure promsie parameter is true
    expect(authenticated).toBe(true);
    // check token is properly set
    expect(keycloak.token).toBe("jwt");
  });
});
```

## Functional tests: DOM objects

Sometimes you want to ensure some global object are used correctly. Jest ships with [jsdom](https://github.com/jsdom/jsdom) which simulates a DOM environment. That mean you can test functions using global DOM objects like window or localStorage.

Here an example: I want to ensure when I call the login method of my Keycloak object that `window.location.replace` is called with an encoded uri parameter

```js
test("Keycloak login redirect_uri encoded", () => {
  global.window = new jsdom.JSDOM("", {
    url: "http://localhost/login"
  }).window;
  // mock the window.location.replace method
  global.window.location.replace = jest.fn();
  const keycloak = new Keycloak();
  keycloak.login({ redirectUri: "http://example.org/login" });

  const location = window.location.replace.mock.calls[0][0];
  expect(location.split("&")[1]).toBe(
    "redirect_uri=http%3A%2F%2Fexample.org%2Flogin"
  );
});
```

Another example: I want to be sure that the redirection use the current url if no parameter specified

```js
test("Keycloak login use current url if no redirectUri", () => {
  global.window = new jsdom.JSDOM("", {
    url: "http://current.example.org/login"
  }).window;
  global.window.location.replace = jest.fn();
  const keycloak = new Keycloak();
  keycloak.login();

  const location = window.location.replace.mock.calls[0][0];
  expect(location.split("&")[1]).toBe(
    "redirect_uri=http%3A%2F%2Fcurrent.example.org%2Flogin"
  );
});
```

## Final notes on browser testing

Facebook run unit tests for thousands of test files and tens of thousands of modules directly in node. They don't run those tests in different browsers:

> After living with this problem for a while we discovered that Node tests cover our internal logic really well, and browser tests, even if we had them, don’t give us enough confidence. Many browser issues and regressions that we have had are unobservable from the code, and need actual human interaction. They are also very tedious to write and understand.

> I think at this point we won’t be investing into running our unit tests in the browser. The combination of Node unit tests and manual DOM tests seems to be working well, and further work might include making DOM fixtures easier to access. [Dan Abramov](https://github.com/facebook/react/issues/5703#issuecomment-314770489)

Tests should be easy to write and understand and give you confidence in your code.

Keep in mind that certain features are missing in DOM fixtures like the web crypto API. So if you really want to test some function, you will need to write some tests with Mocha and Karma (example [lesspass-entropy](https://github.com/lesspass/lesspass/tree/master/packages/lesspass-entropy/test)). If you are interested in this topic, tell me I will write another blog post about it.
