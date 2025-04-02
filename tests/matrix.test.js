import {
    SAFE_MATRIX_SIZE,
    MAX_SAFE_BIGINT, 
    MIN_SAFE_BIGINT,
} from '../constants';
import {
    setMatrix,
    setCols,
    setRows,
    getIsSquare,
    getMatrixSize,
    setValue,
    getValue,
    deleteValue,
    Matrix,
} from '../matrix';


describe('setMatrix function', () => {
    const dimensions = [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 3],
        [3, 5],
        [200, 200],
        [4, [1, 2, 3, 4]],
        [5, [3, 3, 3, 3, 3]],
        [5, [5, 5, 5, 5, 5]],
        [3, [4, 3, 1]],
    ];
    // we dont have to test if # cols (in col array) === rows because this is verifed in setCols and setRows
    test('Should return Map representation of matrix with dimensions and values', () => {
        dimensions.forEach((dimension) => {
            const [rows, cols] = [dimension[0], dimension[1]];
            const m = setMatrix(rows, cols);
            expect(m instanceof Map).toBe(true);
            let firstRowLength = 0;
            let colSizes = {};
            m.forEach((val, key) => {
                expect(typeof key === 'string').toBe(true);
                expect(key).toBeTruthy();
                expect(key).toContain(',');
                const [row, col] = key.split(',');
                expect(Number(row)).toBeGreaterThan(-1);
                // calc col sizes for number and array of numbers
                if (Array.isArray(cols)) {
                    expect(Array.isArray(cols)).toBe(true);
                    colSizes[row] = (colSizes[row] || 0) + 1
                } else {
                    expect(Number(col)).toBeGreaterThan(-1);
                    if (row === '0') firstRowLength++;
                }
                expect(val).toBeNull();
            });
            // test col total sizes for number and array of numbers
            if (Array.isArray(cols)) {
                let colSizesTotal = 0;
                for (const key in colSizes) {
                    const colLength = colSizes[key];
                    expect(colLength).toEqual(cols[key]);
                    colSizesTotal += colLength;
                }
                expect(m.size).toEqual(colSizesTotal);
            } else {
                expect(cols).toEqual(firstRowLength);
                expect(m.size).toEqual(rows * cols);
            }
            expect(m).not.toBeUndefined();
            expect(!Array.isArray(m)).toBeTruthy();
        });
    });
});

describe('setRows function', () => {
    test('Should return rows for new matrix if safe size', () => {
        expect(setRows(32)).toEqual(32);
        expect(setRows(32)).not.toEqual(1);
        expect(setRows(3322)).toEqual(3322);
        expect(setRows(5000)).toEqual(SAFE_MATRIX_SIZE);
        expect(() => setRows(SAFE_MATRIX_SIZE + 1)).toThrow('Unable to set matrix row size');
        expect(() => setRows(0)).toThrow('Unable to set matrix row size');
        expect(() => setRows(-1)).toThrow('Unable to set matrix row size');
        expect(() => setRows(null)).toThrow('Unable to set matrix row size');
        expect(() => setRows(undefined)).toThrow('Unable to set matrix row size');
        expect(() => setRows([])).toThrow('Unable to set matrix row size');
        expect(() => setRows({})).toThrow('Unable to set matrix row size');
        expect(() => setRows('test')).toThrow('Unable to set matrix row size');
    });
});

describe('setCols function', () => {
    test('Should return cols for new matrix if safe size', () => {
        expect(setCols(32, 32)).toEqual(32);
        expect(setCols(32, 32)).not.toEqual(1);
        expect(setCols(3322, 3322)).toEqual(3322);
        expect(setCols(5000, 5000)).toEqual(SAFE_MATRIX_SIZE);
        expect(setCols([1, 2, 3], 3)).toEqual([1, 2, 3]);
        expect(setCols([3], 1)).toEqual([3]);
        expect(() => setCols([null, null, null], 3)).toThrow('Unable to set matrix column size');
        expect(() => setCols(SAFE_MATRIX_SIZE + 1, SAFE_MATRIX_SIZE)).toThrow('Unable to set matrix column size');
        expect(() => setCols(null, 23)).toThrow('Unable to set matrix column size');
        expect(() => setCols(undefined, 23)).toThrow('Unable to set matrix column size');
        expect(() => setCols([], 23)).toThrow('Unable to set matrix column size');
        expect(() => setCols([1], 23)).toThrow('Unable to set matrix column size');
        expect(() => setCols({}, 23)).toThrow('Unable to set matrix column size');
        expect(() => setCols('test', 23)).toThrow('Unable to set matrix column size');
    });
});

describe('getIsSquare function', () => {
    test('Should return true if rows and cols are equal', () => {
        expect(getIsSquare(32, 32)).toBe(true);
        expect(getIsSquare(32, 32)).not.toBe(false);
        expect(getIsSquare(2, [2, 2])).toBe(true);
        expect(getIsSquare(50, new Array(50).fill(50))).toBe(true);
    });
    test('Should return false if rows and cols are not equal', () => {
        expect(getIsSquare(2, [2, 2, 3])).toBe(false);
        expect(getIsSquare(2, [null, null, null])).toBe(false);
        expect(getIsSquare(2, [1, 23, 4])).toBe(false);
        expect(getIsSquare(2, [1, 4])).toBe(false);
        expect(getIsSquare(2, [1, 4, 5, 6])).toBe(false);
        expect(getIsSquare({}, false)).toBe(false);
        expect(getIsSquare(50, new Array(50).fill(51))).toBe(false);
        expect(getIsSquare(51, new Array(50).fill(50))).toBe(false);
    });
});

