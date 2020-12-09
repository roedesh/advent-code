const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const numbers = input.split("\n").map((str) => parseInt(str));
const numbersToCheck = numbers.slice(25);

const findInvalidNumber = () => {
  return numbersToCheck.find((numberToCheck, idx) => {
    const preamble = numbers.slice(idx, idx + 25);
    return preamble.findIndex((n) => preamble.includes(numberToCheck - n)) < 0;
  });
};

const getTotal = (numberSet) =>
  numberSet.reduce((total, number) => total + number, 0);

const getLowestAndHighest = (numberSet) => {
  const sortedNumberSet = numberSet.sort();
  return [sortedNumberSet[0], sortedNumberSet[sortedNumberSet.length - 1]];
};

const tryContigousSet = (startIndex, targetTotal) => {
  const numberSet = [];

  for (let i = startIndex; i < numbers.length; i++) {
    numberSet.push(numbers[i]);
    const numberSetTotal = getTotal(numberSet);
    if (numberSetTotal > targetTotal) return [false, []];
    if (numberSetTotal === targetTotal) break;
  }

  return [true, numberSet];
};

const solutionOne = () => {
  console.log(`Solution 1: ${findInvalidNumber()}`);
};

const solutionTwo = () => {
  const invalidNumber = findInvalidNumber();
  let i = 0;

  while (i < numbers.length) {
    const [setFound, numberSet] = tryContigousSet(i, invalidNumber);

    if (setFound) {
      const [lowest, highest] = getLowestAndHighest(numberSet);
      console.log(`Solution 2: ${lowest + highest}`);
      break;
    }

    i++;
  }
};

solutionOne();
solutionTwo();
