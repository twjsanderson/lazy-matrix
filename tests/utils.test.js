import {
    SAFE_MATRIX_SIZE,
    MAX_SAFE_BIGINT, 
    MIN_SAFE_BIGINT,
} from '../constants';
import {
    isObj,
    isArray, 
    isNumber,
    isFloat, 
    isBigInt,
    isSafeBigInt, 
    isSafeNumber, 
    isSafeFloat, 
    isSafeMatrixLength,
    isMap,
} from '../utils';

describe('isObj function', () => {
    test('Should return false when input is not an Object', () => {
        expect(isObj(1)).toBe(false);
        expect(isObj(null)).toBe(false);
        expect(isObj("1")).toBe(false);
        expect(isObj(0)).toBe(false);
        expect(isObj([])).toBe(false);
        expect(isObj([1,2,3])).toBe(false);
        expect(isObj([{test: '234'}])).toBe(false);
        expect(isObj(false)).toBe(false);
        expect(isObj(undefined)).toBe(false);
        expect(isObj(Symbol("symbol"))).toBe(false);
        expect(isObj(new Date())).toBe(false);
        expect(isObj(/regex/)).toBe(false);
        expect(isObj(new Map())).toBe(false);
        expect(isObj(new Set())).toBe(false);
        expect(isObj(Object.create(null))).toBe(false);
        expect(isObj(0.43782642)).toBe(false);
    })
    test('Should return true when input is an Object', () => {
        expect(isObj({ num: 43782642n, denom: 1n })).toBe(true);
        expect(isObj({test: 123})).toBe(true);
        expect(isObj({test: [1,2,3]})).toBe(true);
        expect(isObj({test: 'test'})).toBe(true);
        expect(isObj({test: 123, test2: [true, false]})).toBe(true);
        
    })
});

describe('isArray function', () => {
    test('Should return false when input is not an Array', () => {
        expect(isArray(1)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray("1")).toBe(false);
        expect(isArray(0)).toBe(false);
        expect(isArray({})).toBe(false);
        expect(isArray({test: '234'})).toBe(false);
        expect(isArray({test: ['234']})).toBe(false);
        expect(isArray(false)).toBe(false);
        expect(isArray(undefined)).toBe(false);
        expect(isArray(Symbol("symbol"))).toBe(false);
    })
    test('Should return true when input is Array', () => {
        expect(isArray([])).toBe(true);
        expect(isArray([[],{},[]])).toBe(true);
        expect(isArray([{test: 123}])).toBe(true);
        expect(isArray([1,2,3])).toBe(true);
        expect(isArray([true, false, "232", 123])).toBe(true);
        expect(isArray(new Array(3))).toBe(true);
    })
});

describe('isNumber function', () => {
    test('Should return false when input is not a number', () => {
        expect(isNumber(null)).toBe(false);
        expect(isNumber("1")).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber({test: '234'})).toBe(false);
        expect(isNumber({test: ['234']})).toBe(false);
        expect(isNumber(false)).toBe(false);
        expect(isNumber(74587453n)).toBe(false);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber(Infinity)).toBe(false);
    })
    test('Should return true when input is a number', () => {
        expect(isNumber(189047947123)).toBe(true);
        expect(isNumber(1)).toBe(true);
        expect(isNumber(0.74587453)).toBe(true); 
        expect(isNumber(0.0)).toBe(true);
        expect(isNumber(130.0)).toBe(true);
        expect(isNumber(-0.74587453)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(-54567456)).toBe(true);
        expect(isNumber(Number.MAX_VALUE)).toBe(true);
    })
});

