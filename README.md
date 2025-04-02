# Lazy-Matrix

A simple library built to help lazy programmers generate and modify matrices (2D arrays or array of arrays) in JavaScript.

You can be even lazier than normal with Lazy-Matrix because it allows you to store numbers, floats and BigInt data types in the same matrix.

It gets even better, you can also do a series of elementary mathematical operations on your matrices including multiplication and division!


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