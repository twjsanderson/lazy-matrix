import { describe, test, expect } from 'jest';
import { Matrix } from '../matrix';
import {
    mathOperation,
    matrixTranspose,
    matrixDeterminant,
    matrixCofactor,
    matrixInverse,
    matrixPseudoinverse,
    isEqualMatrix,
    transformByScalar,
    findByValue,
    getByOperator,
    getMean,
    matrixMultiply,
    matrixDivide,
} from '../operations';

// adding float to bigInt reduces precision by a lot!
// have convert .toString() because jest uses JSON.stringify() under the hood and cant handle BigInt
describe('mathOperation function', () => {
    test('Should return correct ADD operation', () => { 
        expect(mathOperation(1, 1, 'ADD')).toEqual(2);
        expect(mathOperation(132131, 1000, 'ADD')).toEqual(133131);
        expect(mathOperation(13, 0, 'ADD')).toEqual(13);
        expect(mathOperation(20, -10, 'ADD')).toEqual(10);
        expect(mathOperation(1, 1, 'ADD')).not.toEqual(3);
        expect(mathOperation(1, 1.8789, 'ADD')).toEqual(2.8789);
        expect(mathOperation(1.789, 1, 'ADD')).toEqual(2.7889999999999997);
        expect(mathOperation(1.8947, 1.78932, 'ADD')).toEqual(3.6840200000000003);
        expect(mathOperation(0.342, 1, 'ADD')).toEqual(1.342);
        expect(mathOperation({ num: 1000n, denom: 1n }, 1000, 'ADD').toString()).toEqual("2000");
        expect(mathOperation({ num: 1000n, denom: 1n }, 100000000000000, 'ADD').toString()).toEqual("100000000001000");
        expect(mathOperation(100000000000000, { num: 1000n, denom: 1n }, 'ADD').toString()).toEqual("100000000001000");
        expect(mathOperation({ num: 1042300n, denom: 1n }, 142342n, 'ADD').toString()).toEqual("1184642");
        expect(mathOperation(142342n, { num: 1042300n, denom: 1n }, 'ADD').toString()).toEqual("1184642");
        expect(mathOperation({ num: 102344200n, denom: 1n }, 1000.09234, 'ADD').toString()).toEqual("102345200");
        expect(mathOperation(1000.09234, { num: 102344200n, denom: 1n }, 'ADD').toString()).toEqual("102345200");
        expect(mathOperation({ num: 102344200n, denom: 1n }, { num: 102344200n, denom: 1n }, 'ADD').toString()).toEqual("204688400");
        expect(mathOperation({ num: 1034232422344200n, denom: 1n }, { num: 102344342424200n, denom: 1n }, 'ADD').toString()).toEqual("1136576764768400");
        expect(mathOperation({ num: 1034232422344979200n, denom: 1n }, { num: 1023454644342424200n, denom: 1n }, 'ADD').toString()).toEqual("2057687066687403400");
        expect(() => mathOperation({ num: 1034232422344979999999999943439200n, denom: 1n }, { num: 1023454434343434644342429999999994200n, denom: 1n }, 'ADD').toString()).toThrow("Math operation result must be a safe number, float or BigInt");
        expect(() => mathOperation({ num: 1034232422344979999534453424533499999999200n, denom: 1n }, 0.083412, 'ADD').toString()).toThrow("Math operation result must be a safe number, float or BigInt");
        expect(() => mathOperation(null, 0.083412, 'ADD').toString()).toThrow("Unable to perform math operation on null value");
        expect(() => mathOperation(1923478, null, 'ADD').toString()).toThrow("Unable to perform math operation on null value");
    });
    test('Should return correct SUBTRACT operation', () => { 
        expect(mathOperation(1, 1, 'SUBTRACT')).toEqual(0);
        expect(mathOperation(132131, 1000, 'SUBTRACT')).toEqual(131131);
        expect(mathOperation(13, 0, 'SUBTRACT')).toEqual(13);
        expect(mathOperation(20, -10, 'SUBTRACT')).toEqual(30);
        expect(mathOperation(1, 12, 'SUBTRACT')).not.toEqual(13);
        expect(mathOperation(1, 1.8789, 'SUBTRACT')).toEqual(-0.8789);
        expect(mathOperation(1.789, 1, 'SUBTRACT')).toEqual(0.7889999999999999);
        expect(mathOperation(1.8947, 1.78932, 'SUBTRACT')).toEqual(0.10538000000000003);
        expect(mathOperation(0.342, 1, 'SUBTRACT')).toEqual(-0.6579999999999999);
        expect(mathOperation({ num: 1000n, denom: 1n }, 1000, 'SUBTRACT').toString()).toEqual("0");
        expect(mathOperation({ num: 1000n, denom: 1n }, 100000000000000, 'SUBTRACT').toString()).toEqual("-99999999999000");
        expect(mathOperation(100000000000000, { num: 1000n, denom: 1n }, 'SUBTRACT').toString()).toEqual("99999999999000");
        expect(mathOperation({ num: 1042300n, denom: 1n }, 142342n, 'SUBTRACT').toString()).toEqual("899958");
        expect(mathOperation(142342n, { num: 1042300n, denom: 1n }, 'SUBTRACT').toString()).toEqual("-899958");
        expect(mathOperation({ num: 102344200n, denom: 1n }, 1000.09234, 'SUBTRACT').toString()).toEqual("102343200");
        expect(mathOperation(1000.09234, { num: 102344200n, denom: 1n }, 'SUBTRACT').toString()).toEqual("-102343200");
        expect(mathOperation({ num: 102344200n, denom: 1n }, { num: 102344200n, denom: 1n }, 'SUBTRACT').toString()).toEqual("0");
        expect(mathOperation({ num: 1034232422344200n, denom: 1n }, { num: 102344342424200n, denom: 1n }, 'SUBTRACT').toString()).toEqual("931888079920000");
        expect(mathOperation({ num: 1034232422344979200n, denom: 1n }, { num: 1023454644342424200n, denom: 1n }, 'SUBTRACT').toString()).toEqual("10777778002555000");
        expect(() => mathOperation({ num: 10300000000004232422344903455074234324999999999999200n, denom: 1n }, { num: 1023454644342429999999994200n, denom: 1n }, 'SUBTRACT').toString()).toThrow("Math operation result must be a safe number, float or BigInt");
        expect(() => mathOperation({ num: 1034232422344979999534453424533499999999200n, denom: 1n }, 0.083412, 'SUBTRACT').toString()).toThrow("Math operation result must be a safe number, float or BigInt");
        expect(() => mathOperation(null, 0.083412, 'SUBTRACT').toString()).toThrow("Unable to perform math operation on null value");
        expect(() => mathOperation(1923478, null, 'SUBTRACT').toString()).toThrow("Unable to perform math operation on null value");
    });
    test('Should return correct MULTIPLY operation', () => { 
        expect(mathOperation(2, 3, 'MULTIPLY')).toEqual(6);
        expect(mathOperation(132, 10, 'MULTIPLY')).toEqual(1320);
        expect(mathOperation(13, 0, 'MULTIPLY')).toEqual(0);
        expect(mathOperation(20, -10, 'MULTIPLY')).toEqual(-200);
        expect(mathOperation(1.5, 2, 'MULTIPLY')).toEqual(3);
        expect(mathOperation(1.8947, 1.78932, 'MULTIPLY')).toEqual(3.390224604)
        expect(mathOperation({ num: 1000n, denom: 1n }, 1000, 'MULTIPLY').toString()).toEqual("1000000");
        expect(mathOperation({ num: 1000n, denom: 1n }, 10.23402, 'MULTIPLY').toString()).toEqual("10000");
        expect(mathOperation({ num: 1000n, denom: 1n }, { num: 1000n, denom: 1n }, 'MULTIPLY').toString()).toEqual("1000000");
        expect(() => mathOperation(null, 2, 'MULTIPLY')).toThrow("Unable to perform math operation on null value");
    });
    
    test('Should return correct DIVIDE operation', () => { 
        expect(mathOperation(6, 3, 'DIVIDE')).toEqual(2);
        expect(mathOperation(132, 11, 'DIVIDE')).toEqual(12);
        expect(mathOperation(20, -10, 'DIVIDE')).toEqual(-2);
        expect(mathOperation(1.5, 0.5, 'DIVIDE')).toEqual(3);
        expect(mathOperation(1.8947, 1.78932, 'DIVIDE')).toBeCloseTo(1.0589, 4);
        expect(mathOperation({ num: 1000n, denom: 1n }, 1000, 'DIVIDE').toString()).toEqual("1");
        expect(mathOperation({ num: 1000n, denom: 1n }, { num: 10n, denom: 1n }, 'DIVIDE').toString()).toEqual("100");
        expect(() => mathOperation(null, 2, 'DIVIDE')).toThrow("Unable to perform math operation on null value");
    });

    test('Should return correct MOD operation', () => { 
        expect(mathOperation(6, 3, 'MOD')).toEqual(0);
        expect(mathOperation(132, 11, 'MOD')).toEqual(0);
        expect(mathOperation(20, -10, 'MOD')).toEqual(0);
        expect(mathOperation(20, 3, 'MOD')).toEqual(2);
        expect(mathOperation(1.8947, 1.78932, 'MOD')).toBeCloseTo(0.10538000000000003, 2);
        expect(mathOperation({ num: 1000n, denom: 1n }, 1000, 'MOD').toString()).toEqual("0");
        expect(mathOperation({ num: 1000n, denom: 1n }, { num: 10n, denom: 1n }, 'MOD').toString()).toEqual("0");
        expect(() => mathOperation(null, 2, 'MOD')).toThrow("Unable to perform math operation on null value");
    });
});

