const setForm = () => {

    setValue('#name', contactObj._name);
    setValue('#phoneNumber', contactObj._phoneNumber);
    setValue('#address', contactObj._address);
    setValue('#state', contactObj._state);
    getCityOptionsForGivenState(contactObj._state);
    setValue('#city', contactObj._city);
    setValue('#zip', contactObj._zip);
}

const resetForm = () => {

    setValue('#name', '');
    setValue('#phoneNumber', '');
    setValue('#address', '');
    setValue('#zip', '');
    setSelectedIndex('#city', 0);
    setSelectedIndex('#state', 0);
    setTextValue('.name-error', "");
    setTextValue('.phone-number-error', "");
    setTextValue('.address-error', "");
    setTextValue('.zip-error', "");
    document.getElementById("city").disabled = true;
    document.getElementById("addButton").disabled = true;
    document.getElementById("resetButton").disabled = true;



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