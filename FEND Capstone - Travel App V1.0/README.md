# FEND Capstone Travel app

## Overview
This is the Udacity Project created by me for giving the details of a location including temperature, image and other geographic details.

## Instructions
User will enter the City name & the start & end dates of travel and based on that the app will display the destination location details on clicking the button "Generate"


## Extend Options / Ways to Stand Out:
The trip start & end date have been used to display the length of the trip.

## Key points in the code:
client->js->app.js:

For the user input we get the Travel data from the three urls and THEN create a POST from that data

 Added a chain (.then()) to make sure that data has been posted so that it will be available when updating the UI

We do logs of the object before sending it to make sure all data are fine

ASYNC gives access to AWAIT, TRY & CATCH
AWAIT makes the code wait until it gets the Travel data
FETCH call is used for calling the web API

Body data type must match "Content-Type" header. When sending data to a web server, the data has to be a string. We can convert a JavaScript object into a string using the JavaScript method JSON.stringify(). This turns JavaScript objects and JSON data into a string for our server to receive the information. We turn the JavaScript object passed in the myData parameter, into a string.

Get the data we have posted ASYNC, to display on the static webpage:

1.Create selector
2.Identify Data to udpate the Element
3.Set appropriate property


server->index.js
Setup empty JS object projectData  to act as endpoint for all routes to hold the data

Require Express to run server and routes, Cors for cross origin allowance, Configured express to use body-parser as middle-ware.

Initialized the main project folder connecting the server-side code to client-side code
Designated what port 8081 the app will listen to for incoming requests

Using a more cleaner code using arrow function, a GET request is made that uses the url "/ all" and returns the object projectData.

Created a new route named '/all', so that the route will now trigger the GET request. Every GET request produces a request, which is the data provided by the GET request, and a response, which is the data returned to the GET request.

One way to collect and store user data so that you can access it later is through making an HTTP POST request. The post() method will handle HTTP POST requests.

An HTTP POST request sends data to the project's endpoint, where it is stored and can be accessed through a GET request. In the callback function, add the data received from req.body. This is the key piece of information. Setting a variable named newEntry to hold the value of req.body and then send that data and also to output

Assigned the data received to our projectData endpoint which would create a new entry in our JS object API projectData endpoint

formHandler.js & nameChecker.js have been used for validating the correct name using only numeric values A - Za - z.

In index.html, check that service workers are supported and Use the window load event to keep the page load per performance


## Program execution:
Dev server: To start the webpack dev server at port 8081 run $ npm run build-dev
Production server: To start the webpack production server at port 8081 run $ npm run build-prod & $ npm run start


## Extras
http://api.geonames.org, https://api.weatherbit.io/, https://pixabay.com have been referred to generate the output using their API along with the api key and location input.

Architecture:
- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - src folder
    - server folder
      - `index.js`
    - client folder
      - `index.js`
      - views folder
        - `index.html`
      - js folder
        - `app.js`
        - `formHandler.js`
        - `nameChecker.js`
      - styles folder
        - `style.scss`
    - _test_ folder
    - dist folder

Webpack: Webpack config contains the scripts, express server, build and test.

Testing: There is one test for the express server and application javascript.

Offline capabilities: The project has service workers installed.