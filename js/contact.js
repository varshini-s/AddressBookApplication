const NAME_PATTERN = RegExp('^([A-Z]{1}[a-z]{2,})( [A-Z]{1}[a-z]{2,})*$');
const ADDRESS_PATTERN = RegExp("^[a-zA-Z0-9 ,'-,]*$");
const PHONE_NUMBER_PATTERN = RegExp("^[+]?[91]{2}[ ]?[6-9][0-9]{9}$");
const ZIP_PATTERN = RegExp("[0-9]{3}[ ]?[0-9]{3}$");

class Contact
{
   
    get name()
    {
        return this._name;
    }
    set name(name)
    {
        if (NAME_PATTERN.test(name)) 
        {
            this._name = name;
        }
        else {
            throw "Name is Invalid";
        }
    }
    get phoneNumber() 
    {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) 
    {
        if (PHONE_NUMBER_PATTERN.test(phoneNumber)) 
        {
            this._phoneNumber = phoneNumber;
        }
        else 
        {
            throw "PhoneNumber is Invalid";
        }

    }

    

}