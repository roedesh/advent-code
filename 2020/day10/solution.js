const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const jolts = input.split("\n").map((str) => parseInt(str));

const getNextValidJolts = (startingJolt) =>
  [0, 0, 0].map((_, idx) => startingJolt + idx + 1);

const findJoltDistibution = () => {
  const sortedJolts = jolts.sort((a, b) => a - b);
  const joltDistibution = { 1: 0, 3: 0 };
  let lastValidJolt = 0;

  for (let jolt of sortedJolts) {
    const validJolts = getNextValidJolts(lastValidJolt);
    if (validJolts.includes(jolt)) {
      const difference = jolt - lastValidJolt;
      joltDistibution[difference] = joltDistibution[difference] + 1;
      lastValidJolt = jolt;
    }
  }

  joltDistibution[3] = joltDistibution[3] + 1;

  return joltDistibution;
};

const solutionOne = () => {
  const joltDistibution = findJoltDistibution();
  const productOfDistribution = joltDistibution[1] * joltDistibution[3];
  console.log(`Solution 1: ${productOfDistribution}`);
};

solutionOne();
