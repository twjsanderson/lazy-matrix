import {
    MAX_SAFE_BIGINT, 
    MIN_SAFE_BIGINT,
    SAFE_MATRIX_SIZE,    
} from './constants';

// Conversions
export const strToNum = (x) => Number.parseFloat(x);
export const numToStr = (x) => x + '';

// Identity checks
export const isObj = (x) => 
    typeof x === 'object' && 
    x !== null && 
    !Array.isArray(x) && 
    Object.getPrototypeOf(x) === Object.prototype;
export const isArray = (x) => Array.isArray(x);
export const isNumber = (x) => typeof x === 'number' && Number.isFinite(x);
export const isFloat = (x) => isNumber(x) && x % 1 !== 0;
export const isBigInt = (x) => typeof x === 'bigint'
export const isMap = (x) => x instanceof Map;

// Safety checks
export const isSafeNumber = (x) => 
    isNumber(x) && 
    Number.isSafeInteger(x);

export const isSafeFloat = (x) =>
    isFloat(x) &&
    Math.abs(x) > Number.EPSILON &&
    Math.abs(x) < Number.MAX_VALUE;

export const isSafeBigInt = (x) => 
    isBigInt(x) && 
    x <= BigInt(MAX_SAFE_BIGINT) && 
    x >= BigInt(MIN_SAFE_BIGINT);

export const isSafeMatrixLength = (x) => 
    isSafeNumber(x) && 
    x > 0 && 
    x <= SAFE_MATRIX_SIZE;
