const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim();
let total = 0;

console.log("Input is", input);

const getTotal = (str) => {
  const regexp = /mul\(\d{1,3},\d{1,3}\)/gm;
  const matches = str.match(regexp);

  let partTotal = 0;
  matches.forEach((singleMatch) => {
    console.log("Single match is", singleMatch);
    const [a, b] = singleMatch.match(/\d{1,3}/g);
    partTotal += a * b;
  });
  return partTotal;
};

const validStrings = input
  .replace(/don't\(\)(.*?)do\(\)/g, "")
  .replace(/don't\(\)(.*?)$/g, "");

console.log("Cleaned up is", validStrings);
console.log(getTotal(validStrings));

// Test result is 48
