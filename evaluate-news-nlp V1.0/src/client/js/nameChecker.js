function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = /^[A-Za-z]/;

    if (inputText.match(names)) {
        alert("Text has valid characters")
    }



}

export { checkForName }