// need ADD, SUBTRACT, DIVIDE, MODULO
describe('transformByScalar function', () => {
    const successCases = [
        {
            m1: new Map([
                ['0,0', 100],
                ['0,1', 2],
                ['1,0', 1],
                ['1,1', 0.342]
            ]),
            m2: new Map([
                ['0,0', 200],
                ['0,1', 4],
                ['1,0', 2],
                ['1,1', 0.684]
            ]),
            scalar: 2,
            operation: 'MULTIPLY'
        }
    ];
    test('Should return correct matrix with scalar transformation', () => {
        for (const successCase of successCases) {
            const { m1, m2, scalar, operation } = successCase;
            expect(transformByScalar(m1, scalar, operation)).toEqual(m2);
        }
    })
});

describe('findByValue function', () => {
    const successCases = [
        {
            m: new Map([
                ['0,0', 100],
                ['0,1', 2],
                ['1,0', 1],
                ['1,1', 0.342]
            ]),
            value: 2,
            expected: '0,1'
        },
        {
            m: new Map([
                ['0,0', 100],
                ['0,1', 2],
                ['1,0', 1],
                ['1,1', 0.342]
            ]),
            value: 32,
            expected: null
        }
    ];
    test('Should return correct key based on given value', () => {
        for (const successCase of successCases) {
            const { m, value, expected } = successCase;
            expect(findByValue(m, value)).toEqual(expected);
        }
    });
});

