
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')

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
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8083, function () {
    console.log('Example app listening on port 8083!')
})

//app.post('/test', function (req, res) {
//    res.send(mockAPIResponse)
//})

// Using a more cleaner code using arrow function, a GET request is made that uses the url "/ all" and returns the object projectData.
// Create a new route named '/all', so that the route 'localhost:3000/all' will now trigger the GET request
//Every GET request produces a request, which is the data provided by the GET request, and a response, which is the data returned to the GET request.
app.post("/test", (req, res) => {
    inputText = req.body.name;
    res = fetch(baseURL + "?key=" + apiKey + "&lang=en&txt=" + inputText);
    const projectData = res.json();


    res.send(projectData);
    console.log(projectData);
});


