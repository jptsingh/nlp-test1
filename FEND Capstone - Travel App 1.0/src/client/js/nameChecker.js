function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [A - Za - z];

    if (inputText.match(names)) {
        return true;
    }
    return false;




}

export { checkForName }