describe('getByOperator function', () => {
    const successCases = [
        {
            m: new Map([
                ['0,0', 100],
                ['0,1', 2],
                ['1,0', 1],
                ['1,1', 0.342]
            ]),
            type: 'MAX',
            expected: ['0,0', 100],
        },
        {
            m: new Map([
                ['0,0', null]
            ]),
            type: 'MAX',
            expected: null,
        },
        {
            m: new Map(),
            type: 'MAX',
            expected: null,
        },
        {
            m: new Map([
                ['0,0', 100],
                ['0,1', 2],
                ['1,0', 1],
                ['1,1', 0.342]
            ]),
            type: 'MIN',
            expected: ['1,1', 0.342],
        },
        {
            m: new Map([
                ['0,0', null]
            ]),
            type: 'MIN',
            expected: null,
        },
        {
            m: new Map(),
            type: 'MIN',
            expected: null,
        },
    ];
    test('Should return correct key based on given value', () => {
        for (const successCase of successCases) {
            const { m, type, expected } = successCase;
            expect(getByOperator(m, type)).toEqual(expected);
        }
    })
});

describe('getMean function', () => {
    const successCases = [
        {
            m: new Map([
                ['0,0', 2],
                ['0,1', 2],
                ['1,0', 2],
                ['1,1', 2]
            ]),
            axis: 'row',
            index: 0,
            expected: 2
        },
        {
            m: new Map([
                ['0,0', 2],
                ['0,1', 2],
                ['1,0', 2],
                ['1,1', 8]
            ]),
            axis: 'col',
            index: 1,
            expected: 5
        },
        {
            m: new Map([
                ['0,0', 2],
                ['0,1', 2],
                ['1,0', null],
                ['1,1', 8]
            ]),
            axis: 'col',
            index: 0,
            expected: 1
        },
    ];
    test('Should return correct key based on given value', () => {
        for (const successCase of successCases) {
            const { m, axis, index, expected } = successCase;
            expect(getMean(m, axis, index)).toEqual(expected);
        }
    })
});

