const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalXmas = 0;

const grid = input.map((inputLine) =>
  inputLine.split("").map((inputValue) => inputValue)
);

const gridMaxX = grid[0].length;
const gridMaxY = grid.length;

const searchRight = (x, y) => {
  let finalXPos = x + 3;

  if (finalXPos >= gridMaxX) {
    return false;
  }
  const word = grid[y].slice(x, finalXPos + 1).join("");
  // if (word === "XMAS") {
  //   console.log("found right", x, y);
  // }
  return word === "XMAS";
};

const searchLeft = (x, y) => {
  let finalXPos = x - 3;

  if (finalXPos < 0) {
    return false;
  }
  const word = grid[y]
    .slice(finalXPos, x + 1)
    .reverse()
    .join("");
  // if (word === "XMAS") {
  //   console.log("found left", x, y);
  // }
  return word === "XMAS";
};

const searchDown = (x, y) => {
  let finalYPos = y + 3;

  if (finalYPos >= gridMaxY) {
    return false;
  }
  const word = grid
    .map((row) => row[x])
    .slice(y, finalYPos + 1)
    .join("");
  // if (word === "XMAS") {
  //   console.log("found down", x, y);
  // }
  return word === "XMAS";
};

const searchUp = (x, y) => {
  let finalYPos = y - 3;

  if (finalYPos < 0) {
    return false;
  }
  const word = grid
    .map((row) => row[x])
    .slice(finalYPos, y + 1)
    .reverse()
    .join("");
  // if (word === "XMAS") {
  //   console.log("found up", x, y);
  // }
  return word === "XMAS";
};

const searchDownRight = (x, y) => {
  let finalYPos = y + 3;
  let finalXPos = x + 3;

  if (finalYPos >= gridMaxY || finalXPos >= gridMaxX) {
    return false;
  }

  let word = "";
  for (let i = 0; i < 4; i++) {
    word += grid[y + i][x + i];
  }

  // if (word === "XMAS") {
  //   console.log("found down right", x, y);
  // }
  return word === "XMAS";
};

const searchDownLeft = (x, y) => {
  let finalYPos = y + 3;
  let finalXPos = x - 3;

  if (finalYPos >= gridMaxY || finalXPos < 0) {
    return false;
  }

  let word = "";
  for (let i = 0; i < 4; i++) {
    word += grid[y + i][x - i];
  }

  // if (word === "XMAS") {
  //   console.log("found down left", x, y);
  // }
  return word === "XMAS";
};

const searchUpRight = (x, y) => {
  let finalYPos = y - 3;
  let finalXPos = x + 3;

  if (finalYPos < 0 || finalXPos >= gridMaxX) {
    return false;
  }

  let word = "";
  for (let i = 0; i < 4; i++) {
    word += grid[y - i][x + i];
  }

  // if (word === "XMAS") {
  //   console.log("found up right", x, y);
  // }
  return word === "XMAS";
};

const searchUpLeft = (x, y) => {
  let finalYPos = y - 3;
  let finalXPos = x - 3;

  if (finalYPos < 0 || finalXPos < 0) {
    return false;
  }

  let word = "";
  for (let i = 0; i < 4; i++) {
    word += grid[y - i][x - i];
  }

  // if (word === "XMAS") {
  //   console.log("found up left", x, y);
  // }
  return word === "XMAS";
};

for (let yPosition = 0; yPosition < gridMaxY; yPosition++) {
  for (let xPosition = 0; xPosition < gridMaxX; xPosition++) {
    if (grid[yPosition][xPosition] === "X") {
      if (searchRight(xPosition, yPosition)) totalXmas++;
      if (searchLeft(xPosition, yPosition)) totalXmas++;
      if (searchDown(xPosition, yPosition)) totalXmas++;
      if (searchUp(xPosition, yPosition)) totalXmas++;
      if (searchDownRight(xPosition, yPosition)) totalXmas++;
      if (searchDownLeft(xPosition, yPosition)) totalXmas++;
      if (searchUpRight(xPosition, yPosition)) totalXmas++;
      if (searchUpLeft(xPosition, yPosition)) totalXmas++;
    }
  }
}

console.log(totalXmas);
