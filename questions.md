## What is the difference between Component and PureComponent? give an example where it might break my app.

The difference is that Component doesn't implement `shouldComponentUpdate()` by default, and PureComponent does implement `shouldComponentUpdate()` by default. The PureComponent performs a shallow comparison on state and props values, then if you are using PureComponent when the React Component will be mutated by state or props will be an issue. And, if you'll use children components inside your PureComponent, make sure those children are pure, too because any children components inside a PureComponent won't get re-render.

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because the Context is used to pass information for deeply contained components. A great example of this is a root component that defines a theme with `ThemeProvider`. Meanwhile, `ShouldComponentUpdate()` is being used to optimize the re-rendering of a part of the component tree (including children). In this example of the theme, if we have a PureComponent reading just a prop that is an array of items for example, and the Context is updated by another component by the state, the context propagation will be accidentally

## Describe 3 ways to pass information from a component to its PARENT.

We can pass by a callback as prop, using Context API or implementing state management with flux architecture using or not some library such as Redux.

## Give 2 ways to prevent components from re-rendering.

In React Functional components we can use the `useMemo()` and `useCallback()` hooks. `useMemo()` apply the technique of memoization and just re-render if some prop passed for your array changes, and `useCallback()` unlike `useMemo()` it doesn't cache the result, it memoizes the callback provided to it. In Class components we can use the `shouldComponentUpdate()` lifecycle.

## What is a fragment and why do we need it? Give an example where it might break my app.

The fragment is a syntax that allows us to add multiple elements to a component without wrapping them in an extra DOM node such as a div for example, because in react we need to return just a single element. I think that the only time you should use a DOM element is when you need it for styling purposes or semantic needs (like wrapping content in an article element).

## Give 3 examples of the HOC pattern.

The HOC pattern is a technique in React for reusing component logic. It's similar a Higher Order Function in Plain Javascript, but in this case is a function that takes a component and returns a new component. Some examples, are in third library such as Redux's connect, Relay's createFragmentContainer and react-router's withRouter.

## What's the difference in handling exceptions in promises, callbacks and async...await.

Callbacks - The first argument of the callback is usually named error, whereby if something goes wrong in the asynchronous function, then the callback gets called with the first argument which specifies what error has happened. If everything goes well, then the first argument will be null. This is a pattern used especially in Node.JS called error-first callback.

Promise - In promises happens the "invisible try..catch", once that it is thrown or rejected, the catch function catches the error to handle.

In Async functions is needed to declare the try...catch in your body to catch the error once if thrown after the await.

## How many arguments does setState take and why is it async.

It receives two arguments, an updater function, and an optional callback. It is async because React intentionally “waits” until all components call `setState()` in their event handlers before starting to re-render. This boosts performance by avoiding unnecessary re-renders.

## List the steps needed to migrate a Class to Function Component.

Change the Class to a function or arrow function, remove the render method and put just the return method, convert all methods to functions or arrow functions, remove references to this keyword, remove the constructor method, remove event handler bindings, changes `this.setState` to `useState()` hook, removes lifecycle methods and add hooks to handle sideEffects such as `useEffect()` and others.

## List a few ways styles can be used with components.

CSS stylesheet, CSS in JS with `styled-components` for example, inline-styling, CSS Modules.

## How to render an HTML string coming from the server.

In most cases, we can use `dangerouslySetInnerHTML` attributes to render, and it'll be enough. But, as mentioned in the React docs Setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack.