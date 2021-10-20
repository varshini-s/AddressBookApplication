const checkName=(name)=>{
    let nameRegex=RegExp('^([A-Z]{1}[a-z]{2,})( [A-Z]{1}[a-z]{2,})*$');
    if(!nameRegex.test(name))
    {
        throw "Name is Incorrect";

    }
}

const checkAddress=(address)=>{

    let addressregex=RegExp("(?!^\\d+$)^[A-Z,a-z,0-9, ()#-]{3,}$");
    if(!addressregex.test(address))
    {
        throw "Address is Incorrect";

    }

}

const checkPhoneNumber=(phoneNumber)=>{

    let phoneNumberRegex=RegExp("^[+]?[91]{2}[ ]?[6-9][0-9]{9}$");
    if(!phoneNumberRegex.test(phoneNumber))
    {
        throw "Phone Number is Incorrect";

    }

}

const checkZip=(zip)=>{

    let zipRegex=RegExp("^[0-9]{3}[ ]?[0-9]{3}$");
    if(!zipRegex.test(zip))
    {
        throw "Zip is Incorrect";

    }

}

