const fs = require("fs");
const { get } = require("http");
const input = fs.readFileSync("./input.txt", "utf-8").trim();

let [pageOrder, updates] = input.split("\n\n");
pageOrder = pageOrder.split("\n").map((page) => page.split("|").map(Number));
updates = updates.split("\n").map((update) => update.split(",").map(Number));

const isInOrderList = (item, pageOrder) => {
  let flag = false;
  pageOrder.forEach((page) => {
    if (page.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

const getMiddleItem = (arr) => arr[Math.trunc(arr.length / 2)];

const findInOrderList = (item, pageOrder) =>
  pageOrder.filter((page) => page.includes(item));

const getWrongLists = (updateList) => {
  const wrongList = [];
  updateList.forEach((updateItems, index) => {
    let flag = true;

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
            const rightOccurences = findInOrderList(
              rightItem,
              currentOccurences
            );
            if (rightOccurences.length) {
              rightOccurences.forEach((rightOccurence) => {
                if (
                  rightOccurence.indexOf(rightItem) <
                  rightOccurence.indexOf(item)
                ) {
                  flag = false;
                }
              });
            }
          }
        });
      }
    });

    if (!flag) {
      wrongList.push(updateList[index]);
    }
  });
  return wrongList;
};

const orderWrongList = (wrongList) => {
  let isOrdered = false;
  let newList = [...wrongList];

  while (!isOrdered) {
    newList.forEach((item, index) => {
      if (isInOrderList(item, pageOrder)) {
        const currentOccurences = findInOrderList(item, pageOrder);
        const left = newList.slice(0, index);
        const right = newList.slice(index + 1);

        left.forEach((leftItem) => {
          if (isInOrderList(leftItem, currentOccurences)) {
            const leftOccurences = findInOrderList(leftItem, currentOccurences);
            if (leftOccurences.length) {
              leftOccurences.forEach((leftOccurence) => {
                if (
                  leftOccurence.indexOf(leftItem) > leftOccurence.indexOf(item)
                ) {
                  [
                    newList[newList.indexOf(leftItem)],
                    newList[newList.indexOf(item)],
                  ] = [
                    newList[newList.indexOf(item)],
                    newList[newList.indexOf(leftItem)],
                  ];
                }
              });
            }
          }
        });

        right.forEach((rightItem) => {
          if (isInOrderList(rightItem, currentOccurences)) {
            const rightOccurences = findInOrderList(
              rightItem,
              currentOccurences
            );
            if (rightOccurences.length) {
              rightOccurences.forEach((rightOccurence) => {
                if (
                  rightOccurence.indexOf(rightItem) <
                  rightOccurence.indexOf(item)
                ) {
                  [
                    newList[newList.indexOf(rightItem)],
                    newList[newList.indexOf(item)],
                  ] = [
                    newList[newList.indexOf(item)],
                    newList[newList.indexOf(rightItem)],
                  ];
                }
              });
            }
          }
        });
      }
    });
    isOrdered = getWrongLists([newList]).length === 0;
  }

  return newList;
};

const wrongLists = getWrongLists(updates);

const rightLists = wrongLists.map((wrongList) => orderWrongList(wrongList));

const total = rightLists.reduce(
  (acc, rightList) => acc + getMiddleItem(rightList),
  0
);
console.log(total);