describe('isEqualMatrix function', () => {
    const successCases = [
        {
            m1: new Map([
                ['0,0', 100],
                ['0,1', null],
                ['1,0', 74638],
                ['1,1', 0.342]
            ]),
            m2: new Map([
                ['0,0', 100],
                ['0,1', null],
                ['1,0', 74638],
                ['1,1', 0.342]
            ]),
        }
    ];
    test('Should return correct matrix equality', () => {
        for (const successCase of successCases) {
            const { m1, m2 } = successCase;
            expect(isEqualMatrix(m1, m2)).toBe(true);
        }
    })
});

describe('matrixDeterminant function', () => {
    const determinantSuccesses = [
        () => {
            const initial = Matrix(1, 1);
            [
                [0, 0, 1001],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 1,
                cols: 1,
                expected: 1001
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 2,
                cols: 2,
                expected: -2
            }
        },
        () => {
            const initial = Matrix(4, 4);
            [
                [0, 0, 1],
                [0, 1, 4],
                [0, 2, 5],
                [0, 3, 6],
                [1, 0, 3],
                [1, 1, 34],
                [1, 2, 5],
                [1, 3, 67],
                [2, 0, 2],
                [2, 1, 32],
                [2, 2, 4],
                [2, 3, 453],
                [3, 0, 34],
                [3, 1, 53],
                [3, 2, 4],
                [3, 3, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 4,
                cols: 4,
                expected: 1735236
            }
        },
    ];
    test('Should return determinant for valid matrix', () => {
        for (const cases of determinantSuccesses) {
            const { initial, rows, cols, expected } = cases();
            expect(matrixDeterminant(initial.matrix, rows, cols)).toEqual(expected);
        }
    });
    const determinantErrors = [
        () => {
            const initial = Matrix(2, 1);
            [
                [0, 0, 1001],
                [1, 0, 1002],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 2,
                cols: 1,
                expected: 'Cannot find determinant of non-square matrix'
            }
        },
        () => {
            const initial = Matrix(1, 3);
            [
                [0, 0, 1001],
                [0, 1, 1002],
                [0, 2, 1003],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 1,
                cols: 3,
                expected: 'Cannot find determinant of non-square matrix'
            }
        },
    ];
    test('Should throw errors', () => {
        for (const cases of determinantErrors) {
            const { initial, rows, cols, expected } = cases();
            expect(() => matrixDeterminant(initial.matrix, rows, cols)).toThrow(expected);
        }
    });
});

describe('matrixCofactor function', () => {
    const cofactorSuccesses = [
        () => {
            const initial = Matrix(3, 3);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [1, 0, 4],
                [1, 1, 5],
                [1, 2, 6],
                [2, 0, 7],
                [2, 1, 8],
                [2, 2, 9],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(3, 3);
            [
                [0, 0, -3],
                [0, 1, 6],
                [0, 2, -3],
                [1, 0, 6],
                [1, 1, -12],
                [1, 2, 6],
                [2, 0, -3],
                [2, 1, 6],
                [2, 2, -3],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 3,
                cols: 3,
                expected,
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 4],
                [0, 1, -3],
                [1, 0, -2],
                [1, 1, 1],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 2,
                cols: 2,
                expected,
            }
        },
    ];
    test('Should return correct cofactors', () => {
        for (const cases of cofactorSuccesses) {
            const { initial, rows, cols, expected } = cases();
            expect(matrixCofactor(initial.matrix, rows, cols)).toEqual(expected.matrix);
        }
    });
    const cofactorErrors = [
        () => {
            const initial = Matrix(2, 3);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [1, 0, 4],
                [1, 1, 5],
                [1, 2, 6],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 2,
                cols: 3,
                expected: "Cannot find cofactor of non-square matrix",
            }
        },
        () => {
            const initial = Matrix(2, 3);
            [].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                rows: 2,
                cols: 3,
                expected: "Cannot find cofactor of non-square matrix",
            }
        },
        
    ];
    test('Should throw error', () => {
        for (const cases of cofactorErrors) {
            const { initial, rows, cols, expected } = cases();
            expect(() => matrixCofactor(initial.matrix, rows, cols)).toThrow(expected.matrix);
        }
    });
});

