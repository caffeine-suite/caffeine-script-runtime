# Iteration (v3)

## Common Concepts

### exists

An object "exists" if it is not null and not undefined.

### isArrayIterable

An object is array-iterable if, and only if:

* source exists
* source.length is an integer and is >= 0
* source.indexOf is a function
* source is not a plain object

```javascript
(source) =>
  exists(source) &&
  isNonNegativeInt(source.length) &&
  isFunction(source.indexOf) &&
  source.constructor != Object
```

### Iteration Types

#### Source does not exist (`null` or `undefined`)

* No iteration occurs
* `body` is not called
* `returning` is immediately returned.

#### Source `isArrayIterable`

Uses a standard JavaScript for-loop:

```javascript
for (let key = 0, { length } = source; key < length; key++)
  {...}
```

* Note, if `source.length === 0`, the result is identical to the case where source does not exist.

#### Source is Object

If the source exists but is not arrayIterable, all iterable properties are iterated over using a standard JavaScript for-in loop:

```javascript
for (let key in source) {...}
```

* Note, if there are no iterable properties, the result is identical to the case where source does not exist.


# Performance

#### Baseline

You can use the following code to test the current relative performance of JavaScript Iterators vs forEach vs plain old for-loops:

```javascript
let largeArray = [];
let smallArray = [];
for (let i = 0; i < 1000; i++) smallArray[i] = i;
for (let i = 0; i < 1000000; i++) largeArray[i] = i;

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

const countWithIterator = (array) => {
  let count = 0;
  for (let value of array) {count += value}
  return count;
}

const countWithTraditionalFor = (array) => {
  let count = 0;
  for (let i = 0, {length} = array; i < length; i++) {
    count += array[i];
  }
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

const assertEq = (v1, v2) => {
  if (v1 !== v2) {throw new Error(`${v1} != ${v2}`)}
}

assertEq(499500, countWithIterator(smallArray));
assertEq(499500, countWithTraditionalFor(smallArray));
assertEq(499500, countWithForEach(smallArray));
assertEq(499500, countSimpleIterator(smallArray));
assertEq(499500, countReusableSimpleIterator(smallArray));

```