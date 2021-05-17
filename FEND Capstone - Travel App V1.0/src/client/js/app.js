/* Global Variables */

let baseURLgeo = "http://api.geonames.org";
const apiUsernamegeo = "vacaauto3";

let baseURLweath = "https://api.weatherbit.io/v2.0/forecast/daily?";
const apiUsernameweath = "feec0427dfbf4e879f4f58e95f6626f6";

let baseURLpixa = "https://pixabay.com/api/";
const apiUsernamepixa = "21617916-cb494d32b89647fabfb7fa206";

const performActionGeoname = document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const getZip = document.getElementById("zip").value;
    const appdepDate = document.getElementById("depDate").value;
    const appendDate = document.getElementById("endDate").value;
    const dateToday = Date.now() / 1000;
    const timestampDep = new Date(appdepDate).getTime() / 1000;
    const timestampEnd = new Date(appendDate).getTime() / 1000;
    const daysLeft = Math.round((timestampDep - dateToday) / 86400);
    const tripLen = Math.round((timestampEnd - timestampDep) / 86400);

    //We get the Travel data and THEN create a POST from that data

    getReportgeo(baseURLgeo, getZip, apiUsernamegeo).then((geonamesData) => {
        // Now geonames data is available
        getReportweath(baseURLweath, getZip, apiUsernameweath).then((weatherData) => {
            // Now weather data is available
            getReportpixa(baseURLpixa, apiUsernamepixa, getZip).then((pixabayData) => {
                // Now pixabay data is available
                let myData = {
                    appLat: geonamesData.geonames[0].lat,
                    appLng: geonamesData.geonames[0].lng,
                    appCtry: geonamesData.geonames[0].countryName,
                    appTemp: weatherData.data[0].high_temp,
                    appImg: pixabayData.hits[0].webformatURL,
                    appdaysLeft: daysLeft,
                    apptripLen: tripLen,
                };
                // log the object before sending it to make sure all data are fine
                console.log(myData);
                // Add a chain (.then()) here to make sure that data has been posted
                // so that it will be available when updating the UI
                postData("/add", myData).then(() => {
                    updateUI();
                });
            });
        });
    });
}

//ASYNC gives access to AWAIT, TRY & CATCH
//AWAIT makes the code wait until it gets the Travel data
//FETCH call is calling the web API

//getReportgeo fn is executed
const getReportgeo = async (baseURLgeo, zipGeo, keyGeo) => {
    const res = await fetch(baseURLgeo + "/searchJSON?q=" + zipGeo + "&maxRows=10&username=" + keyGeo);
    try {
        //Here we wait & get the data in JSON format
        const myData = await res.json();
        console.log(myData);
        return myData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

//getReportweath fn is executed

const getReportweath = async (baseURLweath, zipWeath, keyWeath) => {
    const res = await fetch(baseURLweath + "city=" + zipWeath + "&key=" + keyWeath);
    try {
        //Here we wait & get the data in JSON format
        const myData = await res.json();
        console.log(myData);
        return myData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

//getReportpixa fn is executed

const getReportpixa = async (baseURLpixa, keyPixa, zipPixa) => {
    const res = await fetch(baseURLpixa + "?key=" + keyPixa + "&q=" + zipPixa + "+city&image_type=photo");
    try {
        //Here we wait & get the data in JSON format
        const myData = await res.json();
        console.log(myData);
        return myData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

//To make a POST request to our route.
const postData = async (url = "", myData = {}) => {
    console.log(myData);
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
        body: JSON.stringify(myData),
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
        document.getElementById("tripLenUI").innerHTML = allData.apptripLen;
        document.getElementById("img").src = allData.appImg;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
export { performActionGeoname };
