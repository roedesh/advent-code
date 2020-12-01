const fs = require("fs");
const path = require("path");

const TARGET_SUM = 2020;

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const numbers = input.split("\n").map((numberStr) => +numberStr);

const firstNumber = numbers.find(number => numbers.includes(2020 - number));
const secondNumber = 2020 - firstNumber;
const productOfNumbers = firstNumber * secondNumber;

console.log(`${firstNumber} + ${secondNumber} = 2020`);
console.log(`Solution: ${firstNumber} * ${secondNumber} = ${productOfNumbers}`)
