import {
    matrixTranspose,
    matrixMultiply,
    matrixDivide,
    matrixDeterminant,
    matrixCofactor,
    matrixInverse,
    transformByScalar,
    isEqualMatrix,
    getByOperator,
    getMean,
} from './operations';
import { 
    isArray, 
    isNumber, 
    isSafeBigInt, 
    isSafeNumber, 
    isSafeFloat, 
    isSafeMatrixLength,
    isObj,
} from './utils';

export const setMatrix = (rows, cols) => {
    const matrix = new Map();
    for (let i = 0; i < rows; i++) {
        const columns = isArray(cols) ? cols[i]: cols;
        for (let j = 0; j < columns; j++) {
            matrix.set(`${i},${j}`, null);
        }
    }
    return matrix;
}

export const setRows = (rows) => {
    if (isSafeMatrixLength(rows)) return rows;
    throw Error(`Unable to set matrix row size`);
}
export const setCols = (cols, rows) => {
    if (!isArray(cols) && isSafeMatrixLength(cols)) return cols;
    if (
        isArray(cols) &&
        cols.length && 
        cols.every(col => isSafeMatrixLength(col)) &&
        cols.length === rows
    ) return cols;
    throw Error(`Unable to set matrix column size`);
}

export const getIsSquare = (rows, cols) => {
    if (isNumber(cols)) return rows === cols;
    return isArray(cols) && cols.every(col => col === rows);
}

export const getMatrixSize = (matrix) => matrix.size;

export const setValue = (matrix, row, col, value) => {
    const isSafeType = isSafeNumber(value) || isSafeBigInt(value) || isSafeFloat(value);
    if (!isSafeType) throw Error(`Value must be a safe number, float or BigInt`);
    
    if (!matrix.has(`${row},${col}`)) throw Error(`Coordinates out of range`);

    const val = isSafeBigInt(value) ? { num: value, denom: 1n } : value
    return !!matrix.set(`${row},${col}`, val)
}

export const deleteValue = (matrix, row, col) => {
    if (!matrix.has(`${row},${col}`)) throw Error(`Coordinates out of range`);
    return !!matrix.set(`${row},${col}`, null);
}

export const getValue = (matrix, row, col) => {
    if (!matrix.has(`${row},${col}`)) throw Error(`Coordinates out of range`);
    const value = matrix.get(`${row},${col}`)
    return isObj(value) ? value.num : value;
}

export const Matrix = (r, c) => {
    const rows = setRows(r);
    const cols = setCols(c, rows);
    const matrix = setMatrix(rows, cols);

    const properties = { rows, cols, matrix };
    const functions = { 
        set: (row, col, value) => setValue(matrix, row, col, value),
        delete: (row, col) => deleteValue(matrix, row, col),
        get: (row, col) => getValue(matrix, row, col),
        
        size: () => getMatrixSize(matrix),
        isSquare: () => getIsSquare(rows, cols),
        equals: (m2) =>  isEqualMatrix(matrix, m2),
        find: (value) => findByValue(matrix, value),
        min: () => getByOperator(matrix, 'MIN'),
        max: () => getByOperator(matrix, 'MAX'),
        mean: (axis, index) => getMean(matrix, axis, index),

        transpose: () => matrixTranspose(matrix, rows),
        determinant: () => matrixDeterminant(matrix, rows, cols),
        cofactor: () => matrixCofactor(matrix, rows, cols),
        inverse: (adjugate, determinant) => matrixInverse(adjugate, determinant),

        multiplyBy: (scalar) => transformByScalar(matrix, scalar, 'MULTIPLY'),
        divideBy: (scalar) => transformByScalar(matrix, scalar, 'DIVIDE'),
        addBy: (scalar) => transformByScalar(matrix, scalar, 'ADD'),
        subtractBy: (scalar) => transformByScalar(matrix, scalar, 'SUBTRACT'),
        moduloBy: (scalar) => transformByScalar(matrix, scalar, 'MOD'),

        multiply: (m2) => matrixMultiply(matrix, m2.matrix, rows, m2.cols),
        divide: (m2) => matrixDivide(matrix, m2.matrix, { rows, cols }, { rows: m2.rows, cols: m2.cols }),

    };
    return Object.assign(properties, functions);
}

/**
 * update divide
 * modulo
 * min
 * max
 * diag
 * mean
 * 
 */