describe('isFloat function', () => {
    test('Should return false when input is not a float', () => {
        expect(isFloat(null)).toBe(false);
        expect(isFloat("1")).toBe(false);
        expect(isFloat({})).toBe(false);
        expect(isFloat({test: '234'})).toBe(false);
        expect(isFloat({test: ['234']})).toBe(false);
        expect(isFloat(false)).toBe(false);
        expect(isFloat(74587453n)).toBe(false);
        expect(isFloat(189047947123)).toBe(false);
        expect(isFloat(1)).toBe(false);
        expect(isFloat(0)).toBe(false);
        expect(isFloat(-54567456)).toBe(false);
        expect(isFloat(Number.MAX_SAFE_INTEGER)).toBe(false); 
        expect(isFloat(0.0)).toBe(false); // 0.0 is treated as integer in JavaScript
        expect(isFloat(42342.0)).toBe(false);  // exclusive trailing zeros are treated as integer in JavaScript
    })
    test('Should return true when input is a float', () => {
        expect(isFloat(1.89047947123)).toBe(true);
        expect(isFloat(0.89047947123)).toBe(true);
        expect(isFloat(-0.89047923)).toBe(true);
        expect(isFloat(2311.89047947123)).toBe(true);
        expect(isFloat(-2311.89047947123)).toBe(true);
        expect(isFloat(4111.01)).toBe(true);
        expect(isFloat(-5312311.01)).toBe(true);
    })
});

describe('isBigInt function', () => {
    test('Should return false when input is not a BigInt', () => {
        expect(isBigInt(null)).toBe(false);
        expect(isBigInt(undefined)).toBe(false);
        expect(isBigInt("1")).toBe(false);
        expect(isBigInt("123456789012345678901234567890")).toBe(false); 
        expect(isBigInt({})).toBe(false);
        expect(isBigInt({ test: '234' })).toBe(false);
        expect(isBigInt({ test: ['234'] })).toBe(false);
        expect(isBigInt(false)).toBe(false);
        expect(isBigInt(true)).toBe(false);
        expect(isBigInt([])).toBe(false);
        expect(isBigInt([1, 2, 3])).toBe(false);
        expect(isBigInt(NaN)).toBe(false);
        expect(isBigInt(Infinity)).toBe(false);
        expect(isBigInt(-Infinity)).toBe(false);
        expect(isBigInt(189047947123)).toBe(false);  
        expect(isBigInt(1)).toBe(false);
        expect(isBigInt(0)).toBe(false);
        expect(isBigInt(-54567456)).toBe(false);
        expect(isBigInt(0.0)).toBe(false);
        expect(isBigInt(42342.0)).toBe(false);
        expect(isBigInt(3.14)).toBe(false);
        expect(isBigInt(Number.MAX_SAFE_INTEGER)).toBe(false);
        expect(isBigInt(Number.MIN_SAFE_INTEGER)).toBe(false);
    });

    test('Should return true when input is a BigInt', () => {
        expect(isBigInt(432523n)).toBe(true);
        expect(isBigInt(BigInt(0))).toBe(true);
        expect(isBigInt(BigInt(1))).toBe(true);
        expect(isBigInt(BigInt(-1))).toBe(true);
        expect(isBigInt(BigInt(9007199254740991))).toBe(true); 
        expect(isBigInt(BigInt(-9007199254740991))).toBe(true); 
        expect(isBigInt(BigInt("123456789012345678901234567890"))).toBe(true); 
    });
});

