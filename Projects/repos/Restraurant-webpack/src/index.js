import {createMain} from "./main.js";
import {createMenu} from "./menu.js";
import {createContact} from "./contact.js";

createMain();

let nav = document.querySelector("nav");
let content = document.querySelector("#content");
nav.addEventListener("click", (e) => {
    let target = e.target;
    switch (target.id) {
        case "home":
            content.innerHTML = "";
            createMain();
            break;
        case "menu":
            content.innerHTML = "";
            createMenu();
            break;
        case "contact":
            content.innerHTML = "";
            createContact();
            break;
    }
});