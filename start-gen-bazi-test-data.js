"use strict";

let _ = require('lodash');
let moment = require("moment");
let jsonfile = require('jsonfile');
let fs = require('fs');
let BaZiCalculator = require('./bazi/bazi-calculator');
let Codec = require('./utils/chart-codec');

let file = '.\\bazi-test-data.json';

let start = moment([1900, 1, 1, 1, 30]);
// let start = moment([2050, 10, 30, 1, 30]).add(1, 'month');
let end = moment([2050, 11, 31, 23, 30]).add(1, 'month');

let charts = [];
let iteration = 0;
while (end.diff(start) > 0) {
    let dateArray = start.toArray().splice(0, 5);
    let person = {
        date: {
            day: dateArray[2], month: dateArray[1] + 1, year: dateArray[0],
            hour: dateArray[3], minute: dateArray[4]
        }
    };
    if (iteration++ % 1000 == 0) {
        console.log(iteration - 1, 'items');
    }
    let result = BaZiCalculator(person).compute();
    let chartObj = result.chart;
    let chartArray = [];
    _.forEach(chartObj, function(value, key) {
        // console.log(key, value);
        chartArray.push(value.hs, value.eb);
    });
    // console.log(chartArray);
    let output = {
        input: dateArray,
        output: Codec.encode(chartArray)
    };
    // console.log(output);
    charts.push(output);
    // console.log('total items', _.size(charts), '\n');
    start = start.add(28, 'hours');
}

// console.log('charts', charts);
console.log('total items', _.size(charts));
jsonfile.writeFileSync(file, charts);
