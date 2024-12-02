const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const list1 = [];
const list2 = [];

input.forEach((line) => {
  const [first, second] = line.split("   ").map(Number);
  list1.push(first);
  list2.push(second);
});

let total = 0;

list1.forEach((num1) => {
  total += num1 * list2.filter((num2) => num1 === num2).length;
});

console.log(total);
