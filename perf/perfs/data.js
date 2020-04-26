module.exports.largeArray = [];
module.exports.mediumArray = [];
module.exports.smallArray = [];
module.exports.smallObject = {};
module.exports.mediumObject = {};
module.exports.largeObject = {};

const {
  largeObject, mediumObject, smallObject,
  largeArray, mediumArray, smallArray,
} = module.exports;

let smallArraySum = 0
for (let i = 0; i < 10; i++) smallArraySum += smallArray[i] = i;
for (let i = 0; i < 1000; i++) mediumArray[i] = i;
for (let i = 0; i < 1000000; i++) largeArray[i] = i;

smallArray.forEach((v) => smallObject["v"+v] = v)
mediumArray.forEach((v) => mediumObject["v"+v] = v)
largeArray.forEach((v) => largeObject["v"+v] = v)

module.exports.smallArraySum = smallArraySum;

const assertEq = (v1, v2) => {
  if (v1 !== v2) {throw new Error(`${v1} != ${v2}`)}
}

module.exports.assertEqSmallArraySum = (v) => assertEq(smallArraySum, v)

console.log({smallObject})
let smallObjectSum = 0
for (const key in smallObject) smallObjectSum += smallObject[key];
assertEq(smallObjectSum, smallArraySum);