/* Global Variables */

let baseURLgeo = "http://api.geonames.org";
const apiUsernamegeo = "vacaauto3";

let baseURLweath = "https://api.weatherbit.io/v2.0/forecast/daily?";
const apiUsernameweath = "feec0427dfbf4e879f4f58e95f6626f6";

// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

const performActionGeoname = document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const getZip = document.getElementById("zip").value;
    const appdepDate = document.getElementById("depDate").value;
    const nowTime = (Date.now()) / 1000;
    const timestamp = (new Date(appdepDate).getTime()) / 1000;
    const daysLeft = Math.round((timestamp - nowTime) / 86400);

    console.log(getZip, appdepDate, nowTime, timestamp, daysLeft);
    //We get the weather data and THEN create a POST from that data



    getReportgeo(baseURLgeo, getZip, apiUsernamegeo)
    getReportweath(baseURLweath, getZip, apiUsernameweath)
        //New Syntax!
        .then(function (data) {
            postData("/add", { appLat: data.geonames[0].lat, appLng: data.geonames[0].lng, appCtry: data.geonames[0].countryName, appTemp: data.data[0].high_temp, appdaysLeft: daysLeft });
            //This dynamically produces the data in the static web page (Dynamic UI update)
            //Hence, because of ASYNC we can wait until we received the data, posted the data & then we can update the UI
            console.log(data);
            updateUI();
        });
}

//ASYNC gives access to AWAIT, TRY & CATCH
//AWAIT makes the code wait until it gets the weather data
//FETCH call is calling the web API
const getReportgeo = async (baseURLgeo, zipGeo, keyGeo) => {
    const res = await fetch(baseURLgeo + "/searchJSON?q=" + zipGeo + "&maxRows=10&username=" + keyGeo);
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


const getReportweath = async (baseURLweath, zipWeath, keyWeath) => {
    const res = await fetch(baseURLweath + "city=" + zipWeath + "&key=" + keyWeath);
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
        document.getElementById("Lat").innerHTML = allData.appLat;
        document.getElementById("Lng").innerHTML = allData.appLng;
        document.getElementById("Ctry").innerHTML = allData.appCtry;
        document.getElementById("Temp").innerHTML = allData.appTemp;
        document.getElementById("daysLeftUI").innerHTML = allData.appdaysLeft;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
export { performActionGeoname };