describe('isSafeNumber function', () => {
    test('Should return false when input is not a safe number', () => {
        expect(isSafeNumber(Number.MAX_SAFE_INTEGER + 1)).toBe(false);  // Beyond safe integer
        expect(isSafeNumber(Number.MIN_SAFE_INTEGER - 1)).toBe(false);  // Below safe integer
        expect(isSafeNumber(NaN)).toBe(false);  // NaN is not a safe number
        expect(isSafeNumber(Infinity)).toBe(false);  // Infinity is not a safe number
        expect(isSafeNumber(-Infinity)).toBe(false);  // Negative Infinity is not a safe number
    });

    test('Should return true when input is a safe number', () => {
        expect(isSafeNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isSafeNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(isSafeNumber(0)).toBe(true);  // Zero is safe
        expect(isSafeNumber(1)).toBe(true);  // Positive integer
        expect(isSafeNumber(-1)).toBe(true);  // Negative integer
    });
});

describe('isSafeFloat function', () => {
    test('Should return false when input is not a safe float', () => {
        expect(isSafeFloat(Number.MAX_VALUE)).toBe(false);  // Too large for safe float
        expect(isSafeFloat(Number.MIN_VALUE)).toBe(false);  // Too small for safe float
        expect(isSafeFloat(Infinity)).toBe(false);  // Infinity is not a safe float
        expect(isSafeFloat(-Infinity)).toBe(false);  // Negative Infinity is not a safe float
        expect(isSafeFloat(NaN)).toBe(false);  // NaN is not a safe float
        expect(isSafeFloat(0.0)).toBe(false);  // JS treats this as a number
        expect(isSafeFloat(1.0)).toBe(false);  // JS treats this as a number
        expect(isSafeFloat(-1.0)).toBe(false);  // JS treats this as a number
        expect(isSafeFloat(13232.0000)).toBe(false);  // JS treats this as a number
    });

    test('Should return true when input is a safe float', () => {
        expect(isSafeFloat(12210.032)).toBe(true);
        expect(isSafeFloat(1.02332)).toBe(true);
        expect(isSafeFloat(-1.01)).toBe(true);
        expect(isSafeFloat(3.14)).toBe(true);  // A typical float value
    });
});

describe('isSafeBigInt function', () => {
    test('Should return false when input is not a safe BigInt', () => {
        expect(isSafeBigInt(BigInt(MAX_SAFE_BIGINT) + 1n)).toBe(false);  // Beyond safe BigInt
        expect(isSafeBigInt(BigInt(MIN_SAFE_BIGINT) - 1n)).toBe(false);  // Below safe BigInt
        expect(isSafeBigInt(BigInt("99999999999999999999999999999999999999999999"))).toBe(false);  // Very large BigInt
    });

    test('Should return true when input is a safe BigInt', () => {
        expect(isSafeBigInt(BigInt(MAX_SAFE_BIGINT))).toBe(true);  // Safe BigInt
        expect(isSafeBigInt(BigInt(MIN_SAFE_BIGINT))).toBe(true);  // Safe BigInt
        expect(isSafeBigInt(BigInt(0))).toBe(true);  // Zero is a safe BigInt
        expect(isSafeBigInt(BigInt(1))).toBe(true);  // Positive BigInt
        expect(isSafeBigInt(BigInt(-1))).toBe(true);  // Negative BigInt
    });
});

describe('isSafeMatrixLength function', () => {
    test('Should return false when input is not a safe matrix length', () => {
        expect(isSafeMatrixLength(-1)).toBe(false);  // Negative length
        expect(isSafeMatrixLength(0)).toBe(false);  // Zero length
        expect(isSafeMatrixLength(SAFE_MATRIX_SIZE + 1)).toBe(false);  // Exceeds safe matrix size
        expect(isSafeMatrixLength(NaN)).toBe(false);  // NaN is not valid
    });

    test('Should return true when input is a safe matrix length', () => {
        expect(isSafeMatrixLength(1)).toBe(true);
        expect(isSafeMatrixLength(SAFE_MATRIX_SIZE)).toBe(true);
    });
});

describe('isMap function', () => {
    test('Should return false when input is not a Map', () => {
        expect(isMap(1)).toBe(false);
        expect(isMap(null)).toBe(false);
        expect(isMap("1")).toBe(false);
        expect(isMap(0)).toBe(false);
        expect(isMap([])).toBe(false);
        expect(isMap([1,2,3])).toBe(false);
        expect(isMap([{test: '234'}])).toBe(false);
        expect(isMap(false)).toBe(false);
        expect(isMap(undefined)).toBe(false);
        expect(isMap(Symbol("symbol"))).toBe(false);
        expect(isMap(new Date())).toBe(false);
        expect(isMap(/regex/)).toBe(false);
        expect(isMap(new Set())).toBe(false);
        expect(isMap(Object.create(null))).toBe(false);
        expect(isMap({})).toBe(false);
        expect(isMap({ test: 123 })).toBe(false);
    });

    test('Should return true when input is a Map', () => {
        expect(isMap(new Map())).toBe(true);
        const myMap = new Map();
        myMap.set('key', 'value');
        expect(isMap(myMap)).toBe(true);
    });
});