describe('matrixTranspose function', () => {
    const transposeSuccesses = [
        () => {
            const initial = Matrix(1, 1);
            [
                [0, 0, 1],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(1, 1);
            [
                [0, 0, 1],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 3],
                [1, 0, 2],
                [1, 1, 4],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 4],
                [0, 1, 3],
                [1, 0, 2],
                [1, 1, 1],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 4],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 1],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(4, 4);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [0, 3, 4],
                [1, 0, 5],
                [1, 1, 6],
                [1, 2, 7],
                [1, 3, 8],
                [2, 0, 9],
                [2, 1, 10],
                [2, 2, 11],
                [2, 3, 12],
                [3, 0, 13],
                [3, 1, 14],
                [3, 2, 15],
                [3, 3, 16],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(4, 4);
            [
                [0, 0, 1],
                [0, 1, 5],
                [0, 2, 9],
                [0, 3, 13],
                [1, 0, 2],
                [1, 1, 6],
                [1, 2, 10],
                [1, 3, 14],
                [2, 0, 3],
                [2, 1, 7],
                [2, 2, 11],
                [2, 3, 15],
                [3, 0, 4],
                [3, 1, 8],
                [3, 2, 12],
                [3, 3, 16],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(2, 3);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [1, 0, 4],
                [1, 1, 5],
                [1, 2, 6]
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(3, 2);
            [
                [0, 0, 1],
                [0, 1, 4],
                [1, 0, 2],
                [1, 1, 5],
                [2, 0, 3],
                [2, 1, 6],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(1, 4);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [0, 3, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(4, 1);
            [
                [0, 0, 1],
                [1, 0, 2],
                [2, 0, 3],
                [3, 0, 4],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(4, 1);
            [
                [0, 0, 1],
                [1, 0, 2],
                [2, 0, 3],
                [3, 0, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(1, 4);
            [
                [0, 0, 1],
                [0, 1, 2],
                [0, 2, 3],
                [0, 3, 4],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
    ];
    test('Should return correctly transposed matrix', () => {
        for (const cases of transposeSuccesses) {
            const { initial, expected } = cases();
            expect(matrixTranspose(initial.matrix)).toEqual(expected.matrix);
        }
    });
    const transposedIncorrectly = [
        () => {
            const initial = Matrix(1, 1);
            [
                [0, 0, 1],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(1, 2);
            [
                [0, 0, 1],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 4],
                [0, 1, 3],
                [1, 0, 2],
                [1, 1, 1],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial,
                expected
            }
        },
    ];
    test('Should not return transposed matrix', () => {
        for (const cases of transposedIncorrectly) {
            const { initial, expected } = cases();
            expect(matrixTranspose(initial.matrix)).not.toEqual(expected.matrix);
        }
    });
});

describe('matrixInverse function', () => {
    const matrixInverseSuccesses = [
        () => {
            const initial = Matrix(4, 4);
            [
                [0, 0, 1],
                [0, 1, 4],
                [0, 2, 5],
                [0, 3, 6],
                [1, 0, 3],
                [1, 1, 34],
                [1, 2, 5],
                [1, 3, 67],
                [2, 0, 2],
                [2, 1, 32],
                [2, 2, 4],
                [2, 3, 453],
                [3, 0, 34],
                [3, 1, 53],
                [3, 2, 4],
                [3, 3, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(4, 4);
            [
                [0, 0, 0.030391831428116984],
                [0, 1, -0.0644644301985436],
                [0, 2, 0.008908874642988044],
                [0, 3, 0.03368187382004523],
                [1, 0, -0.03630860586110477],
                [1, 1, 0.04288292774008838],
                [1, 2, -0.005845890703051343],
                [1, 3, -0.002372011645678167],
                [2, 0, 0.2224083640496163],
                [2, 1, -0.018313935395531212],
                [2, 2, -0.00020458312298730547],
                [2, 3, -0.004913452694619061],
                [3, 0, 0.0004667952947034294],
                [3, 1, -0.0025829339640256427],
                [3, 2, 0.0025829339640256427],
                [3, 3, 0.00006223937262712393]
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 4;
            const cols = 4;
            const determinant = matrixDeterminant(initial.matrix, rows, cols);
            const coFactor = matrixCofactor(initial.matrix, rows, cols);
            const adjugate = matrixTranspose(coFactor);
            return {
                adjugate,
                determinant,
                expected: expected.matrix
            }
        },
    ]
    test('Should return correct inverse matrix', () => {
        for (const cases of matrixInverseSuccesses) {
            const { adjugate, determinant, expected } = cases();
            expect(matrixInverse(adjugate, determinant)).toEqual(expected);
        }
    });
});

describe('matrixPseudoinverse function', () => {
    const matrixPseudoinverseSuccesses = [
        () => {
            const initial = Matrix(2, 3);
            [
                [0, 0, 3],
                [0, 1, 2],
                [0, 2, 2],
                [1, 0, 2],
                [1, 1, 3],
                [1, 2, -2],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(3, 2);
            [
                [0, 0, 0.15555555555555572],
                [0, 1, 0.04444444444444448],
                [1, 0, 0.044444444444444536],
                [1, 1, 0.1555555555555556],
                [2, 0, 0.22222222222222227],
                [2, 1, -0.22222222222222227]
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 3;
            return {
                initial: initial.matrix,
                config: { rows, cols},
                expected: expected.matrix
            }
        },
    ]
    test('Should return correct pseudoInverse matrix', () => {
        for (const cases of matrixPseudoinverseSuccesses) {
            const { initial, config, expected } = cases();
            expect(matrixPseudoinverse(initial, config)).toEqual(expected);
        }
    });
});

describe('matrixMultiply function', () => {
    const matrixMultiplySuccesses = [
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 3],
                [0, 1, 2],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 43],
                [0, 1, 43],
                [1, 0, 55],
                [1, 1, 64],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 239],
                [0, 1, 257],
                [1, 0, 251],
                [1, 1, 278],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                config: { rows, cols},
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 0.32],
                [0, 1, 2],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 43],
                [0, 1, 43],
                [1, 0, 55],
                [1, 1, 64],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 123.76],
                [0, 1, 141.76],
                [1, 0, 251],
                [1, 1, 278],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                config: { rows, cols},
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 0.43232],
                [0, 1, 258349000334n],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 43],
                [0, 1, 43],
                [1, 0, 42.0423],
                [1, 1, 6457593n],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 10850658014046n],
                [0, 1, 1668312696113836080n],
                [1, 0, 212.12689999999998],
                [1, 1, 19372865n],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                config: { rows, cols },
                expected: expected.matrix
            }
        },
    ]
    test('Should return correct matrix multiplication', () => {
        for (const cases of matrixMultiplySuccesses) {
            const { initial, initial2, config, expected } = cases();
            const { rows, cols } = config;
            expect(matrixMultiply(initial, initial2, rows, cols)).toEqual(expected);
        }
    });
});

