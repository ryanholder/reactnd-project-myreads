# MyReads Project

This is my MyReads project for Udacity's React Fundamentals course. Based on the [Starter Code for the React MyReads Project](https://github.com/udacity/reactnd-project-myreads-starter)

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── Book.js # The Book component whch is used in the BookShelf and SearchBooks components
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── BookShelf.js # A component to render a single book shelf based on it's props
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── ListBooks.js # A component to render the required book shelfs (read, wantToRead, currentlyReading)
    ├── registerServiceWorker # This lets the app load faster on subsequent visits in production
    └── SearchBooks # The component that handles search of the BooksAPI and makes use of Book component
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Links of Interest

In developing the app there were a number of resources read online in learning however some of the following are notable in that they helped drive certain decisions in how things were done.

* Set focus to input using refs
    * https://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render
    * https://facebook.github.io/react/docs/refs-and-the-dom.html
* Create Data Model and Pass Callbacks from Parent to Children
    * https://www.learnhowtoprogram.com/react/react-fundamentals/applying-react-basics
    * https://www.learnhowtoprogram.com/react/react-fundamentals/modeling-data-and-unidirectional-data-flow
    * https://facebook.github.io/react/docs/state-and-lifecycle.html#the-data-flows-down
    * https://facebook.github.io/react/docs/lifting-state-up.html
    * https://medium.com/@snirlugassy/generic-input-handler-with-react-js-44a97e22cd0d
* Listing with ESLint
    * https://www.learnhowtoprogram.com/react/react-fundamentals/building-an-environment-linting

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
