 export function createMain() {
    let content = document.querySelector("#content");
    let heading = document.createElement("h1");
    heading.textContent = "Wyatt's BBQ";
    let tagline = document.createElement("p");
    tagline.textContent = "We are the best BBQ place around town!";
    content.appendChild(heading);
    content.appendChild(tagline);
 };