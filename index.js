import { Matrix } from './matrix.js';


const rows = 2;
const cols = 4;
const m = Matrix(rows, cols);
const values = [4, 5, 6, 7, 9, 3, 2, 10];
let index = 0;
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        m.set(row, col, values[index]);
        index++;
    }
}

console.log(m)
