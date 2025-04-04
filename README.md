# Lazy-Matrix

Lazy-Matrix is a lightweight, intuitive JavaScript library for generating, modifying, and performing operations on matrices. Designed for the 'lazy programmer', it simplifies working with 2D arrays by allowing you to mix Numbers, Floats, and BigInts in a single matrix. 

Beyond just creation and manipulation, Lazy-Matrix provides a suite of elementary mathematical operations—including multiplication and division—to make matrix arithmetic effortless.

Mix, match and be lazy.

## CAUTION

Lazy-matrix enables you to perform mathematical operations between three data types (Number, Float and BigInt). 
We perform conversions to make this possible and it comes at a high cost to both precision and speed.

DO NOT expect high precision results when mixing data types.

This is a JavaScript library made for lazy developers who don't want to do type conversions, simple mathematical operations on matrices or even build a matrix themselves.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

### NPM
```bash
 npm install lazy-matrix
```

### Clone
1. Clone the repository:
```bash
 git clone https://github.com/twjsanderson/lazy-matrix
```

2. Install dependencies:
```bash
 npm install
```

## Usage

### **Matrix(**``rows: number``, ``cols: number | string[]``**)**
- Defaults all values to null

```javascript
const m = Matrix(2, 2);
/**
 * 
 *  [
 *    [null, null],
 *    [null, null],
 *  ]
 * 
 */

const m = Matrix(3, [2, 3, 4]);
/**
 * 
 *  [
 *    [null, null],
 *    [null, null, null],
 *    [null, null, null, null],
 *  ]
 * 
 */
```

### **.set(**``row: number``, ``col: number``, ``value: number | float | bigint``**)** => ``boolean``
- Sets new value at given row & col
- Returns true if successful

```javascript
const m = Matrix(2, 2);
console.log(m.set(0, 0, 1000)); // true 
console.log(m.set(0, 1, 50)); // true
console.log(m.set(1, 0, 0.342)); // true
console.log(m.set(1, 1, 34672642347290478n)); // true

/**
 *
 *  [
 *    [1000, 50],
 *    [0.342, 34672642347290478n],
 *  
 *  ]
 * 
 */
```

### **.get(**``row: number``, ``col: number``**)** => ``number | float | bigInt | null``
- Returns value from given row & col
- If no value present, return null

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, 34672642347290478n);

console.log(m.get(0, 0)); // 1000
console.log(m.get(1, 1)); // 34672642347290478n
```

### **.delete(**``row: number``, ``col: number``**)** => ``boolean``
- Deletes (converts to null) value found at given row & col
- Returns true if successful
- Does not modify matrix capacity

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, 34672642347290478n);

m.get(0, 0);
m.get(1, 1);

console.log(m.delete(0, 0)); // true

/**
 *
 *  [
 *    [null, 50],
 *    [0.342, 34672642347290478n],
 *  ]
 * 
 */
```

### **.size()** => ``number``
- Returns matrix total capacity

```javascript
const m = Matrix(34, 34);
console.log(n.size()); // 1156

const m2 = Matrix(3, [5, 4, 3, 2]);
console.log(m2.size()); // 42
```

### **.isSquare()** => ``boolean``
- If matrix dimensions are square return true, else false

```javascript
const m = Matrix(34, 34);
console.log(n.isSquare()); // true

const m2 = Matrix(43, 20);
console.log(m2.isSquare()); // false

const m3 = Matrix(3, [5, 4, 3, 2]);
console.log(m3.isSquare()); // false

const m4 = Matrix(3, [3, 3, 3]);
console.log(m4.isSquare()); // true
```

### **.equals(**``m2: Matrix``**)** => ``boolean``
- Returns true if matrices are equal in both size and values, else return false

```javascript
const m = Matrix(34, 34);
const m2 = Matrix(34, 34);
console.log(m.equals(m2)); // true

const m = Matrix(43, 20);
const m2 = Matrix(20, 43);
console.log(m.equals(m2)); // false

const m = Matrix(4, 4);
const m2 = Matrix(4, [4, 4, 4, 4]);
console.log(m.equals(m2)); // true
```

### **.find(**``value: number | float | bigInt``**)** => ``string | null``
- Returns the key of the given value if present in the matrix, else return null

```javascript
const m = Matrix(34, 34);
const m2 = Matrix(34, 34);
console.log(m.find(m2)); // true

const m = Matrix(43, 20);
const m2 = Matrix(20, 43);
console.log(m.find(m2)); // false
```

### **.min()** => ``[string, number | float | bigint] | null``
- Returns the smallest value in the entire matrix
- Does not consider null values
- If no values found in matrix, return null

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, 34672642347290478n);
console.log(m.min()); // 0.342

const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, null);
m.set(1, 1, 34672642347290478n);
console.log(m.min()); // 50

