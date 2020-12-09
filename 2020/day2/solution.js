const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const passwordEntries = input.split("\n");

const parseEntry = (passwordEntry) => {
  const [policy, password] = passwordEntry.split(": ");
  const [minOccurence, maxOccurence] = policy.match(/\d+/g);
  const policyLetter = policy.substr(policy.length - 1);

  return [minOccurence, maxOccurence, policyLetter, password];
};

const solutionOne = () => {
  const validPasswordEntries = passwordEntries.filter((entry) => {
    const [minOccurence, maxOccurence, policyLetter, password] = parseEntry(
      entry
    );
    const letterOccurences = (
      password.match(new RegExp(policyLetter, "g")) || []
    ).length;

    return letterOccurences >= minOccurence && letterOccurences <= maxOccurence;
  });

  console.log(`Solution 1: ${validPasswordEntries.length}`);
};

const solutionTwo = () => {
  const validPasswordEntries = passwordEntries.filter((entry) => {
    const [firstPosition, secondPosition, policyLetter, password] = parseEntry(
      entry
    );

    const firstLetterMatches = password[firstPosition - 1] === policyLetter;
    const secondLetterMatches = password[secondPosition - 1] == policyLetter;

    const result = +firstLetterMatches + +secondLetterMatches;

    return result === 1;
  });

  console.log(`Solution 2: ${validPasswordEntries.length}`);
};

solutionOne();
solutionTwo();
