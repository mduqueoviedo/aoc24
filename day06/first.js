const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const grid = input.map((inputLine) =>
  inputLine.split("").map((inputValue) => inputValue)
);

const gridMaxX = grid[0].length;
const gridMaxY = grid.length;

const findItem = (grid, item) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return [x, y];
      }
    }
  }
};

const turnRight = () => {
  switch (currentDirection) {
    case "U":
      currentDirection = "R";
      break;
    case "R":
      currentDirection = "D";
      break;
    case "D":
      currentDirection = "L";
      break;
    case "L":
      currentDirection = "U";
      break;
  }
};

const isPositionInList = (position, positionsList) => {
  let flag = false;
  positionsList.forEach((listPosition) => {
    if (listPosition[0] === position[0] && listPosition[1] === position[1]) {
      flag = true;
    }
  });
  return flag;
};

const moveGuard = (currentPosition, currentDirection) => {
  let newPosition = [...currentPosition];
  switch (currentDirection) {
    case "U":
      newPosition[1] -= 1;
      break;
    case "R":
      newPosition[0] += 1;
      break;
    case "D":
      newPosition[1] += 1;
      break;
    case "L":
      newPosition[0] -= 1;
      break;
  }
  return newPosition;
};

const willGuardGoOut = (currentPosition, currentDirection) => {
  switch (currentDirection) {
    case "U":
      return currentPosition[1] - 1 < 0;
    case "R":
      return currentPosition[0] + 1 >= gridMaxX;
    case "D":
      return currentPosition[1] + 1 >= gridMaxY;
    case "L":
      return currentPosition[0] - 1 < 0;
  }
};

const getInitialPosition = findItem(grid, "^");
let currentDirection = "U";
let currentPosition = [...getInitialPosition];
const positionsList = [getInitialPosition];

while (!willGuardGoOut(currentPosition, currentDirection)) {
  let newPosition = moveGuard(currentPosition, currentDirection);

  if (grid[newPosition[1]][newPosition[0]] === "#") {
    turnRight();
  } else {
    currentPosition = newPosition;
  }

  if (!isPositionInList(currentPosition, positionsList)) {
    positionsList.push(currentPosition);
  }
}

console.log(positionsList.length);
