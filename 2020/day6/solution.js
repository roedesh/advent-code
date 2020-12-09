const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const groups = input.split("\n\n");

const getLetters = (group) => {
  return group.split("").filter((letter) => letter !== "\n");
};

const getLettersWithOccurences = (group, occurences) => {
  const letters = getLetters(group);
  const counts = {};

  for (let letter of letters) {
    const count = counts[letter];
    counts[letter] = count ? count + 1 : 1;
  }

  return Object.keys(counts).filter((letter) => counts[letter] === occurences);
};

const solutionOne = () => {
  const sum = groups.reduce((sum, currentGroup) => {
    const letters = getLetters(currentGroup);
    const distinctLetters = new Set(letters);
    return sum + distinctLetters.size;
  }, 0);

  console.log(`Solution 1: ${sum}`);
};

const solutionTwo = () => {
  const sum = groups.reduce((sum, currentGroup) => {
    const amountOfPersons = currentGroup.split(/\n/).length;
    const letters = getLettersWithOccurences(currentGroup, amountOfPersons);

    return sum + letters.length;
  }, 0);

  console.log(`Solution 2: ${sum}`);
};

solutionOne();
solutionTwo();
