const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const inputNumbers = input.split("\n").map((numberStr) => +numberStr);

const findSum = (numbers, sum) => {
  const firstNumber = numbers.find((number) => numbers.includes(sum - number));
  if (firstNumber) return [firstNumber, sum - firstNumber];
};

const findTriplets = (numbers, totalSum) => {
  return numbers.reduce((triplets, currentNumber) => {
    if (triplets.length > 0) return triplets;

    const sum = findSum(numbers, totalSum - currentNumber);
    return sum ? [currentNumber, ...sum] : [];
  }, []);
};

const solutionOne = () => {
  const [first, second] = findSum(inputNumbers, 2020);
  const productOfNumbers = first * second;
  console.log(`Solution 1: ${first} * ${second} = ${productOfNumbers}`);
};

const solutionTwo = () => {
  const [first, second, third] = findTriplets(inputNumbers, 2020);
  const productOfNumbers = first * second * third;
  console.log(
    `Solution 2: ${first} * ${second} * ${third} = ${productOfNumbers}`
  );
};

solutionOne();
solutionTwo();
