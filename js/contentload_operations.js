window.addEventListener('DOMContentLoaded', (event) => {

    const form=document.querySelector('.form');
    form.addEventListener('input',function()
    {
        document.getElementById("addButton").disabled = false;
    });


    const stateList = document.querySelector('#state').options;

    let sortedStateList = [];
    for (let index = 0; index < stateList.length; index++) {
        if (stateList[index].value) {
            sortedStateList.push(stateList[index].value);
        }

    }
    sortedStateList.sort();

    let stateOptions = "<option value=\"\" disabled selected>Select State</option>";
    for (let state in sortedStateList) 
    {
        stateOptions += "<option>" + sortedStateList[state] + "</option>";
    }
    document.getElementById("state").innerHTML = stateOptions;


    const name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new Contact()).name = name.value;
            textError.textContent = "";

        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const phoneNumber = document.querySelector('#phoneNumber');
    const phoneNumberError = document.querySelector('.phone-number-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneNumberError.textContent = "";
            return;
        }
        try {
            (new Contact()).phoneNumber = phoneNumber.value;
            phoneNumberError.textContent = "";

        }
        catch (e) {
            phoneNumberError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new Contact()).address = address.value;
            addressError.textContent = "";

        }
        catch (e) {
            addressError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipError.textContent = "";
            return;
        }
        try {
            (new Contact()).zip = zip.value;
            zipError.textContent = "";

        }
        catch (e) {
            zipError.textContent = e;
        }
    });


});