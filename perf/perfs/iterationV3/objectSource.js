const {largeObject, mediumObject, smallObject, Caf, assertEqSmallArraySum} = require('./StandardImport')


function* objectKeyIterator(o) {
  for (k in o) yield k;
}

class ObjectIterator {
  constructor(o) {
    this.o = o;
    this.generator = objectKeyIterator(o);
    this._value = null;
  }
  next() {
    const key = this.generator.next();
    console.log({key})
    return this._key = key;
  }
  key() {return this._key;}
  value() {return this.o[this._key];}
}

let options = {warmUpDuration: 1}

module.exports = {suite: {mediumObject: (function() {
  this.timeout(10000)

  benchmark("mediumObject baseline", () => {
    const source = mediumObject;
    if (source != null) {
      let count = 0
      for (const key in source)
        count += source[key];
    }
  })

  benchmark("objectKeyIterator", () => {
    const source = mediumObject;
    if (source != null) {
      let count = 0
      for(k of objectKeyIterator(source))
        count += source[k];
    }
  })


  benchmark("each", () => {
    const source = mediumObject;
    if (source != null) {
      let count = 0
      Caf.each(source, source, (v) => count += v)
    }
  })

})}}