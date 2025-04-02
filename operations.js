import * as math from 'mathjs';
import { isObj, isSafeBigInt, isSafeFloat, isSafeNumber, isMap, isFloat } from './utils';

export const mathOperation = (a, b, type) => {
    if (a === null || b === null) throw Error('Unable to perform math operation on null value')
    const operations = {
        'ADD': (a, b) => a + b,
        'SUBTRACT': (a, b) => a - b,
        'MULTIPLY': (a, b) => a * b,
        'DIVIDE': (a, b) => a / b, 
        'MOD': (a, b) => a % b
    };
    const operation = operations[type];
    const divide = operations['DIVIDE'];
    let result = 0;

    switch (true) {
        case isObj(a) && isObj(b):                       // BigInt - BigInt
            if (isSafeBigInt(a.num) && isSafeBigInt(b.num)) {            
                result = operation(a.num, b.num);
                break;
            }                     
        case isObj(a) && !isObj(b):
            const bValue = isSafeFloat(b) ? Math.floor(b) : 
                isObj(b) ? b.num : b;
            if (isSafeBigInt(a.num)) {
                result = divide(
                    operation(a.num, BigInt(bValue)), 
                    a.denom
                );
                break;         
            }         
        case !isObj(a) && isObj(b):
            const aValue = isSafeFloat(a) ? Math.floor(a) : 
                isObj(a) ? a.num : a;   
            if (isSafeBigInt(b.num)) {
                result = divide(
                    operation(BigInt(aValue), b.num), 
                    b.denom
                );
                break;
            }
        default:                                              
            result = operation(a, b);                         
    }
    const isSafeType = isSafeNumber(result) || isSafeBigInt(result) || isSafeFloat(result);
    if (!isSafeType) throw Error(`Math operation result must be a safe number, float or BigInt`);
    return result;
};

export const isEqualMatrix = (m1, m2) => {
    if (!isMap(m1) || !isMap(m2)) throw new Error('Can only compare matrices');
    if (m1.size !== m2.size) return false;
    for (let [key, value] of m1.entries()) {
        if (!m2.has(key) || m2.get(key) !== value) return false;
    }
    return true;
};

export const findByValue = (m, val) => {
    for (const [key, value] of m.entries()) {
        if (val === value) return key;
    }
    return null;
};

export const getByOperator = (m, type) => {
    const operations = {
        'MAX': (a, b) => a > b,
        'MIN': (a, b) => a < b
    };
    const operation = operations[type];
    const startingValue = type === 'MAX' ? -Infinity : Infinity;
    let pair = [null, startingValue];
    for (const [key, value] of m.entries()) {
        if (operation(value, pair[1]) && value !== null) pair = [key, value];
    }
    return pair[0] === null ? null : pair;
};

export const getMean = (m, axis, index) => {
    if (axis !== 'row' && axis !== 'col') throw new Error('Axis must be either "row" or "col"');
    if (!isSafeNumber(index)) throw new Error('Index must be safe number');
    let mean = 0;
    let size = 0;
    for (const [key, value] of m.entries()) {
        const axisChoice = axis === 'row' ? key[0] : key[2];
        if (Number(axisChoice) === index) {
            const nonNullValue = value === null ? 0 : value;
            mean = mathOperation(mean, nonNullValue, 'ADD')
            size++;
        }
    }
    return mathOperation(mean, size, 'DIVIDE');
};

export const transformByScalar = (matrix, scalar, operation) => {
    const isSafeType = isSafeNumber(scalar) || isSafeFloat(scalar);
    if (!isMap(matrix) || !isSafeType) throw new Error('Can only transform matrix by safe number');
    const result = new Map();
    for (const [key, value] of matrix.entries()) {
        result.set(key, mathOperation(value, scalar, operation));
    }
    return result;
};

export const matrixTranspose = (m) => {
    const transposedMatrix = new Map();
    m.forEach((value, key) => {
        const [row, col] = key.split(',').map(Number);
        transposedMatrix.set(`${col},${row}`, value);
    });
    return transposedMatrix;
};

export const matrixDeterminant = (matrix, rows, cols) => {
    if (rows !== cols || rows <= 0) throw Error("Cannot find determinant of non-square matrix");
    if (rows === 1) return matrix.get('0,0'); // Base case: 1 x 1
    if (rows === 2) { // Base case: 2 x 2
        return mathOperation(
                mathOperation(matrix.get('0,0'), matrix.get('1,1'), 'MULTIPLY'),
                mathOperation(matrix.get('0,1'), matrix.get('1,0'), 'MULTIPLY'),
                'SUBTRACT'
            )
    }
    let det = 0;
    for (let col = 0; col < rows; col++) {
        const subMatrix = new Map();
        let subRow = 0;
        for (let i = 1; i < rows; i++) {
            let subCol = 0;
            for (let j = 0; j < rows; j++) {
                if (j !== col) {
                    subMatrix.set(`${subRow},${subCol}`, matrix.get(`${i},${j}`));
                    subCol++;
                }
            }
            subRow++;
        }

        if (!subMatrix || subMatrix.size === 0) throw Error(`Invalid submatrix at col ${col}`);

        det += mathOperation(
                mathOperation(
                    (col % 2 === 0 ? 1 : -1), 
                    matrix.get(`0,${col}`), 
                    'MULTIPLY'
                ), 
                matrixDeterminant(subMatrix, rows - 1, cols - 1), 
                'MULTIPLY'
            );
    }
    return det;
};

