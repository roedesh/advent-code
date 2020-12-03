const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const rows = input.split("\n");
const map = rows.map((row) => row.split(""));

const traverseMap = (map, [slopeX, slopeY]) => {
  let x = 0;
  let y = 0;

  let treesEncountered = 0;

  while (y < map.length) {
    const tile = map[y][x];
    if (tile === "#") treesEncountered++;

    x += slopeX;
    if (x > map[y].length - 1) x -= map[y].length;

    y += slopeY;
  }

  return treesEncountered;
};

const solutionOne = () => {
  const treesEncountered = traverseMap(map, [3, 1]);

  console.log(`Solution 1: ${treesEncountered}`);
};

const solutionTwo = () => {
  const dataFromSlopes = [
    traverseMap(map, [1, 1]),
    traverseMap(map, [3, 1]),
    traverseMap(map, [5, 1]),
    traverseMap(map, [7, 1]),
    traverseMap(map, [1, 2]),
  ];

  const treesEncountered = dataFromSlopes.reduce((totalCount, slopeCount) => {
    return totalCount * slopeCount;
  }, 1);

  console.log(`Solution 2: ${treesEncountered}`);
};

solutionOne();
solutionTwo();
