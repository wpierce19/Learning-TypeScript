class task
{
    constructor(title, desc, dueDate, priority)
    {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.check = false;
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
    get dueDate()
    {
        return this._dueDate;
    }
    set dueDate(value)
    {
        this._dueDate = value;
    }
    get priority()
    {
        return this._priority;
    }
    set priority(value)
    {
        this._priority = value;
    }
}

export default task;