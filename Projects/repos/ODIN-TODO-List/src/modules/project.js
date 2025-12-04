import { renderProjects } from "./dom";

class project
{
    constructor(tasks = [], title, desc)
    {
        this.tasks = tasks;
        this.title = title;
        this.desc = desc;
        this.id = null;
    }

    get tasks()
    {
        return this._tasks;
    }
    set tasks(value)
    {
        this._tasks = value;
    }
    get title()
    {
        return this._title;
    }
    set title(value)
    {
        this._title = value;
    }
    get desc()
    {
        return this._desc;
    }
    set desc(value)
    {
        this._desc = value;
    }

    addTask(task)
    {
        this._tasks.push(task);
    }
}

function addProject(projectList,project)
{
    project.id = projectList.length;
    projectList.push(project);

    renderProjects(projectList);
}

export default project;
export {addProject};