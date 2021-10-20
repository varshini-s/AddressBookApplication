var isUpdate = false;
var contactObj = {};

var stateToCityMap = {
    "Rajasthan": ["Bikaner", "Jaisalmer", "Jodhpur", "Udaipur", "Ajmer"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
    "Kerala": ["Kochi", "Kozhikode", "Thrissur", "Malappuram"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Mandya", "Hassan", "Bagalkot"],
    "Assam": ["Guwahati", "Tezpur", "Dibrugarh", "Silchar", "North Lakhimpur"],
    "Tamil Nadu": ["Tiruchirappalli", "Madurai", "Erode", "Vellore", "Coimbatore"],
    "Meghalaya": ["Cherrapunji", "Tura", "Jowai", "Baghmara", "Nongpoh"]
}

const getCityOptionsForGivenState = (value) => {
    document.getElementById("city").disabled = false;

    if (value.length == 0) {
        document.getElementById("city").innerHTML = "<option></option>";
    }
    else {
        let citiesOptions = "<option value=\"\" disabled selected>Select City</option>";
        let sortedCityList = stateToCityMap[value].sort();

        for (cityId in sortedCityList) {
            citiesOptions += "<option value=\"" + sortedCityList[cityId] + "\">" + sortedCityList[cityId] + "</option>";
        }
        document.getElementById("city").innerHTML = citiesOptions;

    }
};


const save = (event) => {

    event.preventDefault();
    event.stopPropagation();

    try {
        setAddressBookObject();
        if (site_properties.use_local_storage.match("true")) {
            createOrUpdateLocalStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }
        else {
            createOrUpdateDataInServer();
        }

    }
    catch (e) {
        return;

    }
}

const createOrUpdateDataInServer = () => {

    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postURL = postURL + contactObj.id.toString();
    }

    makeServiceCall(methodCall, postURL, true, contactObj)
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
        contactObj.id = createNewContactId();
    }

    contactObj._name = getInputValueById('#name');
    contactObj._phoneNumber = getInputValueById('#phoneNumber');
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
}

const createOrUpdateLocalStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));


    if (contactList) {
        let contactData = contactList
            .find(contactData => contactData.id == contactObj.id);

        if (!contactData) {
            contactList.push(contactObj);
        }
        else {
            const index = contactList
                .map(contactData => contactData.id)
                .indexOf(contactData.id);
            contactList.splice(index, 1, contactObj)
        }
    }

    else {
        contactList = [contactObj]
    }

    localStorage.setItem("ContactList", JSON.stringify(contactList));
};

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
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    contactObj = JSON.parse(contactJson);
    setForm();
}

