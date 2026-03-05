const xlsx = require('xlsx');
const fs = require('fs');

try {
    const workbook = xlsx.readFile('스핀들직 작업 순서.xlsx');
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const rawData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    let output = 'Sheet Name: ' + firstSheetName + '\n\n';
    rawData.slice(0, 30).forEach((row, i) => {
        output += `Row ${i + 1}: ${JSON.stringify(row.slice(0, 15))}\n`;
    });

    fs.writeFileSync('excel_preview.txt', output);
    console.log('Preview written to excel_preview.txt');
} catch (error) {
    console.error('Error:', error);
}
