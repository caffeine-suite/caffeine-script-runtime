const {largeArray, smallArray, Caf, assertEqSmallArraySum} = require('./StandardImport')

verify = () => {
  let count = 0
  Caf.each(smallArray, smallArray, (v) => count += v)
  assertEqSmallArraySum(count);

  count = 0
  Caf.eachFull(smallArray, smallArray, (v) => {count += v; return null})
  assertEqSmallArraySum(count);
}

verify()


class SimpleIterator {
  constructor(array) {this.reset(array);}
  reset(array) {
    this.array = array;
    this.length = array != null ? array.length : 0;
    this.i = -1;
  }
  next() {return ++this.i < this.length;}
  key() {return this.i;}
  value() {return this.array[this.i];}
}

let options = {warmUpDuration: 1}

module.exports = {suite: {largeArray: (function() {
  this.timeout(10000)

  benchmark("baseline", () => {
    let count = 0
    let add = (a, b) => a + b
    // # body = (v) -> count += v

    let source = largeArray;
    if (source != null) {
      const {length} = source;
      for (let key = 0; key < length; key++)
        count = add(count, source[key]);
    }
  }, options)

  // benchmark("each", () => {
  //   let count = 0
  //   Caf.each(largeArray, largeArray, (v) => count += v)
  // }, options)

  benchmark("eachJustFor-1", () => {
    let count = 0
    Caf.eachJustFor(largeArray, largeArray, (v) => count += v)
  }, options)

  benchmark("SimpleIterator", () => {
    let count = 0
    const itt = new SimpleIterator(largeArray)
    while(itt.next())
      count += itt.value()
  }, options)

  // benchmark("eachFull", () => {
  //   let count = 0
  //   Caf.eachFull(largeArray, largeArray, (v) => {count += v; return null})
  // }, options)
})}}