

/* Global Variables */



function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("name").value;
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");
    postData('http://localhost:8081/test', formText)
        .then((res) => res.json())
        .then(function (res) {
            document.getElementById("generate").addEventListener("click", performAction);
            //document.getElementById("results").innerHTML = res.message;
        });
}





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



export { handleSubmit };
