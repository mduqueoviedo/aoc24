const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const grid = input.map((inputLine) =>
  inputLine.split("").map((inputValue) => inputValue)
);

const gridMaxX = grid[0].length;
const gridMaxY = grid.length;

const antennaList = [];
const uniqueNodesList = [];

const isAntennaPresentInList = (list, item) =>
  list.some((listItem) => listItem === item);

const isNodePresentInList = (list, node) =>
  list.some((listNode) => listNode[0] === node[0] && listNode[1] === node[1]);

const fillAntennaList = (grid) => {
  for (let y = 0; y < gridMaxY; y++) {
    for (let x = 0; x < gridMaxX; x++) {
      if (
        grid[y][x] !== "." &&
        !isAntennaPresentInList(antennaList, grid[y][x])
      ) {
        antennaList.push(grid[y][x]);
      }
    }
  }
};

const getAllAntennas = (grid, antenna) => {
  const antennaPositions = [];
  for (let y = 0; y < gridMaxY; y++) {
    for (let x = 0; x < gridMaxX; x++) {
      if (grid[y][x] === antenna) {
        antennaPositions.push({ x, y });
      }
    }
  }
  return antennaPositions;
};

const isPositionValid = (x, y) => {
  return x >= 0 && x < gridMaxX && y >= 0 && y < gridMaxY;
};

fillAntennaList(grid);

antennaList.forEach((antenna) => {
  const antennaPositions = getAllAntennas(grid, antenna);
  antennaPositions.forEach((antennaPosition, index) => {
    antennaPositions.forEach((antennaPosition2, index2) => {
      if (index !== index2) {
        let flagLeft = false;
        let flagRight = false;

        const x1 = antennaPosition.x;
        const y1 = antennaPosition.y;
        const x2 = antennaPosition2.x;
        const y2 = antennaPosition2.y;

        if (!isNodePresentInList(uniqueNodesList, [y1, x1])) {
          uniqueNodesList.push([y1, x1]);
        }

        if (!isNodePresentInList(uniqueNodesList, [y2, x2])) {
          uniqueNodesList.push([y2, x2]);
        }

        const xDiff = Math.abs(x1 - x2);
        const yDiff = Math.abs(y1 - y2);

        let loop = 1;
        while (!flagLeft) {
          let newNode1 = [];
          if (x1 < x2) {
            newNode1[1] = x1 - xDiff * loop;
          } else {
            newNode1[1] = x1 + xDiff * loop;
          }

          if (y1 < y2) {
            newNode1[0] = y1 - yDiff * loop;
          } else {
            newNode1[0] = y1 + yDiff * loop;
          }

          if (!isPositionValid(newNode1[1], newNode1[0])) {
            flagLeft = true;
          } else if (!isNodePresentInList(uniqueNodesList, newNode1)) {
            uniqueNodesList.push(newNode1);
          }

          loop++;
        }

        loop = 1;
        while (!flagRight) {
          let newNode2 = [];
          if (x1 < x2) {
            newNode2[1] = x2 + xDiff * loop;
          } else {
            newNode2[1] = x2 - xDiff * loop;
          }

          if (y1 < y2) {
            newNode2[0] = y2 + yDiff * loop;
          } else {
            newNode2[0] = y2 - yDiff * loop;
          }

          if (!isPositionValid(newNode2[1], newNode2[0])) {
            flagRight = true;
          } else if (!isNodePresentInList(uniqueNodesList, newNode2)) {
            uniqueNodesList.push(newNode2);
          }

          loop++;
        }
      }
    });
  });
});

console.log(uniqueNodesList.length);
