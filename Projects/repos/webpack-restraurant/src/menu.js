export function createMenu() {
    let content = document.querySelector("#content");
    let heading = document.createElement("h1");
    heading.textContent = "Our Menu";
    let tagline = document.createElement("p");
    tagline.textContent = "So many plate, but so little time";

    let items = document.createElement("div");
    items.className = "items";
    let figure_brisket = document.createElement("p");
    figure_brisket.textContent = "Brisket";

    let figure_beans = document.createElement("p");
    figure_beans.textContent = "Baked Beans";

    let figure_chicken = document.createElement("p");
    figure_chicken.textContent = "BBQ Chicken";

    content.appendChild(heading);
    content.appendChild(tagline);
    content.appendChild(items);
    items.appendChild(figure_beans);
    items.appendChild(figure_brisket);
    items.appendChild(figure_chicken);
};