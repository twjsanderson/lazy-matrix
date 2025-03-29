import { isObj, isSafeBigInt, isSafeFloat, isSafeNumber, isMap } from './utils';

export const mathOperation = (a, b, type) => {
    if (a === null || b === null) throw Error('Unable to perform math operation on null value')
    const operations = {
        'ADD': (a, b) => a + b,
        'SUBTRACT': (a, b) => a - b,
        'MULTIPLY': (a, b) => a * b,
        'DIVIDE': (a, b) => a / b, 
        'MOD': (a, b) => a % b
    };
    const op = operations[type];
    let result = 0;
    switch (true) {
        case isObj(a) && isObj(b):                              // BigInt - BigInt
            if (isSafeBigInt(a.num) && isSafeBigInt(b.num)) {            
                result = op(a.num, b.num);
                break;
            }                     
        case isObj(a) && !isObj(b):                             // BigInt - Number | Float
            const bInt = isSafeFloat(b) ? Math.round(b) : b;    // round value because unable to operate float vs BigInt
            if (isSafeBigInt(a.num)) {
                result = op(a.num, BigInt(bInt)) / a.denom;
                break;         
            }         
        case !isObj(a) && isObj(b):                             // Number | Float - BigInt
            const aInt = isSafeFloat(a) ? Math.round(a) : a;    // round value because unable to operate float vs BigInt    
            if (isSafeBigInt(b.num)) {
                result = op(BigInt(aInt), b.num) / b.denom;
                break;
            }
        default:                                                // Number | Float - Number | Float
            result = op(a, b);                         
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
    const op = operations[type];
    const startingValue = type === 'MAX' ? -Infinity : Infinity;
    let pair = [null, startingValue];
    for (const [key, value] of m.entries()) {
        if (op(value, pair[1]) && value !== null) pair = [key, value];
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
    const lastKey = () => {
        let keys = [];
        m.forEach((_, index) => keys.push(index));
        return keys.sort().reverse()[0];
    }
    m.forEach((value, key) => {
        const coords = key.split(',');
        const row = coords[0];
        const col = coords[1];
        if (coords !== '0,0' && coords !== lastKey()) {
            const newRow = col;
            const newCol = row;
            transposedMatrix.set(`${newRow},${newCol}`, value);
        } else {
            transposedMatrix.set(`${row},${col}`, value);
        }
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
            let sum = 0;
            for (let k = 0; k < rows; k++) {
                const key1 = `${i},${k}`;
                const key2 = `${k},${j}`;
                sum += mathOperation((m1.get(key1) || 0), (m2.get(key2) || 0), 'MULTIPLY');
            }
            const key = `${i}${j}`;
            result.set(key, sum);
        }
    }
    return result;
};

export const matrixPseudoinverse = (m, config) => {
    const { rows, cols } = config;

    if (rows >= cols) {
        // Case 1: Tall (or square) matrix: Pseudoinverse = (A^T A)^(-1) A^T
        const adjugate = matrixTranspose(m);
        const multipliedAdjugate = matrixMultiply(adjugate, m, cols, rows);
        const inverse = matrixInverse(multipliedAdjugate);

        if (!inverse) {
            throw new Error("Matrix is not full-rank, cannot compute inverse.");
        }

        return matrixMultiply(inverse, adjugate, cols, rows);
    } else {
        // Case 2: Wide matrix: Pseudoinverse = A^T (A A^T)^(-1)
        const adjugate = matrixTranspose(m);
        const multipliedAdjugate = matrixMultiply(m, adjugate, rows, cols);
        const inverse = matrixInverse(multipliedAdjugate);

        if (!inverse) {
            throw new Error("Matrix is not full-rank, cannot compute inverse.");
        }

        return matrixMultiply(adjugate, inverse, cols, rows);
    }
};

export const matrixDivide = (m1, m2, m1Config, m2Config) => {
    if (m1Config.cols !== m2Config.rows) throw Error(`Unable to divide matrices with incompatible dimensions`);
    let inverse;
    // Case 1: If m2 is square, use the standard inverse.
    if (m2Config.rows === m2Config.cols) {
        const det = matrixDeterminant(m2, m2Config.rows, m2Config.cols);
        if (det === 0) {
        throw new Error("Cannot divide by a singular matrix (determinant is 0)");
        }
        const co = matrixCofactor(m2, m2Config.rows, m2Config.cols);
        const adjugate = matrixTranspose(co);
        inverse = matrixInverse(adjugate, det);
    } else {     
        // Case 2: m2 is non-square, so compute its Moore–Penrose pseudoinverse.
        inverse = matrixPseudoinverse(m2, m2Config);
        if (!inverse) {
            throw new Error("Pseudoinverse computation failed or matrix is not full-rank");
        }
    }
  
  // Multiply m1 by the inverse (or pseudoinverse) of m2.
  return matrixMultiply(m1, inverse, m1Config.rows, m2Config.cols);
};