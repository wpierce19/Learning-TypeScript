export function createContact() {
    let content = document.querySelector("#content");
    let address = document.createElement("div");
    address.innerHTML = 
        "<p> You can find us at: <br> 1234 Euclid St Aurora</p>";

    content.appendChild(address);
}