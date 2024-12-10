const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").trim();

let [pageOrder, updates] = input.split("\n\n");
pageOrder = pageOrder.split("\n").map((page) => page.split("|").map(Number));
updates = updates.split("\n").map((update) => update.split(",").map(Number));

let total = 0;

const isInOrderList = (item, pageOrder) => {
  let flag = false;
  pageOrder.forEach((page) => {
    if (page.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

const findInOrderList = (item, pageOrder) =>
  pageOrder.filter((page) => page.includes(item));

updates.forEach((updateItems) => {
  let flag = true;
  const middleItem = updateItems[Math.trunc(updateItems.length / 2)];

  updateItems.forEach((item, index) => {
    if (isInOrderList(item, pageOrder)) {
      const currentOccurences = findInOrderList(item, pageOrder);
      const left = updateItems.slice(0, index);
      const right = updateItems.slice(index + 1);

      left.forEach((leftItem) => {
        if (isInOrderList(leftItem, currentOccurences)) {
          const leftOccurences = findInOrderList(leftItem, currentOccurences);
          if (leftOccurences.length) {
            leftOccurences.forEach((leftOccurence) => {
              if (
                leftOccurence.indexOf(leftItem) > leftOccurence.indexOf(item)
              ) {
                flag = false;
              }
            });
          }
        }
      });

      right.forEach((rightItem) => {
        if (isInOrderList(rightItem, currentOccurences)) {
          const rightOccurences = findInOrderList(rightItem, currentOccurences);
          if (rightOccurences.length) {
            rightOccurences.forEach((rightOccurence) => {
              if (
                rightOccurence.indexOf(rightItem) < rightOccurence.indexOf(item)
              ) {
                flag = false;
              }
            });
          }
        }
      });
    }
  });

  if (flag) {
    total += middleItem;
  }
});

console.log(total);
