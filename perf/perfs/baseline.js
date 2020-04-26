let {largeArray, smallArray, smallArraySum, assertEqSmallArraySum} = require('./data');

class SimpleIterator {
  constructor(array) {this.reset(array);}
  reset(array) {
    this.array = array;
    this.length = array != null ? array.length : 0;
    this.i = -1;
  }
  next() {return ++this.i < this.length;}
  value() {return this.array[this.i];}
}

const countWithTraditionalFor = (array) => {
  let count = 0;
  for (let i = 0, {length} = array; i < length; i++) {
    count += array[i];
  }
  return count;
}

const countWithIterator = (array) => {
  let count = 0;
  for (let value of array) {count += value}
  return count;
}

const countWithForEach = (array) => {
  let count = 0;
  array.forEach((v) => count += v)
  return count;
}


const countSimpleIterator = (array) => {
  let count = 0;
  let iterator = new SimpleIterator(array);
  while (iterator.next())
    count += iterator.value()
  return count;
}

const reusableSimpleIterator = new SimpleIterator()
const countReusableSimpleIterator = (array) => {
  let count = 0;
  reusableSimpleIterator.reset(array);
  while (reusableSimpleIterator.next())
    count += reusableSimpleIterator.value()
  return count;
}


assertEqSmallArraySum(countWithIterator(smallArray));
assertEqSmallArraySum(countWithTraditionalFor(smallArray));
assertEqSmallArraySum(countWithForEach(smallArray));
assertEqSmallArraySum(countSimpleIterator(smallArray));
assertEqSmallArraySum(countReusableSimpleIterator(smallArray));

module.exports = {suite: {
  smallArray: () => {
    const array = smallArray;
    benchmark("countWithTraditionalFor", () => countWithTraditionalFor(array));
    benchmark("countWithIterator", () => countWithIterator(array));
    benchmark("countWithForEach", () => countWithForEach(array));
    benchmark("countSimpleIterator", () => countSimpleIterator(array));
    benchmark("countReusableSimpleIterator", () => countReusableSimpleIterator(array));
  },
  largeArray: () => {
    const array = largeArray;
    benchmark("countWithTraditionalFor", () => countWithTraditionalFor(array));
    benchmark("countWithIterator", () => countWithIterator(array));
    benchmark("countWithForEach", () => countWithForEach(array));
    benchmark("countSimpleIterator", () => countSimpleIterator(array));
    benchmark("countReusableSimpleIterator", () => countReusableSimpleIterator(array));

  }
}}