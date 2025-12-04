export class Hashmap
{
    constructor(initialCapacity = 16, loadFactor = 0.75)
    {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
    }

    hash(key)
    {
        if (typeof key !== 'string')
        {
            key = String(key);
        }

        let hashCode = 0;
        const primenumber = 31;
        for (let i=0;i < key.length;i++)
        {
            hashCode = (primenumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    _checkIndex(index)
    {
        if (index < 0 || index >= this.buckets.length)
        {
            throw new Error("Trying to access index out of bounds");
        }
    }

    set(key,value)
    {
        const index = this.hash(key);
        this._checkIndex(index);

        const bucket = this.buckets[index];
        for (let i=0; i <bucket.length;i++)
        {
            if (bucket[i][0] === key)
            {
                bucket[i][1] = value;
                return;
            }
            
        }
        bucket.push([key,value]);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor)
        {
            this._resize();
        }
    }

    get(key)
    {
        const index = this.hash(key);
        this._checkIndex(index);

        const bucket = this.buckets[index];
        for (let [k,v] of bucket)
        {
            if (k === key)return v;
        }
        return null;
    }

    has(key)
    {
        return this.get(key) !== null;
    }

    remove(key)
    {
        const index = this.hash(key);
        this._checkIndex(index);

        const bucket = this.buckets[index];
        for (let i=0;i<bucket.length;i++)
        {
            if (bucket[i][0] === key)
            {
                bucket.splice(i,1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length()
    {
        return this.size;
    }

    clear()
    {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys()
    {
        const keys = [];
        for (const bucket of this.buckets)
        {
            for (const [key] of bucket)
            {
                keys.push(key);
            }
        }
        return keys;
    }

    values()
    {
        const values = [];
        for (const bucket of this.buckets)
        {
            for (const [, value] of bucket)
            {
                values.push(value);
            }
        }
        return values;
    }

    entries()
    {
        const entries = [];
        for (const bucket of this.buckets)
        {
            for (const [key,value] of bucket)
            {
                entries.push([key,value]);
            }
        }
        return entries;
    }

    _resize()
    {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets)
        {
            for (const [key,value] of bucket)
            {
                this.set([key,value]);
            }
        }
    }
}