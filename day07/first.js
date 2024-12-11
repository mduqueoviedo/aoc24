const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let total = 0;

const combinations = (n) => {
  const result = [];
  const symbols = ["+", "*"];

  const backtrack = (path) => {
    if (path.length === n) {
      result.push(path);
      return;
    }

    symbols.forEach((symbol) => {
      backtrack(path + symbol);
    });
  };

  backtrack("");

  return result;
};

input.forEach((line) => {
  const desiredResult = Number(line.split(":")[0].trim());
  const values = line.split(":")[1].trim().split(" ").map(Number);

  const operatorsList = combinations(values.length - 1);

  let flag = false;
  operatorsList.forEach((operatorSet) => {
    const sum = values.reduce((acc, value, index) => {
      if (index === 0) return value;

      if (operatorSet[index - 1] === "+") {
        return acc + value;
      } else {
        return acc * value;
      }
    }, 0);

    if (sum === desiredResult) {
      flag = true;
    }
  });

  if (flag) {
    total += desiredResult;
  }
});

console.log(total);
