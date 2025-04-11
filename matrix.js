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
    findByValue,
} from './operations.js';
import { 
    isArray, 
    isNumber, 
    isSafeBigInt, 
    isSafeNumber, 
    isSafeFloat, 
    isSafeMatrixLength,
    isObj,
} from './utils.js';

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

export const buildMatrix = (func, args) => {
    const newMatrix = {
        'matrixCofactor': () => {
            const { matrix, rows, cols } = args;
            const newMap = func(matrix, rows, cols);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
        'matrixTranspose': () => {
            const { matrix, rows, cols } = args;
            const newMap = func(matrix, rows);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
        'matrixInverse': () => {
            const { adjugate, determinant, rows, cols } = args;
            const newMap = func(adjugate, determinant);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
        'transformByScalar': () => {
            const { matrix, scalar, type, rows, cols } = args;
            const newMap = func(matrix, scalar, type);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
        'matrixMultiply': () => {
            const { matrix, matrix2, rows, cols, matrix2Cols } = args;
            const newMap = func(matrix, matrix2, rows, matrix2Cols);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
        'matrixDivide': () => {
            const { matrix, matrix2, matrixConfig, matrix2Config } = args;
            const { rows, cols } = matrixConfig;
            const newMap = func(matrix, matrix2, matrixConfig, matrix2Config);
            const newMatrix = Matrix(rows, cols);
            newMatrix.matrix = newMap;
            return newMatrix;
        },
    }
    return newMatrix[func.name]();
}

export const Matrix = (r, c) => {
    const rows = setRows(r);
    const cols = setCols(c, rows);
    const matrix = setMatrix(rows, cols);
    const properties = { rows, cols, matrix };
    const functions = { 
        set: (row, col, value) => setValue(matrix, row, col, value),
        get: (row, col) => getValue(matrix, row, col),
        delete: (row, col) => deleteValue(matrix, row, col),
        size: () => getMatrixSize(matrix),
        isSquare: () => getIsSquare(rows, cols),
        equals: (m2) =>  isEqualMatrix(matrix, m2),
        find: (value) => findByValue(matrix, value),
        min: () => getByOperator(matrix, 'MIN'),
        max: () => getByOperator(matrix, 'MAX'),
        mean: (axis, index) => getMean(matrix, axis, index),
        determinant: () => matrixDeterminant(matrix, rows, cols),
        
        // Functions that return new Matrix
        cofactor: () => buildMatrix(matrixCofactor, {matrix, rows, cols}),
        transpose: () => buildMatrix(matrixTranspose, {matrix, rows, cols}),
        inverse: (adjugate, determinant) => buildMatrix(matrixInverse, {adjugate, determinant, rows, cols}),
        multiplyBy: (scalar) => buildMatrix(transformByScalar, {matrix, scalar, type: 'MULTIPLY', rows, cols}),
        divideBy: (scalar) => buildMatrix(transformByScalar, {matrix, scalar, type: 'DIVIDE', rows, cols}),
        addBy: (scalar) => buildMatrix(transformByScalar,{matrix, scalar, type: 'ADD', rows, cols}),
        subtractBy: (scalar) => buildMatrix(transformByScalar, {matrix, scalar, type: 'SUBTRACT', rows, cols}),
        moduloBy: (scalar) => buildMatrix(transformByScalar, {matrix, scalar, type: 'MOD', rows, cols}),
        multiply: (m2) => buildMatrix(matrixMultiply, {matrix, matrix2: m2.matrix, rows, cols, matrix2Cols: m2.cols}),
        divide: (m2) => buildMatrix(matrixDivide, {matrix, matrix2: m2.matrix, matrixConfig: { rows, cols }, matrix2Config: { rows: m2.rows, cols: m2.cols }}),
    };
    return Object.assign(properties, functions);
};
