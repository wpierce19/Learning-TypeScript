document.addEventListener("DOMContentLoaded", () =>
{
    const form = document.getElementById("form");
    const email = document.getElementById("mail");
    const country = document.getElementById("country");
    const zip = document.getElementById("zip")
    const password = document.getElementById("password");
    const successMessage = document.getElementById("successMessage");

    //errors
    const emailError = document.getElementById("emailError");
    const countryError = document.getElementById("countryError");
    const zipError = document.getElementById("zipError");
    const passError = document.getElementById("passwordError");

    function validateEmail()
    {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim())
        {
            emailError.textContent = "Email is Required";
            email.classList.remove("valid");
            email.classList.add("invalid");
            return false;
        }
        if (!email.value.includes("@"))
        {
            emailError.textContent = "Email must include the '@' symbol.";
            email.classList.remove("valid");
            email.classList.add("invalid");
            return false;   
        }
        if (!emailPattern.test(email.value))
        {
            emailError.textContent = "Enter valid email address";
        }
        emailError.textContent = "";
        email.classList.remove("invalid");
        email.classList.add("valid");
        return true;
    }
    function validatecountry()
    {
        if (!country.value.trim() || /\d/.test(country.value))
        {
            countryError.textContent = "Enter a valid country";
            country.classList.remove("valid");
            country.classList.add("invalid");
            
            return false;
        }
        countryError.textContent = "";
        country.classList.remove("invalid");
        country.classList.add("valid");
        return true;
    }
    function validateZip()
    {
        if (!zip.value.trim() || !/\d/.test(zip.value))
        {
            zipError.textContent = "Enter a valid Zip-Code";
            zip.classList.remove("valid");
            zip.classList.add("invalid");
            return false;
        }
        zipError.textContent = "";
        zip.classList.remove("invalid");
        zip.classList.add("valid");
        return true;
    }
    function validatePass()
    {
        if (!password.value.trim())
        {
            passError.textContent = "Enter a valid password";
            password.classList.remove("valid");
            password.classList.add("invalid");
            return false;
        }
        if (password.value.length < 6)
        {
            passError.textContent = "Password must be longer than 6 characters";
            password.classList.remove("valid");
            password.classList.add("invalid");
            return false;
        }
        passError.textContent = "";
        password.classList.remove("invalid");
        password.classList.add("valid");
        return true;
    }

    //event listeners for form inputs
    email.addEventListener("input", validateEmail);
    country.addEventListener("input", validatecountry);
    zip.addEventListener("input", validateZip);
    password.addEventListener("input", validatePass);

    form.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isCountryValid = validatecountry();
        const isZipValid = validateZip();
        const isPasswordValid = validatePass();

        if (isEmailValid && isCountryValid && isZipValid && isPasswordValid)
        {
            successMessage.textContent = "High five! 🎉 Form submitted successfully!";
        }
        else {
            successMessage.textContent = "";
        }
    });

});

