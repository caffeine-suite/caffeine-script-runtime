const isNonNegativeInt = (x) => ((x | 0) === x) && x >= 0
const isFunction = (a) => typeof a === "function"
const exists = (value) => value != null

module.exports = {
  exists,
  isFunction,
    // https://jsperf.com/array-isarray-vs-instanceof-array/44
    // as-of 2019-10-26
    // Array.isArray vs o.constructor == Array
    // Virtually the same: Chrome, Safari, FireFox
    // Edge18: constructor-test 10x faster
    // Edge18 is somewhat faster if we use: a != null && typeof a == "object" && a.constructor == Array
    //  but chrome is slower.
  isPlainArray: (o) => exists(o) && o.constructor === Array,
  isOfIterable: (o) => isFunction(o[Symbol.iterator] || o.next),
  isArrayIterable: (o) =>
    isNonNegativeInt(o.length) &&
    isFunction(o.indexOf) &&
    o.constructor != Object // not a plain object
}