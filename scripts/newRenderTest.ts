const file = require('fs');
const path = require('path');

const x = 50;
const y = 50;
const rate = 4;
let dataset = 1;

interface GridValues {
  [index: string]: number;
}

const final: GridValues = {};

for (let row = 1; row <= x; row++) {
  for (let col = 1; col <= y; col++) {
    const distance = Math.max(row, col) - 1;
    const value = 100 - distance * 2;
    final[`r${row},c${col}`] = value;
  }
}

// file.writeFileSync(
//   path.join(__dirname, `../public/renderTest/dataFINAL.csv`),
//   final.join('\n')
// );

let contents: Array<string> = [];

for (let row = 1; row <= x; row++) {
  for (let col = 1; col <= y; col++) {
    const value = Math.floor(Math.random() * 100) + 1;
    contents.push(`r${row},c${col},${value}`);
  }
}

file.writeFileSync(
  path.join(__dirname, `../public/renderTest/data${dataset}.csv`),
  'row,column,value\n' + contents.join('\n')
);
dataset++;

for (let i = 2; i <= 30; i++) {
  let temp: Array<string> = [];

  contents.forEach((el) => {
    const data: Array<string> = el.split(',');
    let value: number = Number(data.pop() as string);
    const key: string = data.join(',');

    if (Math.abs(final[key] - value) < 5) value = final[key];
    else if (final[key] > value) value += rate;
    else if (final[key] < value) value -= rate;

    temp.push(`${key},${value}`);
  });

  contents = temp;

  file.writeFileSync(
    path.join(__dirname, `../public/renderTest/data${dataset}.csv`),
    'row,column,value\n' + contents.join('\n')
  );
  dataset++;
}

console.log('done');
