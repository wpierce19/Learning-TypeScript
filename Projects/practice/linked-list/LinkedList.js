class Node {
    constructor(value)
    {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor()
    {
        this.headNode = null;
        this.listsize = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.headNode)
        {
            this.headNode = newNode;
        }
        else
        {
            let current = this.headNode;
            while (current.nextNode) {
                current = current.nextNode;
            }
            current.nextNode = newNode;
        }
        this.listsize++;
    }

    prepend(value)
    {
        const newNode = new Node(value);
        if (this.headNode)
        {
            newNode.nextNode = this.headNode;
        }
        this.headNode = newNode;
        this.listsize++;
    }

    size()
    {
        return this.listsize;
    }

    head()
    {
        return this.headNode;
    }

    tail()
    {
        let current = this.headNode;
        if (!current)return null;
        while (current.nextNode)
        {
            current = current.nextNode;
        }
        return current;
    }

    at(index)
    {
        if (index < 0 || index >= this.listsize)return null;
        let current = this.headNode;
        for (let i = 0; i < index; i++)
        {
            current = current.nextNode;
        }
        return current;
    }

    pop()
    {
        if (!this.headNode)return;
        if(!this.headNode.nextNode)
        {
            this.headNode = null;
        }
        else
        {
            let current = this.headNode;
            while (current.nextNode && current.nextNode.nextNode)
            {
                current = current.nextNode;
            }
            current.nextNode = null;
        }
        this.listsize--;
    }

    contains(value)
    {
        let current = this.headNode;
        while (current)
        {
            if (current.value === value)return true;
            current = current.nextNode;
        }
        return false;
    }

    find(value)
    {
        let current = this.headNode;
        let index = 0;
        while (current)
        {
            if (current.value === value)return index;
            current = current.nextNode;
            index++;
        }
        return null;
    }

    toString()
    {
        let current = this.headNode;
        let result = "";
        while (current)
        {
            result += `(${current.value}) ->`;
            current = current.nextNode;
        }
        result += "null";
        return result;
    }
}

module.exports = LinkedList;
