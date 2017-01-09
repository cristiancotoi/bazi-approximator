'use strict';

let stems = ['甲 L+', '乙 L-', '丙 F+', '丁 F-', '戊 P+',
    '己 P-', '庚 M+', '辛 M-', '壬 A+', '癸 A-'];


let branches = ['子 zǐ', '丑 chǒu', '寅 yín', '卯 mǎo', '辰 chén',
    '巳 sì', '午 wǔ', '未 wèi', '申 shēn', '酉 yǒu', '戌 xū', '亥 hài'];

function round(double, decimals) {
    let powerOf10 = Math.pow(10, decimals);
    return Math.round(double * powerOf10) / powerOf10;
}
/**
 * @param chartArr array of size 8 that contains 4 stems and 4 branches
 */
function encode(chartArr) {
    let encodedChart = [
        stems.indexOf(chartArr[0]) / 10,
        branches.indexOf(chartArr[1]) / 12,

        stems.indexOf(chartArr[2]) / 10,
        branches.indexOf(chartArr[3]) / 12,

        stems.indexOf(chartArr[4]) / 10,
        branches.indexOf(chartArr[5]) / 12,

        stems.indexOf(chartArr[6]) / 10,
        branches.indexOf(chartArr[7]) / 12
    ];

    // console.log(chartArr, ' -> ', encodedChart);
    return encodedChart;
}

function decode(encodedArr) {
    let decodedChart = [
        stems[Math.round(encodedArr[0] * 10)],
        branches[Math.round(encodedArr[1] * 12)],

        stems[Math.round(encodedArr[2] * 10)],
        branches[Math.round(encodedArr[3] * 12)],

        stems[Math.round(encodedArr[4] * 10)],
        branches[Math.round(encodedArr[5] * 12)],

        stems[Math.round(encodedArr[6] * 10)],
        branches[Math.round(encodedArr[7] * 12)]
    ];

    // console.log(encodedArr, ' -> ', decodedChart);
    return decodedChart;
}

module.exports = {
    encode: encode,
    decode: decode
};