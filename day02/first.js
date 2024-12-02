const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalSafeReports = 0;

const minDiff = 1;
const maxDiff = 3;
input.forEach((line) => {
  let flag = true;
  let direction;
  const parsedLine = line.split(" ").map(Number);

  parsedLine.reduce((prev, curr) => {
    if (prev !== -1 && flag) {
      if (curr > prev) {
        if (direction === undefined || direction === "asc") {
          direction = "asc";
        } else {
          flag = false;
        }
      } else if (curr < prev) {
        if (direction === undefined || direction === "desc") {
          direction = "desc";
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }

      if (flag) {
        const diff = Math.abs(curr - prev);
        if (diff < minDiff || diff > maxDiff) {
          flag = false;
        }
      }
    }
    return curr;
  }, -1);

  if (flag) {
    totalSafeReports++;
  }
});

console.log(totalSafeReports);
