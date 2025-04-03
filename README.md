# Lazy-Matrix

Lazy-Matrix is a lightweight, intuitive JavaScript library for generating, modifying, and performing operations on matrices. Designed for the 'lazy programmer', it simplifies working with 2D arrays by allowing you to mix numbers, floats, and BigInts in a single matrix. 

Beyond just creation and manipulation, Lazy-Matrix provides a suite of elementary mathematical operations—including multiplication and division—to make matrix arithmetic effortless.

Mix, match and be lazy.

## CAUTION

Lazy-matrix enables you to perform mathematical operations between three different data types (number, float and BigInt). 
Under the hood, we perform type conversions make this feature possible but it comes at a cost to both precision and speed.

DO NOT expect high precision results when mixing data types.

This is a JavaScript library made for lazy developers who don't want to do type conversions, simple mathematical operations on matrices or even building a matrix with a few arrays themselves.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
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


# License

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