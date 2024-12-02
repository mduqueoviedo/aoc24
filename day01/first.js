const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const list1 = [];
const list2 = [];

input.forEach((line) => {
  const [first, second] = line.split("   ").map(Number);
  list1.push(first);
  list2.push(second);
});
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let total = 0;
list1.forEach((num1, index) => {
  total += Math.abs(num1 - list2[index]);
});

console.log(total);
