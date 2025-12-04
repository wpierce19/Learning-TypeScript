const { Calculator, reverseS, capitalize, analyzeArray, caesarCipher } = require("./main.js");

const calc = new Calculator();

test('adds 1 + 2 = 3', () => {
    const calc = new Calculator(1,2);
    expect(calc.add()).toBe(3);
});

test("divides 6 / 2 = 3", () => {
    const calc = new Calculator(6, 2);
    expect(calc.divide()).toBe(3);
});

test("throws error on division by zero", () => {
    const calc = new Calculator(6, 0);
    expect(() => calc.divide()).toThrow("Division by zero is not possible");
});

test("multiplies 3 * 4 = 12", () => {
    const calc = new Calculator(3, 4);
    expect(calc.multiply()).toBe(12);
});

test("Capitalizes first letter", () => {
    const cap = capitalize("hello");
    expect(cap).toBe("Hello")
});

test("Reverses string", () => {
    const rev = reverseS("Hello");
    expect(rev).toBe("olleH");
});

test("shifts lowercase letters correctly", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("shifts uppercase letters correctly", () => {
    expect(caesarCipher("XYZ", 3)).toBe("ABC");
});

test("preserves case", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("handles wrapping around the alphabet", () => {
    expect(caesarCipher("abc", -3)).toBe("xyz");
});

test("leaves punctuation and spaces unchanged", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("handles large shift factors", () => {
    expect(caesarCipher("abc", 29)).toBe("def"); // 29 % 26 = 3
});
test("analyzes an array of numbers correctly", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6,
    });
});

test("throws an error for an empty array", () => {
    expect(() => analyzeArray([])).toThrow("Input must be a non-empty array of numbers.");
});

test("throws an error for invalid input", () => {
    expect(() => analyzeArray("not an array")).toThrow("Input must be a non-empty array of numbers.");
});

test("handles an array with a single number", () => {
    expect(analyzeArray([5])).toEqual({
        average: 5,
        min: 5,
        max: 5,
        length: 1,
    });
});

test("handles negative numbers", () => {
    expect(analyzeArray([-3, -8, -1, -4, -2, -6])).toEqual({
        average: -4,
        min: -8,
        max: -1,
        length: 6,
    });
});