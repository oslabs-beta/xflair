const fs = require('fs');

const numRows = 224;
const numCols = 224;

// Create an array to hold the CSV rows
const csvRows = [];

// Add the CSV header
csvRows.push('row,column,value');

// Generate random values and populate the CSV rows
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const value = Math.floor(Math.random() * 100) + 1; // Random value between 1 and 100
        csvRows.push(`r${row},c${col},${value}`);
    }
}

// Join rows with newline characters
const csvContent = csvRows.join('\n');

// Write CSV content to a file
fs.writeFileSync('heatmap_data.csv', csvContent);

console.log('Heatmap data saved to heatmap_data.csv');