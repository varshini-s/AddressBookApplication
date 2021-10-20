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
        let sortedCityList = stateToCityMap[value].sort();

        for (cityId in sortedCityList) {
            citiesOptions += "<option value=\"" + sortedCityList[cityId] + "\">" + sortedCityList[cityId] + "</option>";
        }
        document.getElementById("city").innerHTML = citiesOptions;

    }
}



const save = (event) => {


    event.preventDefault();
    event.stopPropagation();

    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);

    }
    catch (e) {
        return;

    }
}

const setAddressBookObject = () => {

    addressBookObj._name = getInputValueById('#name');
    addressBookObj._phoneNumber = getInputValueById('#phoneNumber');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zip = getInputValueById('#zip');
}

function createAndUpdateStorage() {
    let addressBookList = JSON.parse(localStorage.getItem("ContactList"));


    if (addressBookList) {
        let addressBookData = addressBookList
            .find(contactData => contactData._id == addressBookObj._id);

        if (!addressBookData) {
            addressBookList.push(createContactData());
        }
        else {
            const index = addressBookList
                .map(contactData => contactData._id)
                .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createContactData(addressBookData._id))
        }
    }

    else {
        addressBookList = [createContactData()]
    }

    localStorage.setItem("ContactList", JSON.stringify(addressBookList));
}

const createContactData = (id) => {

    let contactData = new Contact();
    if (!id) contactData._id = createNewContactId();
    else contactData._id = id;
    setContactData(contactData);
    return contactData;
}

const createNewContactId = () => {

    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactID", contactID);
    return contactID;
}

const setContactData = (contactData) => {
    try 
    {
        contactData.name = addressBookObj._name;
    }
    catch (e) 
    {
        setTextValue('.name-error', e);
        throw e;
    }

    try 
    {
        contactData.phoneNumber = addressBookObj._phoneNumber;
    }
    catch (e) 
    {
        setTextValue('.phone-number-error', e);
        throw e;
    }

    try 
    {
        contactData.address = addressBookObj._address;
    }
    catch (e) 
    {
        setTextValue('.address-error', e);
        throw e;
    }

    try 
    {
        contactData.zip = addressBookObj._zip;
    }
    catch (e) 
    {
        setTextValue('.zip-error', e);
        throw e;
    }

    contactData.state = addressBookObj._state;
    contactData.city = addressBookObj._city;

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

const getInputValueById =(id)=>{

    let value=document.querySelector(id).value;
    return value;
}

const resetForm = () => {

    setValue('#name', '');
    setValue('#phoneNumber', '');
    setValue('#address', '');
    setValue('#zip', '');
    setSelectedIndex('#city', 0);
    document.getElementById("city").disabled = true;
    setSelectedIndex('#state', 0);
    setTextValue('.name-error', "");
    setTextValue('.phone-number-error', "");
    setTextValue('.address-error', "");
    setTextValue('.zip-error', "");

}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}