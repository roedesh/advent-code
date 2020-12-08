const fs = require("fs");
const path = require("path");

const VM = require("./vm");
const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");

const solutionOne = () => {
  const vm = new VM(input);
  vm.run();
  
  console.log(`Solution 1: ${vm.accummulator}`);
};

solutionOne();