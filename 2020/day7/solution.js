const fs = require("fs");
const path = require("path");

const removeBagPart = (name) =>
  name.replace("bags", "").replace("bag", "").trim();

const getChildBags = (contents) => {
  if (contents === "no other bags") return {};

  return contents.split(",").reduce((childBags, currentBag) => {
    const [_, amount, name] = currentBag.split(/(\d+)/);
    const nameWithoutBagPart = removeBagPart(name);
    return { ...childBags, [nameWithoutBagPart]: parseInt(amount) };
  }, {});
};

const getBagFromLine = (line) => {
  const lineWithoutDot = line.replace(".", "");
  const [name, contents] = lineWithoutDot
    .split("contain")
    .map((str) => str.trim());
  const nameWithoutBagPart = removeBagPart(name);

  const childBagsWithAmounts = getChildBags(contents);

  return [nameWithoutBagPart, childBagsWithAmounts];
};

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const bags = input.split("\n").reduce((bags, currentLine) => {
  const [name, contents] = getBagFromLine(currentLine);
  return { ...bags, [name]: contents };
}, {});