describe('getMatrixSize function', () => {
    const values = [
        {
            coords: [[1, 2]],
            res: 1
        },
        {
            coords: [[1, 2], [2, 3]],
            res: 2
        },
        {
            coords: [[1, 2], [3, 3], [4, 4]],
            res: 3
        },
        {
            coords: [],
            res: 0
        },
    ];
    test('Should return matrix size', () => {
        for (const value of values) {
            const { coords, res } = value;
            expect(getMatrixSize(new Map(coords))).toEqual(res);
        }
    });
});

describe('setValue function', () => {
    const errors = [
        {
            row: 1,
            col: 0,
            value: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 1,
            value: MAX_SAFE_BIGINT + 1n,
            matrix: setMatrix(3, 3),
            res: `Value must be a safe number, float or BigInt`
        },
        {
            row: 1,
            col: 1,
            value: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 0,
            col: 1,
            value: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 2,
            value: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 0,
            col: 1,
            value: null,
            matrix: setMatrix(1, 1),
            res: `Value must be a safe number, float or BigInt`
        },
        {
            row: 1,
            col: 6,
            value: 1000,
            matrix: setMatrix(2, [2, 6]),
            res: `Coordinates out of range`
        },
    ];
    test('Should throw error', () => {
        for (const obj of errors) {
            const { row, col, value, matrix, res } = obj;
            expect(() => setValue(matrix, row, col, value)).toThrow(res);
        }
    });
    const successes = [
        {
            row: 0,
            col: 1,
            value: 1000,
            matrix: setMatrix(1, 2),
            res: true
        },
        {
            row: 1,
            col: 5,
            value: 1000,
            matrix: setMatrix(2, [2, 6]),
            res: true
        },
        {
            row: 3,
            col: 2,
            value: 1000n,
            matrix: setMatrix(4, 4),
            res: true
        },
        {
            row: 22,
            col: 42,
            value: 1.75483,
            matrix: setMatrix(24, 45),
            res: true
        },
    ];
    test('Should successfully set value', () => {
        for (const obj of successes) {
            const { row, col, value, matrix, res } = obj;
            expect(setValue(matrix, row, col, value)).toBe(res);
        }
    });
});

describe('deleteValue function', () => {
    const errors = [
        {
            row: 1,
            col: 0,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 0,
            col: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 2,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 6,
            matrix: setMatrix(2, [2, 6]),
            res: `Coordinates out of range`
        },
    ];
    test('Should throw error', () => {
        for (const obj of errors) {
            const { row, col, matrix, res } = obj;
            expect(() => deleteValue(matrix, row, col)).toThrow(res);
        }
    });
    const successes = [
        {
            row: 0,
            col: 1,
            matrix: setMatrix(1, 2),
            res: true
        },
        {
            row: 1,
            col: 5,
            matrix: setMatrix(2, [2, 6]),
            res: true
        },
        {
            row: 3,
            col: 2,
            matrix: setMatrix(4, 4),
            res: true
        },
        {
            row: 22,
            col: 42,
            matrix: setMatrix(24, 45),
            res: true
        },
    ];
    test('Should successfully delete value', () => {
        for (const obj of successes) {
            const { row, col, matrix, res } = obj;
            const initialValue = 5;
            matrix.set(`${row},${col}`, initialValue);
            expect(matrix.get(`${row},${col}`)).toEqual(initialValue);
            expect(deleteValue(matrix, row, col)).toBe(res);
            expect(matrix.get(`${row},${col}`)).toBeNull();
            expect(matrix.get(`${row},${col}`)).not.toEqual(initialValue);
        }
    });
});

describe('getValue function', () => {
    const errors = [
        {
            row: 1,
            col: 0,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 0,
            col: 1,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 2,
            matrix: setMatrix(1, 1),
            res: `Coordinates out of range`
        },
        {
            row: 1,
            col: 6,
            matrix: setMatrix(2, [2, 6]),
            res: `Coordinates out of range`
        },
    ];
    test('Should throw error', () => {
        for (const obj of errors) {
            const { row, col, matrix, res } = obj;
            expect(() => getValue(matrix, row, col)).toThrow(res);
        }
    });
    const successes = [
        {
            row: 0,
            col: 1,
            matrix: setMatrix(1, 2),
        },
        {
            row: 1,
            col: 5,
            matrix: setMatrix(2, [2, 6]),
        },
        {
            row: 3,
            col: 2,
            matrix: setMatrix(4, 4),
        },
        {
            row: 22,
            col: 42,
            matrix: setMatrix(24, 45),
        },
    ];
    test('Should successfully get value', () => {
        for (const obj of successes) {
            const { row, col, matrix } = obj;
            const initialValue = 5;
            matrix.set(`${row},${col}`, initialValue);
            expect(getValue(matrix, row, col)).toBe(initialValue);
            expect(getValue(matrix, row, col)).not.toBeNull();
        }
    });
});


describe('Matrix function', () => {
    const functionNames = [
        'set',
        'delete',
        'get',
        'size',
        'isSquare',
        'equals',
        'find',
        'min',
        'max',
        'mean',
        'transpose',
        'determinant',
        'cofactor',
        'inverse',
        'multiplyBy',
        'divideBy',
        'addBy',
        'subtractBy',
        'moduloBy',
        'multiply',
        'divide',
    ];
    const m = Matrix(3, 2);
    test('Should contain all functions & properties', () => {
        expect(m).toHaveProperty('matrix');
        expect(m).toHaveProperty('rows');
        expect(m).toHaveProperty('cols');
        for (const func of functionNames) {
            expect(m).toHaveProperty(func);
            expect(m.hasOwnProperty(func)).toBe(true);
            expect(m[func]).toBeInstanceOf(Function);
        }
    });
});

