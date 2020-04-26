// see: ./ITERATION.md
// https://jsperf.com/es6-iterator-for-of-vs-traditional-for-loops

const {
  isArrayIterable,
  exists,
  isOfIterable,
  isFunction
} = require("./types");

module.exports.eachJustFor = (source, returning, body) => {
  if (exists(source))
    for (let key = 0, { length } = source; key < length; key++)
      body(source[key], key, returning);

  return returning;
}

module.exports.each = (source, returning, body) => {
  if (exists(source))
    if (isArrayIterable(source))
      for (let key = 0, { length } = source; key < length; key++)
        body(source[key], key, returning);
    else if (isOfIterable(source))
      if (isFunction(source.entries))
        for (const [key, value] of source.entries())
          body(value, key, returning);
      else for (const value of source) body(value, null, returning);
    else for (const key in source) body(source[key], key, returning);

  return returning;
};

// each + updating-returning
module.exports.reduce = (source, inject, body) => {
  if (exists(source))
    if (isArrayIterable(source))
      for (let key = 0, { length } = source; key < length; key++)
        inject = body(inject, source[key], key);
    else if (isOfIterable(source))
      if (isFunction(source.entries))
        for (const [key, value] of source.entries())
          inject = body(inject, value, key);
      else for (const value of source) inject = body(inject, value, null);
    else for (const key in source) inject = body(source[key], key, inject);

  return inject;
};

module.exports.find = (source, returning, body) => {
  let done = false;
  if (exists(source)) {
    if (isArrayIterable(source))
      for (let key = 0, { length } = source; key < length; key++) {
        [done, returning] = body(source[key], key, returning);
        if (done) break;
      }
    else if (isOfIterable(source))
      if (isFunction(source.entries))
        for (const [key, value] of source.entries()) {
          [done, returning] = body(value, key, returning);
          if (done) break;
        }
      else
        for (const value of source) {
          [done, returning] = body(value, null, returning);
          if (done) break;
        }
    else
      for (const key in source) {
        [done, returning] = body(source[key], key, returning);
        if (done) break;
      }
  }

  return returning;
};

module.exports.eachFull = (source, returning, body) => {
  let r, key, value, length;
  if (exists(source))
    if (isArrayIterable(source)) {
      for (key = 0, { length } = source; key < length; key++)
        if ((r = body(source[key], key))) return r[0];
    } else if (isOfIterable(source))
      if (isFunction(source.entries)) {
        for ([key, value] of source.entries())
          if ((r = body(source[key], key))) return r[0];
      } else {
        for (value of source) if ((r = body(source[key], key))) return r[0];
      }
    else for (key in source) if ((r = body(source[key], key))) return r[0];

  return returning;
};
