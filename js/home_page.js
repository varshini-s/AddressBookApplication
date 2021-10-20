window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
});
const createInnerHtml = () => {

    contactList=createContactDataJSON();

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

const createContactDataJSON=()=>{
    let contactListLocal=

    [
        {
            _name: "Emma Green",
            _address: "Marve Road,Next to Maniratna,Malad(west) a ",
            _phoneNumber: "919123412341",
            _zip: "560086",
            _city: "Bagalkot",
            _state: "Karnataka"
        },
        {
            _name: "Lisa Kudrow",
            _address: "Star House, R K Singh Marg, P P Road, Andheri (east)",
            _phoneNumber: "91 9188444412",
            _zip: "560086",
            _city: "Bagalkot",
            _state: "Karnataka"
        },
        {
            _name: "Emma Green",
            _address: "Marve Road,Next to Maniratna,Malad(west)",
            _phoneNumber: "919123412341",
            _zip: "789122",
            _city: "Bagalkot",
            _state: "Karnataka"
        }
    ]


    
    return contactListLocal;
}