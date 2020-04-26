require('./global');

const {isFunction, isPlainArray, exists} = require('./types');
const {defModule} = require('./modules');
const {defClass, getSuper} = require('./classes');

module.exports = {
  autoImport: require('./autoImport'),   // was importInvoke

  isFunction,   // was isF

  defModule,    // was defMod
  defClass,
  getSuper,

  exists,
  isIn:     (a, b) => b != null ? 0 <= b.indexOf(a) : false,
  mod:      (a, b) => (+a % (b = +b) + b) % b,
  div:      (a, b) => Math.floor(a / b),
  pow:      (a, b) => a ** b,

  is:       (a, b) => a === b || (a != null && b != null && a.constructor == b),
  toString: (a) =>
      (a != null)
      ?
        isPlainArray(a)
          ? a.join('')
          : isFunction(a != null && a.toString)
            ? a.toString()
            : a
      : '',

  ...require('./iteration')
}