const m = Matrix(2, 2);
m.set(0, 0, null);
m.set(0, 1, null);
m.set(1, 0, null);
m.set(1, 1, null);
console.log(m.min()); // null
```

### **.max()** => ``[string, number | float | bigint] | null``
- Returns the largest value in the entire matrix
- Does not consider null values
- If no values found in matrix, return null

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, 34672642347290478n);
console.log(m.max()); // 34672642347290478n

const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, null);
console.log(m.max()); // 1000

const m = Matrix(2, 2);
m.set(0, 0, null);
m.set(0, 1, null);
m.set(1, 0, null);
m.set(1, 1, null);
console.log(m.max()); // null
```

### **.mean(``axis: string``, ``index: number``)** => ``number``
- Given a specific axis ('row' or 'col') & an index, return the mean of that axis
- Null values are converted to 0 so the mean is always found

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1000);
m.set(0, 1, 50);
m.set(1, 0, 0.342);
m.set(1, 1, 34672642347290478n);
console.log(m.mean('row', 0)); // 1025
console.log(m.mean('col', 0)); // 500.171

const m = Matrix(2, 2);
m.set(0, 0, 2);
m.set(0, 1, 6);
m.set(1, 0, 4);
m.set(1, 1, null);
console.log(m.mean('col', 1)); // (6 + 0 (null)) / 2 = 3
```

### **.transpose()** => ``Matrix``
- Returns a new transposed matrix

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1);
m.set(0, 1, 2);
m.set(1, 0, 3);
m.set(1, 1, 4);
/**
 *
 *  [
 *    [1, 2],
 *    [3, 4],
 *  ]
 * 
 */

const transposition = m.transpose();
/**
 *
 *  [
 *    [1, 3],
 *    [2, 4],
 *  ]
 * 
 */

const m2 = m2atrix(2, 3);
m2.set(0, 0, 1);
m2.set(0, 1, 2);
m2.set(0, 2, 3);
m2.set(1, 0, 4);
m2.set(1, 1, 5);
m2.set(1, 2, 6);
/**
 *
 *  [
 *    [1, 2, 3],
 *    [4, 5, 6],
 *  ]
 * 
 */

const transposition = m2.transpose();
/**
 *
 *  [
 *    [1, 4],
 *    [2, 5],
 *    [3, 6],
 *  ]
 * 
 */
```

### **.determinant()** => ``number``
- Returns the determinant of a square matrix
- Cannot calculate the determinant of non-square matrices

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1);
m.set(0, 1, 2);
m.set(1, 0, 3);
m.set(1, 1, 4);
console.log(m.determinant()); // -2
```

### **.cofactor()** => ``number``
- Returns the cofactor of a square matrix
- Cannot calculate the cofactor of non-square matrices

```javascript
const m = Matrix(2, 2);
m.set(0, 0, 1);
m.set(0, 1, 2);
m.set(1, 0, 3);
m.set(1, 1, 4);
/**
 *
 *  [
 *    [1, 2],
 *    [3, 4],
 *  ]
 * 
 */

const cofactor = m.cofactor();
/**
 *
 *  [
 *    [4, -3],
 *    [-2, 1],
 *  ]
 * 
 */
```






m1 Dimensions	m2 Dimensions	Allowed?	Explanation
2 × 2	2 × 2	Yes	m2 is square; m1 has 2 columns matching m2’s 2 rows. Result: 2 × 2.
3 × 2	2 × 2	Yes	m2 is square; m1 has 2 columns matching m2’s 2 rows. Result: 3 × 2.
2 × 3	2 × 3	Yes	m2 is non-square; m1 has 3 columns matching m2’s 3 columns. Pseudoinverse of 2×3 is 3×2. Result: 2 × 2.
3 × 2	3 × 2	Yes	m2 is non-square; m1 has 2 columns matching m2’s 2 columns. Pseudoinverse of 3×2 is 2×3. Result: 3 × 3.
2 × 2	2 × 3	No	m2 is non-square; its pseudoinverse is 3 × 2. But m1 (2×2) has 2 columns ≠ 3 columns required.
2 × 3	3 × 2	No	m2 is non-square; its pseudoinverse is 2 × 3. But m1 (2×3) has 3 columns ≠ 2 columns required.
3 × 3	2 × 2	No	m2 is square; m1 (3×3) has 3 columns, but m2 requires 2 columns/rows.
2 × 3	2 × 2	No	m2 is square; m1 (2×3) has 3 columns, but m2’s 2 rows are needed.
3 × 2	2 × 3	No	m2 is non-square; requires m1 to have 3 columns (since m2 has 3 columns), but m1 (3×2) has only 2.


For square m2 (r × r):
Allowed if: m1 is any matrix with r columns (m × r).
Not allowed if: m1 has a different number of columns than r.

For non-square m2 (r × c):
Allowed if: m1 has exactly c columns (m × c).
Not allowed if: m1’s column count is not equal to c.


## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## License

MIT License

Copyright (c) [2025] [Tom Sanderson]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


