function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reverseS(string)
{
    return string.split('').reverse().join('');
}

class Calculator
{
    constructor(num1,num2){
        this.num1 = num1;
        this.num2 = num2;
    }

    add()
    {
        return this.num1 + this.num2;
    }

    divide()
    {
        if (this.num2 === 0)
        {
            throw new Error("Division by zero is not possible");
        }
        return this.num1 / this.num2;
    }

    multiply()
    {
        return this.num1 * this.num2;
    }
}

function caesarCipher(str, shift) {
    return str
        .split("")
        .map((char) => shiftChar(char, shift))
        .join("");
}

function shiftChar(char, shift) {
    if (isLetter(char)) {
        const charCode = char.charCodeAt(0);
        const base = char >= "a" && char <= "z" ? 97 : 65; // ASCII values for 'a' and 'A'
        return String.fromCharCode(((charCode - base + shift) % 26 + 26) % 26 + base);
    }
    return char; // Non-alphabetical characters remain unchanged
}

function isLetter(char) {
    return /[a-zA-Z]/.test(char);
}

function analyzeArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty array of numbers.");
    }

    const average = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const length = arr.length;

    return { average, min, max, length };
}

module.exports = {Calculator, reverseS, capitalize, caesarCipher, analyzeArray};