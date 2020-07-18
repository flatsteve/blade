# Technologies Overview

The app is built using React and deployed via Netlify. I've tried to keep external libraries to a minimum but have utilized Immer to make immutable data in reducers easy to reason about. It really is a wonderful project: https://immerjs.github.io/immer/docs/introduction

Other than that this is all just modern React; hooks, context etc: https://reactjs.org/

## Running the project

Getting started should be super simple as the app is frontend only:

1. Clone the repo
2. Change directory into the web project `cd blade-web`
3. Install deps `npm install`
4. Start the dev server `npm start`

This Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

> Note that the application state is saved in local storage after every reducer action so if you ever get into a weird state then clearing local storage is a safe bet.

## Testing

`npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Builds

If anyone wants to help on this please just submit a PR - merges to master are auto-deployed via Netlify. I'd be super happy to have people collaborate with me on this.
