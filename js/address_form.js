
var stateToCityMap = {
    "Rajasthan": ["Bikaner", "Jaisalmer", "Jodhpur", "Udaipur", "Ajmer"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
    "Kerala": ["Kochi", "Kozhikode", "Thrissur", "Malappuram"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Mandya", "Hassan", "Bagalkot"],
    "Assam": ["Guwahati", "Tezpur", "Dibrugarh", "Silchar", "North Lakhimpur"],
    "Tamil Nadu": ["Tiruchirappalli", "Madurai", "Erode", "Vellore", "Coimbatore"],
    "Meghalaya": ["Cherrapunji", "Tura", "Jowai", "Baghmara", "Nongpoh"]
}

function getCityOptions(value) 
{
    document.getElementById("city").disabled = false;

    if (value.length == 0) {
        document.getElementById("city").innerHTML = "<option></option>";
    }
    else {
        let citiesOptions = "<option value=\"\" disabled selected>Select City</option>";
        let sortedCityList=stateToCityMap[value].sort();
        
        for (cityId in sortedCityList) 
        {
            citiesOptions += "<option value=\"" + sortedCityList[cityId] + "\">" + sortedCityList[cityId] + "</option>";
        }
        document.getElementById("city").innerHTML = citiesOptions;

    }
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

