const fs = require("fs");
const path = require("path");

const REQUIRED_FIELDS = ["byr", "ecl", "eyr", "iyr", "hcl", "hgt", "pid"];

const numberValidator = (value, min, max, digits) => {
  if (digits && value.length !== digits) return false;
  const numberValue = +value;

  return numberValue >= min && numberValue <= max;
};

const heightValidator = (value) => {
  const unit = value.slice(-2);
  if (["cm", "in"].includes(unit)) {
    const height = +value.replace(/[^0-9]/g, "");
    if (unit === "cm") return numberValidator(height, 150, 193);
    if (unit === "in") return numberValidator(height, 59, 76);
  }
  return false;
};

const validators = {
  byr: (value) => numberValidator(value, 1920, 2002, 4),
  iyr: (value) => numberValidator(value, 2010, 2020, 4),
  eyr: (value) => numberValidator(value, 2020, 2030, 4),
  hgt: heightValidator,
  hcl: (value) => value.match(/#[a-f0-9]{6}/),
  ecl: (value) => value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
  pid: (value) => value.match(/^\d{9}$/),
};

const checkPasswordGroups = (passwordGroups, validators) => {
  const validPasswordGroups = passwordGroups.filter((passwordGroup) => {
    const keyValuePairs = passwordGroup.split(" ");

    const keys = keyValuePairs
      .map((keyValuePair) => {
        const [key, value] = keyValuePair.split(":");

        if (validators && Object.keys(validators).length) {
          const validator = validators[key];
          if (!validator || (validator && validator(value))) return key;
          return null;
        }

        return key;
      })
      .filter(Boolean);

    return REQUIRED_FIELDS.every((key) => keys.includes(key));
  });

  return validPasswordGroups;
};

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const passwordGroups = input
  .split("\n\n")
  .map((group) => group.replace(/\n/g, " "));

const solutionOne = () => {
  const validPasswordGroups = checkPasswordGroups(passwordGroups);
  console.log(`Solution 1: ${validPasswordGroups.length}`);
};

const solutionTwo = () => {
  const validPasswordGroups = checkPasswordGroups(passwordGroups, validators);
  console.log(`Solution 2: ${validPasswordGroups.length}`);
};

solutionOne();
solutionTwo();
