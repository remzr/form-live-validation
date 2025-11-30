//Email validation
//this@provider.com or this@server (local)
const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", (event)=> {
    if (email.validity.valid) {
        emailError.textContent = ""; //Remove message if mail is valid
    } else {
        showError("email");
    }
});

//Postal code validation
//CH - 4 digits - 2502
//AT - 4 digits - 1020 (First digit shows district, but this is not important for validation)
//DE - 5 digits - 50232
//FR - 5 digits - 75001
//LI - 4 digits - 9490 (Always starts with 94)
const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const postalCodeError = document.querySelector("#postal-code + span.error");

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);

function checkPostalCode() {
    const constraints = {
        ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        at: [
        "^(AT-)?\\[1-9]d{3}$",
        "Austrian postal codes must have exactly 4 digits, where the first digit cannot be 0",
        ],
        li: [
        "^(LI-)?\\94d{2}$",
        "Postal codes for Liechtenstein must have exactly 4 digits that start with 94: e.g. LI-9402 or 9402",
        ]
    }

    //Constraint checker
    const country = countrySelect.value;

    const constraint = new RegExp(constraints[country][0], "");

    if (constraint.test(postalCodeField.value)) {
        postalCodeError.textContent = `${postalCodeField.setCustomValidity("")}` //Remove message if mail is valid
    } else {
        showError("postal");
    }
};

//Password validation
//Min: 8 digits, 1 number, 1 letter, max 30 digits


//Prevent submit if any fields are invalid

form.addEventListener("submit", (event) => {
    if (!email.validity.valid || !postalCodeField.validity.valid) {
        showError();
        event.preventDefault();
    }
})

function showError(field) {
    if (field == "email") {
        if (email.validity.valueMissing) {
            emailError.textContent = "Please enter a valid email adress.";
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "Entered value needs to be an email adress";
        } else if (email.validity.tooShort) {
            emailError.textContent = `Email should be at least ${email.minLength} charactes long.`
        }
        emailError.className = "error active";
    } else if (field == "postal") {
        postalCodeError.textContent = `${constraints[country][1]}`
    }
}