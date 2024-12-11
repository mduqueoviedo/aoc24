const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const masterGrid = input.map((inputLine) =>
  inputLine.split("").map((inputValue) => inputValue)
);

const gridMaxX = masterGrid[0].length;
const gridMaxY = masterGrid.length;

const findItem = (grid, item) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return [x, y];
      }
    }
  }
};

const turnRight = (currentDirection) => {
  switch (currentDirection) {
    case "U":
      return (currentDirection = "R");
    case "R":
      return (currentDirection = "D");
    case "D":
      return (currentDirection = "L");
    case "L":
      return (currentDirection = "U");
  }
};

const isPositionInList = (position, direction, positionsList) => {
  let flag = false;
  positionsList.forEach((listPosition) => {
    if (
      listPosition[0] === position[0] &&
      listPosition[1] === position[1] &&
      listPosition[2] === direction
    ) {
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

const setNewGrid = (grid, position) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  newGrid[position[1]][position[0]] = "#";
  return newGrid;
};

/**
 * Will walk the grid and return true if a loop is detected, false otherwise
 * @param {*} grid
 * @returns
 */
const walkGrid = (grid) => {
  let currentDirection = "U";
  const initialPosition = findItem(grid, "^");
  const positionsList = [initialPosition, currentDirection];

  let currentPosition = [...initialPosition];
  let loopFlag = false;

  while (!willGuardGoOut(currentPosition, currentDirection) && !loopFlag) {
    let newPosition = moveGuard(currentPosition, currentDirection);

    if (grid[newPosition[1]][newPosition[0]] === "#") {
      currentDirection = turnRight(currentDirection);
    } else {
      currentPosition = newPosition;
    }

    if (!isPositionInList(currentPosition, currentDirection, positionsList)) {
      positionsList.push([...currentPosition, currentDirection]);
    } else {
      loopFlag = true;
    }
  }

  return loopFlag;
};

const getInitialPath = (grid) => {
  let currentDirection = "U";
  const initialPosition = findItem(grid, "^");
  const positionsList = [[...initialPosition, currentDirection]];
  let currentPosition = [...initialPosition];

  while (!willGuardGoOut(currentPosition, currentDirection)) {
    let newPosition = moveGuard(currentPosition, currentDirection);

    if (grid[newPosition[1]][newPosition[0]] === "#") {
      currentDirection = turnRight(currentDirection);
    } else {
      currentPosition = newPosition;
    }

    if (!isPositionInList(currentPosition, currentDirection, positionsList)) {
      positionsList.push([...currentPosition, currentDirection]);
    }
  }

  return positionsList;
};

const loopList = [];
getInitialPath(masterGrid)
  .slice(1)
  .forEach((pathPos) => {
    if (
      masterGrid[pathPos[1]][pathPos[0]] !== "^" &&
      masterGrid[pathPos[1]][pathPos[0]] !== "#"
    ) {
      const newGrid = setNewGrid(masterGrid, pathPos);
      if (walkGrid(newGrid)) {
        // console.log("Loop detected", pathPos);
        if (
          !loopList.some(
            (loop) => loop[0] === pathPos[0] && loop[1] === pathPos[1]
          )
        ) {
          loopList.push(pathPos.slice(0, 2));
        }
      }
    }
  });

console.log(loopList.length);
