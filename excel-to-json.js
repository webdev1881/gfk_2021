XLSX = require('xlsx');
xlsxj = require("xlsx-to-json");

// const gfk = XLSX.utils.sheet_to_json(XLSX.readFile('./gfk.xlsx').Sheets[XLSX.readFile('./gfk.xlsx').SheetNames[0]], { header: 0 });

xlsxj({
    input: "./gfk-yug.xlsx",
    output: "./public/gfk.json",
    sheet: "gfk"
}, function (err, result) {
    if (err) {
        console.error(err);
        debugger
    } else {
        console.log(result);
    }
});

xlsxj({
    input: "./gfk-yug.xlsx",
    output: "./public/yug.json",
    sheet: "yug"
}, function (err, result) {
    if (err) {
        console.error(err);
        debugger
    } else {
        console.log(result);
    }
});


console.log( 'DONE' );