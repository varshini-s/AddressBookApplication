var isUpdate = false;
var addressBookObj = {};

var stateToCityMap = {
    "Rajasthan": ["Bikaner", "Jaisalmer", "Jodhpur", "Udaipur", "Ajmer"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
    "Kerala": ["Kochi", "Kozhikode", "Thrissur", "Malappuram"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Mandya", "Hassan", "Bagalkot"],
    "Assam": ["Guwahati", "Tezpur", "Dibrugarh", "Silchar", "North Lakhimpur"],
    "Tamil Nadu": ["Tiruchirappalli", "Madurai", "Erode", "Vellore", "Coimbatore"],
    "Meghalaya": ["Cherrapunji", "Tura", "Jowai", "Baghmara", "Nongpoh"]
}

function getCityOptions(value) {
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

function resetSelection() {
    document.getElementById("state").selectedIndex = 0;
    document.getElementById("city").selectedIndex = 0;
}



const save = (event) => {

    event.preventDefault();
    event.stopPropagation();

    try {
        setAddressBookObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }
        else {
            createOrUpdateAddressBookContact();
        }

    }
    catch (e) {
        return;

    }
}

const createOrUpdateAddressBookContact = () => {

    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postURL = postURL + addressBookObj.id.toString();
    }

    makeServiceCall(methodCall, postURL, true, addressBookObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        })

}

const setAddressBookObject = () => {

    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        addressBookObj.id = createNewContactId();
    }

    addressBookObj._name = getInputValueById('#name');
    addressBookObj._phoneNumber = getInputValueById('#phoneNumber');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zip = getInputValueById('#zip');
}

function createAndUpdateStorage() {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));


    if (addressBookList) {
        let addressBookData = addressBookList
            .find(contactData => contactData.id == addressBookObj.id);

        if (!addressBookData) {
            addressBookList.push(addressBookObj);
        }
        else {
            const index = addressBookList
                .map(contactData => contactData.id)
                .indexOf(addressBookData.id);
            addressBookList.splice(index, 1, addressBookObj)
        }
    }

    else {
        addressBookList = [addressBookObj]
    }

    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createNewContactId = () => {

    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactID", contactID);
    return contactID;
}

const getInputValueById = (id) => {

    let value = document.querySelector(id).value;
    return value;
}


const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editContact');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}