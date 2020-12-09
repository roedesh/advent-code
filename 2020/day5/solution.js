const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const boardingPasses = input.split("\n");

const createRange = (start, end) => {
  return [...Array(1 + end - start).keys()].map((v) => start + v);
};

const getArrayHalves = (array) => {
  const halfLength = Math.ceil(array.length / 2);
  const lowerHalf = array.slice(0, halfLength);
  const upperHalf = array.slice(halfLength);
  return [lowerHalf, upperHalf];
};

const getNumber = (range, letters, lowerLetter, upperLetter) => {
  let currentRange = range;

  for (let letter of letters) {
    if (![lowerLetter, upperLetter].includes(letter)) continue;

    const [lowerHalf, upperHalf] = getArrayHalves(currentRange);
    if (letter === lowerLetter) currentRange = lowerHalf;
    if (letter === upperLetter) currentRange = upperHalf;
  }

  return currentRange[0];
};

const getSeatId = (boardingPass) => {
  const letters = boardingPass.split("");

  const rowNumber = getNumber(createRange(0, 127), letters, "F", "B");
  const columnNumber = getNumber(createRange(0, 7), letters, "L", "R");

  return rowNumber * 8 + columnNumber;
};

const solutionOne = () => {
  const seatIds = boardingPasses.map((boardingPass) => getSeatId(boardingPass));
  const highestSeatId = Math.max(...seatIds);
  console.log(`Solution 1: ${highestSeatId}`);
};

const solutionTwo = () => {
  const seatIds = boardingPasses.map((boardingPass) => getSeatId(boardingPass));
  seatIds.sort((a, b) => a - b);

  const mySeatId =
    seatIds.find((seatId, idx) => seatId - seatIds[idx - 1] === 2) - 1;

  console.log(`Solution 2: ${mySeatId}`);
};

solutionOne();
solutionTwo();
