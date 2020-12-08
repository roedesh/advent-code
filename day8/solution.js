const fs = require("fs");
const path = require("path");

const VM = require("./vm");
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const solutionOne = () => {
  const vm = new VM(input);
  const [_, acc] = vm.run();

  console.log(`Solution 1: ${acc}`);
};

const solutionTwo = () => {
  const vm = new VM(input);
  const [_, acc] = vm.fixAndRunProgram();

  console.log(`Solution 2: ${acc}`);
};

solutionOne();
solutionTwo();
