import "./style.css";
import project, {addProject} from "./modules/project";
import task from "./modules/tasks";
import {closeProjectButton, closeTaskButton, newProjectButton, newTaskButton, saveProjectButton, saveTaskButton} from "./modules/buttons";
import {fillProject} from "./modules/dom"

let list = [];

newTaskButton(list);
closeTaskButton();
newProjectButton();
closeProjectButton();

saveProjectButton(list);

let defaultProject = new project([], "Default", "na");

addProject(list, defaultProject);

saveTaskButton(defaultProject, list);

let task1 = new task("Walk Murphy", "Take Murphy out for a walk", "12/10/2024", "High");
let task2 = new task("Get Groceries", "Buy milk, bread, chicken, water, eggnog", "12/11/2024", "Medium")
let task3 = new task("Workout", "Go and workout for 2 hours", "12/10/2024", "Medium")
let task4 = new task("Updated Grades", "Keep an eye out for final grades", "12/10/2024", "Low")


defaultProject.addTask(task1);
defaultProject.addTask(task2);
defaultProject.addTask(task3);
defaultProject.addTask(task4);

fillProject(defaultProject.tasks);