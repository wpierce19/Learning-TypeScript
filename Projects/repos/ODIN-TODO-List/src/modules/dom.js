/*import {tr} from "date-fns";*/
import project from "./project";

function renderCard(task)
{
    const container = document.querySelector(".card-container");

    const card = document.createElement("div");
    card.classList = "card";

    const title = document.createElement("h1");
    title.textContent = task.title;
    title.classList = "card-title";

    const desc = document.createElement("p");
    desc.textContent = task.desc;
    desc.classList = "card-desc";

    const dueDate = document.createElement("h2");
    dueDate.textContent = task.dueDate;
    dueDate.classList = "card-duedate";

    const priority = document.createElement("div");
    setupPriority(priority, task.priority);

    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList = "card-check";
    if (task.check == true)
    {
        check.checked = true;
    }

    container.appendChild(card);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(check);

    check.addEventListener("click", () =>
    {
        task.check = !task.check;
    })
}

function setupPriority(circle, priority)
{
    console.log(priority);
    switch (priority){
        case "High":
            circle.classList = "card-priority circle red";
            break;
        case "Medium":
            circle.classList = "card-priority circle yellow"
            break;
        case "Low":
            circle.classList = "card-priority circle green";
            break;
        default:
            break;
    }
}

function refresh()
{
    const container = document.querySelector(".card-container");
    container.innerHTML = "";
}

function fillProject(projectTasks)
{
    refresh();

    projectTasks.forEach(task =>
    {
        renderCard(task);
    });
}

function setupProjectButton(button, tasks)
{
    button.addEventListener("click", () => 
    {
        fillProject(tasks);
    })
}

function renderProjects(projectList)
{
    const sidebar = document.querySelector(".projects > ul")
    sidebar.innerHTML = "";

    projectList.forEach(e =>
    {
        const project = document.createElement("li");
        const button = document.createElement("button");
        button.classList = "sidebar-button";
        button.textContent = e.title;

        project.appendChild(button);

        sidebar.appendChild(project);

        setupProjectButton(button, e.tasks);
    });
}

export {fillProject, renderProjects};