function fibs(num)
{
    arr = [];
    for (let i=0;i < num;i++)
    {
        if (i == 0 || i == 1){arr.push(i)}
        else
        {
            arr.push(arr[i-1]+arr[i-2]);
        }
    }
    return arr;
}

console.log("iterator: " +fibs(8));

function recFibs(num)
{
    if (num <= 0) return [];
    if (num === 1) return [0];
    if (num === 2) return [0, 1];

    // Recursive step: Get the array up to the (num - 1)th Fibonacci sequence
    const fibs = recFibs(num - 1);
    // Add the next Fibonacci number, which is the sum of the last two
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    return fibs;
}

console.log("recursion: " +recFibs(8))