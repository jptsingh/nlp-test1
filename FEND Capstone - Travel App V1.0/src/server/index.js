
const dotenv = require('dotenv');
dotenv.config();
const fetch = require("node-fetch");
var path = require('path');

const mockAPIResponse = require('./mockAPI.js')

let baseURL = "https://api.meaningcloud.com/sentiment-2.1";

const apiKey = process.env.API_KEY;


console.log(`Your API key is ${process.env.API_KEY}`);


// Setup empty JS object to act as endpoint for all routes to hold the data

projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder connecting the server-side code to client-side code
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

// Using a more cleaner code using arrow function, a GET request is made that uses the url "/ all" and returns the object projectData.
// Create a new route named '/all', so that the route 'localhost:3000/all' will now trigger the GET request
//Every GET request produces a request, which is the data provided by the GET request, and a response, which is the data returned to the GET request.
app.get("/all", (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

//One way to collect and store user data so that you can access it later is through making an HTTP POST request.
// the post() method will handle HTTP POST requests.
//An HTTP POST request sends data to the project's endpoint, where it is stored and can be accessed through a GET request,
//In the callback function, add the data received from req.body. This is the key piece of information.
app.post("/add", (req, res) => {
    //Setting a variable named newEntry to hold the value of req.body and then send that data and also to output
    newEntry = {
        city: req.body.city,
        date: req.body.date,
        temp: req.body.temp,
        //feelings: req.body.feelings,
    };
    //Assigning the data we received to our projectData endpoint
    //This code would create a new entry in our JS object API projectData endpoint
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});