describe('matrixDivide function', () => {
    const matrixDivideSuccesses = [
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 3],
                [0, 1, 2],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 43],
                [0, 1, 43],
                [1, 0, 55],
                [1, 1, 64],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 0.21188630490956073],
                [0, 1, -0.1111111111111111],
                [1, 0, -0.09560723514211883],
                [1, 1, 0.1111111111111111],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                m1Config: { rows, cols },
                m2Config: { rows, cols },
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 0.32],
                [0, 1, 2],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 43],
                [0, 1, 43],
                [1, 0, 55],
                [1, 1, 64],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, -0.23131782945736432],
                [0, 1, 0.18666666666666665],
                [1, 0, -0.09560723514211883],
                [1, 1, 0.1111111111111111],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                m1Config: { rows, cols },
                m2Config: { rows, cols },
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(2, 2);
            [
                [0, 0, 0.43232],
                [0, 1, 258349000334n],
                [1, 0, 2],
                [1, 1, 3],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 1],
                [0, 1, 32],
                [1, 0, 42],
                [1, 1, 53],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, -1n],
                [0, 1, -258349000334n],
                [1, 0, 0.015491866769945767],
                [1, 1, 0.047250193648334625],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            const rows = 2;
            const cols = 2;
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                m1Config: { rows, cols },
                m2Config: { rows, cols },
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(3, 2);
            [
                [0, 0, 134],
                [0, 1, 32],
                [1, 0, 4],
                [1, 1, 5],
                [2, 0, 43],
                [2, 1, 78]
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 2);
            [
                [0, 0, 423],
                [0, 1, 4324],
                [1, 0, 4],
                [1, 1, 3],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(3, 2);
            [
                [0, 0, -0.0170961502464591],
                [0, 1, 35.30791788856305],
                [1, 0, 0.0004991576714294628],
                [1, 1, 0.9472140762463342],
                [2, 0, 0.01141823173394896],
                [2, 1, 9.542521994134896],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                m1Config: { rows: 3, cols: 2 },
                m2Config: { rows: 2, cols: 2 },
                expected: expected.matrix
            }
        },
        () => {
            const initial = Matrix(2, 3);
            [
                [0, 0, 134],
                [0, 1, 32],
                [0, 2, 43],
                [1, 0, 4],
                [1, 1, 5],
                [1, 2, 89],
            ].forEach(arr => initial.set(arr[0], arr[1], arr[2]));
            const initial2 = Matrix(2, 3);
            [
                [0, 0, 423],
                [0, 1, 4324],
                [0, 2, 63],
                [1, 0, 4],
                [1, 1, 3],
                [1, 2, 897],
            ].forEach(arr => initial2.set(arr[0], arr[1], arr[2]));
            const expected = Matrix(2, 2);
            [
                [0, 0, 0.010331591304834072],
                [0, 1, -0.00012844474770182766],
                [1, 0, 0.0012350206042938],
                [1, 1, -0.00007071860188694046],
            ].forEach(arr => expected.set(arr[0], arr[1], arr[2]));
            return {
                initial: initial.matrix,
                initial2: initial2.matrix,
                m1Config: { rows: 2, cols: 3 },
                m2Config: { rows: 2, cols: 3 },
                expected: expected.matrix
            }
        },
    ]
    test('Should return correct matrix division', () => {
        for (const cases of matrixDivideSuccesses) {
            const { initial, initial2, m1Config, m2Config, expected } = cases();
            expect(matrixDivide(initial, initial2, m1Config, m2Config)).toEqual(expected);
        }
    });
});