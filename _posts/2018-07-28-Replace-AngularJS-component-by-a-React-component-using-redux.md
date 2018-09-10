---
layout: post
title: Replace AngularJS component by a React component using redux
author: gvincent
lang: fr
tags: angularjs react redux
---

Redux is a state management library for Javascript applications. I use it in big React or AngularJS applications.
In order to migrate efficiently from AngularJS to React, I transformed my AngularJS 1.6 components to smaller components using redux.

I can create a component and connect state to them.
Like this I separate my redux store from my components.
All actions and state values from redux are decoupled from my component and passed as props to it.  

One strategy for your AngularJS to React migration is to start one component per component. In this blog post I will show you how to replace an AngularJS component using redux by a React component.

## Typical AngularJS component binded with redux

Example of a Menu component using `user` from state and `logout` action

```
Menu
├── Menu.js
├── MenuController.js
└── Menu.html
```

`Menu.html`

```html
<ul class="Menu">
    <li>
        <a href="/settings">{{ user.name }}</a>
    </li>
    <li>
        <button type="button" class="btn btn-link" ng-click="$ctrl.logout()">
            logout
        </button>
    </li>
</ul>
```

`MenuController.js`


```js
import { logout } from "auth/authActions";

class MenuController {
  constructor($scope, $ngRedux) {
    this.$ngRedux = $ngRedux;
    let unsubscribe = $ngRedux.connect(this.mapStateToProps, this.mapDispatchToProps)(this);
    $scope.$on("$destroy", unsubscribe);
  }
  
  mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }
}

MenuController.$inject = ["$scope", "$ngRedux"];
```

This is the recommended way to connect [ng-redux](https://github.com/angular-redux/ng-redux) the Angular binding for redux in an AngularJS component.

`Menu.js`

```js
import template from "./Menu.html";
import controller from "./MenuController";

export default {
  template,
  controller
};
```

You can import your Angular Component into your App


```js
import Menu from "./Menu";

angular
  .module("app", [ngRedux])
  .component("myMenu", Menu);
```

## React Menu component

We can now create a React component with the same behaviour

`MenuReact.js`


```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "auth/authActions";

export class Menu extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <ul className="Menu">
        <li>
          <a href="/settings">{user.name}</a>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => logout()}
          >
            logout
          </button>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

```


You can see the difference between the HTML and the JSX. `class` => `className`, `ng-click` => `onClick`, `"$ctrl.logout()"` => `{() => logout()}`

You can see the `mapStateToProps` and `mapDispatchToProps` equivalence. Redux is framework agnostic. It's interesting to note that the more work you do in redux, the easier the migration will be.

## Connect problem

In a regular React application, we integrate our containers to the store, using the method connect from react-redux. It works because all our components are under the Provider component.


```jsx
ReactDOM.render(
  <Provider store={store}>
    <Menu />
  </Provider>,
  document.getElementById('root')
)
```

In a typical AngularJS redux application we don't have the same mechanism. We cannot take our React component and replace it as this in our AngularJS application.

Every component is a root component. So we should use a High Order Component (HOC) to insert the `Provider` as a wrapper when necessary.

You can use `redux-connect-standalone` HOC:


```js
npm install redux-connect-standalone
```

`store.js`


```js
import createConnect from 'redux-connect-standalone';

export const rootReducer = combineReducers({...});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

export const connect = createConnect(store);
```

You can now replace `import { connect } from "react-redux";` by `import { connect } from "../store";` in your `MenuReact.js` file.

## react2angular

We can now replace our AngularJS component by our new fresh React one. To do so, we are going to use `react2angular` and `prop-types` npm modules.

```js
npm install react2angular prop-types
```

`prop-types` is used to add props info to our component to avoid specifying them in `react2angular`.

Just add the following code into `MenuReact.js`


```js
Menu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
```

We can now replace our AngularJS component by our React one


```js
import Menu from "./Menu/MenuReact";
import { react2angular } from "react2angular";

angular
  .module("app", [ngRedux])
  .component("myMenu", react2angular(Menu))
```

We will discuss in another post the good strategy to facilitate the migration.
