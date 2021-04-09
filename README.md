
Meet App is a serverless, progressive web application that gives users the inside track to the happenings in their city.

A Serverless, Progressive Web App (**PWA**) made with Test Driven Development (**TDD**).

![Meet App](/img/MeetScreenShot.png)

## Built With:
* React
* Google Calendar API
* AWS Lambda
* Recharts (data visualization)

## User Stories
1. As a user,
    I should be able to filter events by city
    So that I can see the list of events that take place in that city.

	Scenario 1: Given the user hasn’t searched for any city, When the user opens the app, Then the user should see a list of all upcoming events.

	Scenario 2: Given the main page is open, When the user starts typing in the city text box, Then the user should see a list of suggested cities that match what they’ve typed.

	Scenario 3: Given the user was typing the name of a city in the city text box and the list of suggested cities was showing, When the user selects a city from the list, Then their city should be changed to that city and the user should receive a list of upcoming events in that city.


2. As a user,
    I should be able to show/hide event details
    So that I can see more/less information about an event.

   Scenario 1: Given that the user has received a list of events, When the user has not selected an event, Then that event’s element is collapsed by default.

   Scenario 2: Given that the user has received a list of events, When the user selects an event, Then the event’s element expands to show its details.

   Scenario 3: Given that the user has expanded an event element, When the user closes that event element, Then the event element collapses to hide its details.


3. As a user,
    I should be able to specify the number of events I want to view in the app
    So that I can see more or fewer events in the events list at once.

  Scenario 1: Given that the user has not specified a preferred number of events, When the user receives a list of events, Then 32 events will be listed by default.

  Scenario 2: Given that the user has specified a preferred number of events, When the user receives a list of events, Then that number of events will be listed.


4. As a user,
    I should be able to use the app while offline
    So that I can see the events I viewed the last time I was online.

  Scenario 1: Given that the user has no internet connection, When the user opens the app, Then the app will show the user’s cached events viewed in the last online session.

  Scenario 2: Given that the user has no internet connection, When the user attempts to change settings or request more data, Then the app will show an explanatory error message.


5. As a user,
  I should be able to see a chart showing the upcoming events in each city
  So that I know what events are organized in which city.

  Scenario 1: Given that the user has selected a city, When the user selects data visualization, Then the user will see a chart showing how many different kinds of events are scheduled in that city.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
