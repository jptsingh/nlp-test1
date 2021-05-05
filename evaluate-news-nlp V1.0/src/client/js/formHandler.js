const dotenv = require('dotenv');
dotenv.config();


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

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("name").value;
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");
    fetch("http://localhost:8080/test")
        .then((res) => res.json())
        .then(function (res) {
            document.getElementById("results").innerHTML = res.message;
        });
}

export { handleSubmit };
