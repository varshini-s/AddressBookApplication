
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



const save=(event)=>{


    event.preventDefault();
    event.stopPropagation();

    try {

        let contactData= createContactData();
        createAndUpdateStorage(contactData);
        resetForm();
        window.location.replace(site_properties.home_page);
        
    }
     catch (e) 
    {
        return;
        
    }
}


const createContactData=()=>{

    let contactData = new Contact();
    
    try
    {
        contactData.name =getInputValueById('#name');
    }
    catch(e)
    {
        setTextValue('.name-error',e);
        throw e;
    }
    
    try
    {
        contactData.address=getInputValueById('#address');
    }
    catch(e)
    {
        setTextValue('.address-error',e);
        throw e;
    }

    try
    {
        contactData.phoneNumber=getInputValueById('#phoneNumber');
    }
    catch(e)
    {
        setTextValue('.phone-number-error',e);
        throw e;
    }

    try
    {
        contactData.zip=getInputValueById('#zip');
    }
    catch(e)
    {
        setTextValue('.zip-error',e);
        throw e;
    }
    contactData.city=getInputValueById('#city');
    contactData.state=getInputValueById('#state');

    return contactData;
        
}

function createAndUpdateStorage(contactData)
{
    let contactList=JSON.parse(localStorage.getItem("ContactList"));
    
    if(contactList!=undefined)
    {
        contactList.push(contactData);
    }
    else
    {
        contactList=[contactData]
    }

    localStorage.setItem("ContactList",JSON.stringify(contactList));
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