export const matrixCofactor = (matrix, rows, cols) => {
    if (rows !== cols) throw Error("Cannot find cofactor of non-square matrix");
    const cofactors = new Map();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            // Create the minor by excluding row `i` and column `j`
            const minor = new Map();
            let minorRow = 0;
            for (let row = 0; row < rows; row++) {
                if (row === i) continue; // Skip the current row
                
                let minorCol = 0;
                for (let col = 0; col < rows; col++) {
                    if (col === j) continue; // Skip the current column
                    
                    // Add remaining elements to the minor
                    minor.set(`${minorRow},${minorCol}`, matrix.get(`${row},${col}`));
                    minorCol++;
                }
                minorRow++;
            }
            // Calculate the cofactor (± determinant of the minor)
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            cofactors.set(`${i},${j}`, mathOperation(sign, matrixDeterminant(minor, rows - 1, cols - 1), 'MULTIPLY'));
        }
    }
    return cofactors;
};

export const matrixInverse = (adjugate, determinant) => {
    const inverse = new Map();
    if (determinant === 0 || !isSafeNumber(determinant)) throw new Error('Matrix is not invertible');
    if (!isMap(adjugate)) throw new Error('Adjugate must be instance of matrix');
    adjugate.forEach((value, key) => inverse.set(key, mathOperation(value, determinant, 'DIVIDE')));
    return inverse;
};

export const matrixMultiply = (m1, m2, rows, cols) => {
    const result = new Map();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let sums = [];
            for (let k = 0; k < rows; k++) {
                const key1 = `${i},${k}`;
                const key2 = `${k},${j}`;
                sums.push(mathOperation((m1.get(key1) || 0), (m2.get(key2) || 0), 'MULTIPLY'));
            }
            const hasBigInt = sums.map(sum => typeof sum === 'bigint').includes(true);
            // convert all sums to BigInt if at least 1 is already present to ensure math operations work
            if (hasBigInt) {
                sums = sums.map(sum => {
                    if (isSafeFloat(sum) || isSafeNumber(sum)) return BigInt(Math.floor(sum));
                    return sum;
                })
            }
            const totalSum = sums.reduce((a, b) => mathOperation(a, b, 'ADD'));
            const fmtTotalSum = hasBigInt ? { num: totalSum, denom: 1n } : totalSum;
            result.set(`${i},${j}`, fmtTotalSum);
        }
    }
    return result;
};

export const matrixPseudoinverse = (m, config) => {
    const { rows, cols } = config;

    // Convert map to a 2D array
    const matrix = Array.from({ length: rows}, (_, i) =>
        Array.from({ length: cols}, (_, j) => m.get(`${i},${j}`) || 0)
    );
    
    // Compute the Moore-Penrose pseudoinverse using SVD
    const pseudoInv = math.pinv(matrix);
    
    // Convert back to map format
    const result = new Map();
    for (let i = 0; i < pseudoInv.length; i++) {
        for (let j = 0; j < pseudoInv[i].length; j++) {
            result.set(`${i},${j}`, pseudoInv[i][j]);
        }
    }

    return result;
};

export const matrixDivide = (m1, m2, m1Config, m2Config) => {
    let inverse;
    if (m2Config.rows === m2Config.cols) {
        if (m1Config.cols !== m2Config.rows) throw new Error(`Incompatible dimensions: m1 has ${m1Config.cols} columns, but m2 has ${m2Config.rows} rows.`);
        const det = matrixDeterminant(m2, m2Config.rows, m2Config.cols);
        if (det === 0) throw new Error("Cannot divide by a singular matrix (determinant is 0)");
        const co = matrixCofactor(m2, m2Config.rows, m2Config.cols);
        const adjugate = matrixTranspose(co);
        inverse = matrixInverse(adjugate, det);
    } else {
        // For non-square m2, compute the Moore–Penrose pseudoinverse.
        inverse = matrixPseudoinverse(m2, m2Config);
        if (!inverse) throw new Error("Pseudoinverse computation failed or matrix is not full-rank");
        if (m1Config.cols !== m2Config.cols) throw new Error(`Incompatible dimensions: m1 has ${m1Config.cols} columns, but pseudoinverse of m2 has ${m2Config.cols} rows.`);
    }
  
    // Multiply m1 by the inverse (or pseudoinverse) of m2.
    // For square m2: result dimensions are m1Config.rows x m2Config.cols.
    // For non-square m2: pseudoinverse is (m2Config.cols x m2Config.rows) so result is m1Config.rows x m2Config.rows.
    const resultCols = (m2Config.rows === m2Config.cols) ? m2Config.cols : m2Config.rows;
    return matrixMultiply(m1, inverse, m1Config.rows, resultCols);
};
