window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).name = name.value;
            textError.textContent = "";

        }
        catch (e) {
            textError.textContent = e;
        }
    });
    
});

