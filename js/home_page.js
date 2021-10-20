let contactList;

window.addEventListener('DOMContentLoaded', (event) => {

    if (site_properties.use_local_storage.match("true")) 
    {
        getContactDataFromStorage();
    }
    else 
    {
        getContactDataFromServer();
    }

});

const getContactDataFromStorage = () => {

    contactList = localStorage.getItem('ContactList') ?
        JSON.parse(localStorage.getItem('ContactList')) : [];

    processAddressBookDataResponse();
}

const processAddressBookDataResponse = () => {

    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
}

const getContactDataFromServer = () => {


    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            contactList = JSON.parse(responseText);
            processAddressBookDataResponse();
        })
        .catch(error => {
            console.log("GET Error status: " + JSON.stringify(error));
            contactList = [];
            processAddressBookDataResponse();


        });

}
const createInnerHtml = () => {

    const headerHTML = "<th>Fullname</th> <th>Address</th>" +
        "<th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th>";
    if (contactList.length == 0) document.querySelector('#table-display').innerHTML = "";

    let innerHtml = getInnerHtmlFromContactList(`${headerHTML}`);


    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getInnerHtmlFromContactList = (innerHtml) => {
    for (const contactData of contactList) 
    {

        innerHtml = `${innerHtml}
        
        <tr>
        <td>${contactData._name}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phoneNumber}</td>
        <td>
            <img id="${contactData.id}" onclick="remove(this)" alt="delete"
                    src="../assets/icons/delete-black-18dp.svg">
            <img id="${contactData.id}" alt="edit" onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }

    return innerHtml;
};

const findContactDataFromList = (node) => contactData = contactList.find(contact => contact.id == node.id);

const remove = (node) => {
    let contactData = findContactDataFromList(node);

    if (!contactData) return;
    const index = contactList
        .map(contact => contact.id)
        .indexOf(contactData.id);
    contactList.splice(index, 1);

    if (site_properties.use_local_storage.match("true")) 
    {
        removeContactFromLocalStorage();

    }
    else {
        removeContactFromServer();
    }

    if (contactList.length == 0) {
        localStorage.setItem("ContactID", 0);

    }
}

const update=(node)=>{
    let contactData=contactList.find(contact=>contact.id==node.id)
    if (!contactData) return;
    localStorage.setItem('editContact',JSON.stringify(contactData))
    window.location.replace(site_properties.address_form_page);
}