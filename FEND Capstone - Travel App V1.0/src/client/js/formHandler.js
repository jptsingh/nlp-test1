/* Global Variables */

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("zip").value;
    console.log(formText);

    if (Client.checkForName(formText)) {
        console.log("::: Form Submitted :::");
    } else {
        alert("Invalid name");
    }
}

export { handleSubmit };
