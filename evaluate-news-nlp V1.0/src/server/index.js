
var path = require('path')

const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
dotenv.config();

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
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

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
        model: req.body.model,
        agreement: req.body.agreement,
        name: req.body.name,
    };
    //Assigning the data we received to our projectData endpoint
    //This code would create a new entry in our JS object API projectData endpoint
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});


/* Global Variables */


let baseURL = "https://api.meaningcloud.com/sentiment-2.1";

const apiKey = process.env.API_KEY;

console.log(`Your API key is ${process.env.API_KEY}`);

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const getbigText = document.getElementById("name").value;

    //We get the weather data and THEN create a POST from that data
    getReport(baseURL, apiKey, getbigText)
        //New Syntax!
        .then(function (data) {
            postData("/add", { model: data.model, agreement: data.main.agreement, name: data.sentence_list.text });
            //This dynamically produces the data in the static web page (Dynamic UI update)
            //Hence, because of ASYNC we can wait until we received the data, posted the data & then we can update the UI
            updateUI();
        });
}

//ASYNC gives access to AWAIT, TRY & CATCH
//AWAIT makes the code wait until it gets the weather data
//FETCH call is calling the web API
const getReport = async (baseURL, key, name) => {
    const res = await fetch(baseURL + "?key=" + key + "&lang=en&txt=" + name);
    try {
        //Here we wait & get the data in JSON format
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

//To make a POST request to our route.
const postData = async (url = "", data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        //This is how we will access the data on the server side. When sending data to a web server, the data has to be a string.
        //We can convert a JavaScript object into a string using the JavaScript method JSON.stringify(). This turns JavaScript objects and JSON data into a string for our server to receive the information.
        //Here we are turning the JavaScript object passed in the data parameter into a string.
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//Get the data we have posted ASYNC, to display on the static webpage
//1.Create selector, 2.Identify Data to udpate the Element & 3.Set appropriate property
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        // WAIT to transform into JSON data
        const allData = await request.json();
        console.log(allData);
        document.getElementById("model").innerHTML = allData.model;
        document.getElementById("agreement").innerHTML = allData.agreement;
        document.getElementById("content").innerHTML = allData.name;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};