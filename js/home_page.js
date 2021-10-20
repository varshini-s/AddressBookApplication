let contactList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
});

const getContactDataFromStorage = () => {

    return localStorage.getItem('ContactList') ?
        JSON.parse(localStorage.getItem('ContactList')) : [];

}

const createInnerHtml = () => {


    const headerHTML = "<th>Fullname</th> <th>Address</th>" +
        "<th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th>";
    if (contactList.length == 0) document.querySelector('#table-display').innerHTML = "";
    let innerHtml = `${headerHTML}`;

    for (const contactData of contactList) {

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

    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contactData = contactList.find(contactData => contactData.id == node.id);

    if (!contactData) return;
    const index = contactList
        .map(contact => contact.id)
        .indexOf(contactData.id);
    contactList.splice(index, 1);

    localStorage.setItem("ContactList", JSON.stringify(contactList));
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();

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