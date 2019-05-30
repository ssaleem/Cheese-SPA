# Cheese-SPA

This is a single page application that provides UI to perform CRUD(Create, Read, Update, Delete) operations on various resources by making AJAX calls to a [Cheeses REST API](https://cheesemvc-api.herokuapp.com/swagger-ui.html#).

![Layout across different screens](img/app.gif)

## Contents

- [Features](#features)
- [Built with](#built-with)
- [Live Version](#live-version)

## Features

### Responsive Design

Material UI library' React components are used to build the UI and provide responsive layout acrosss various screen sizes.

### Asynchronicity and Error Handling

- Cheeses, Categories and Menu lists are fetched asynchronously and loaded in correponding views. For list loading errors or empty lists, a message is displayed that notifies the user that the data cannot be loaded so that there are no negative repercussions to the UI.

- Form validation is performed at the server side by Cheeses REST API. Appropriate error messages are populated in the form UI based on feedback form the server.

![Form Validation Errors](img/categoryError.gif)

- The forms to add new Cheese and Menu make AJAX requests to set component state and populate drop down select fields in the forms. This asynchronous data fecthing may result in calling `setState()` on a form component that was closed before the AJAX call was completed which would lead to an error. To handle this situation gracefully, `AbortController.abort()` is used upon component unmounting which sends an abort signal to AJAX calls in progress.

## Built with

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Create React App](https://github.com/facebookincubator/create-react-app) - Creates an environment to bootstrap React applications.
- [React Router](https://reacttraining.com/react-router/web) - A collection of navigational components that compose declaratively with React application.
- [prop-types](https://www.npmjs.com/package/prop-types) - Runtime type checking for React props.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - A JavaScript interface for asynchronously fetching resources.
- [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) - A JavaScript interface representing a controller object that allows to abort one or more DOM requests as and when desired.
- [Material UI](https://material-ui.com/) - MIT-licensed open source React components for faster web development.

## Live Version

The live version of this app can be explored at either of the following links.

- [Github Deployment](https://ssaleem.github.io/Cheese-SPA)
- [Netlify Deployment](https://cheese-spa.netlify.com/)
