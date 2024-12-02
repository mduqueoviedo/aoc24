const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalSafeReports = 0;

const minDiff = 1;
const maxDiff = 3;

const isReportSafe = (reportLine) => {
  let flag = true;
  let direction;

  reportLine.reduce((prev, curr) => {
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

  return flag;
};

input.forEach((line) => {
  const parsedLine = line.split(" ").map(Number);

  if (isReportSafe(parsedLine)) {
    totalSafeReports++;
  } else {
    let safetyFlag = false;

    for (let i = 0; i < parsedLine.length; i++) {
      const tempLine = [...parsedLine];
      tempLine.splice(i, 1);

      if (isReportSafe(tempLine)) {
        safetyFlag = true;
        break;
      }
    }

    if (safetyFlag) {
      totalSafeReports++;
    }
  }
});

console.log(totalSafeReports);

// Test input result is 4
