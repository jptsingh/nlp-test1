

/* Global Variables */



function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("name").value
    console.log(formText);

    if (Client.checkForName(formText)) {

        console.log("::: Form Submitted :::");

        fetch('http://localhost:8081/test', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            // Body data type must match "Content-Type" header
            //This is how we will access the data on the server side. When sending data to a web server, the data has to be a string.
            //We can convert a JavaScript object into a string using the JavaScript method JSON.stringify(). This turns JavaScript objects and JSON data into a string for our server to receive the information.
            //Here we are turning the JavaScript object passed in the data parameter into a string.
            body: JSON.stringify({ name: formText })
        }

        )

            .then((res) => res.json())
            .then(function (res) {
                console.log(res);
                //  document.getElementById("generate").addEventListener("click", performAction);
                document.getElementById("model").innerHTML = res.model;
                document.getElementById("agreement").innerHTML = res.agreement;
                document.getElementById("content").innerHTML = res.subjectivity;
                // document.getElementById("content").innerHTML = res.sentence_list.text;
                //document.getElementById("results").innerHTML = res.message;
            })


    } else {
        alert('Invalid url or key');

    }

}







export { handleSubmit };
