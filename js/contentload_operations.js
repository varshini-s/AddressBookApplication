window.addEventListener('DOMContentLoaded', (event) => {

    setAddButtonDisableProperty();
    sortAndDisplayStateOptions();

    const name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    validateAndDisplayError(name, textError, checkName);

    const phoneNumber = document.querySelector('#phoneNumber');
    const phoneNumberError = document.querySelector('.phone-number-error');
    validateAndDisplayError(phoneNumber, phoneNumberError, checkPhoneNumber);

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    validateAndDisplayError(address, addressError, checkAddress);

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    validateAndDisplayError(zip, zipError, checkZip);

    document.querySelector('.cancelLink').href = site_properties.home_page;
    checkForUpdate();


});

const setAddButtonDisableProperty = () => {

    checkAllInputFieldsAreFilled();
    checkNoInvalidInput();
};


const checkAllInputFieldsAreFilled = () => {
    const name = document.querySelector('#name');
    const phoneNumber = document.querySelector('#phoneNumber');
    const address = document.querySelector('#address');
    const zip = document.querySelector('#zip');
    const city = document.querySelector('#city');
    const state = document.querySelector('#state');

    const form = document.querySelector('.form');
    form.addEventListener('input', function () {
        if (name.value == "" || phoneNumber.value == "" || address.value == "" || zip.value == "" || state.selectedIndex == 0 || city.selectedIndex == 0) {
            document.getElementById("addButton").disabled = true;
        }
        else {
            document.getElementById("addButton").disabled = false;

        }
    });
};

const checkNoInvalidInput = () => {
    const form = document.querySelector('.form');
    form.addEventListener('input', () => {
        const textError = document.querySelector('.name-error');
        const phoneNumberError = document.querySelector('.phone-number-error');
        const addressError = document.querySelector('.address-error');
        const zipError = document.querySelector('.zip-error');

        if (textError.textContent != "" || phoneNumberError.textContent != "" || addressError.textContent != "" || zipError.textContent != "") {
            document.getElementById("addButton").disabled = true;
        }
        else {
            document.getElementById("addButton").disabled = false;

        }
    });
};

const validateAndDisplayError = (inputField, errorField, validationFunction) => {

    inputField.addEventListener('input', function () {
        if (inputField.value.length == 0) {
            errorField.textContent = "";
            return;
        }
        try {
            validationFunction(inputField.value);
            errorField.textContent = "";

        }
        catch (e) {
            errorField.textContent = e;
        }
    });

};


const sortAndDisplayStateOptions = () => {

    const stateList = document.querySelector('#state').options;

    let sortedStateList = [];
    for (let index = 0; index < stateList.length; index++) {
        if (stateList[index].value) {
            sortedStateList.push(stateList[index].value);
        }

    }
    sortedStateList.sort();

    let stateOptions = "<option value=\"\" disabled selected>Select State</option>";
    for (let state in sortedStateList) {
        stateOptions += "<option>" + sortedStateList[state] + "</option>";
    }
    document.getElementById("state").innerHTML = stateOptions;

}