const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim();

const regexp = /mul\(\d{1,3},\d{1,3}\)/gm;
const matches = input.match(regexp);

let total = 0;
matches.forEach((singleMatch) => {
  const [a, b] = singleMatch.match(/\d{1,3}/g);
  total += a * b;
});

console.log(total);
