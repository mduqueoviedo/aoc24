const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let totalXmas = 0;

const grid = input.map((inputLine) =>
  inputLine.split("").map((inputValue) => inputValue)
);

const gridMaxX = grid[0].length;
const gridMaxY = grid.length;

const searchCross = (x, y) => {
  if (x === 0 || x === gridMaxX - 1 || y === 0 || y === gridMaxY - 1) {
    return false;
  }

  const current = grid[y][x];
  const topLeft = grid[y - 1][x - 1];
  const topRight = grid[y - 1][x + 1];
  const downLeft = grid[y + 1][x - 1];
  const downRight = grid[y + 1][x + 1];
  const cross1 = `${topLeft}${current}${downRight}`;
  const cross2 = `${topRight}${current}${downLeft}`;

  if (
    (cross1 === "MAS" || cross1 === "SAM") &&
    (cross2 === "MAS" || cross2 === "SAM")
  ) {
    return true;
  } else {
    return false;
  }
};

for (let yPosition = 0; yPosition < gridMaxY; yPosition++) {
  for (let xPosition = 0; xPosition < gridMaxX; xPosition++) {
    if (grid[yPosition][xPosition] === "A") {
      if (searchCross(xPosition, yPosition)) totalXmas++;
    }
  }
}

console.log(totalXmas);
