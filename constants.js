export const SAFE_MATRIX_SIZE = 5000;
// 16,777,216
export const MAX_SAFE_BIGINT = BigInt("2") ** BigInt(64) - BigInt(1); // ~ 2^64 - 1 (~18 quintillion)
export const MIN_SAFE_BIGINT = -MAX_SAFE_BIGINT; // ~ -2^64