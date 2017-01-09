'use strict';

let Codec = require('./chart-codec');
let jsonfile = require('jsonfile');
let fs = require('fs');
let _ = require('lodash');

let file = '.\\bazi-test-data.json';

function makeBaziTrainingSet() {
    let trainingData;
    if (fs.existsSync(file)) {
        trainingData = jsonfile.readFileSync(file);
    }

    console.log('training data size', _.size(trainingData));

    return trainingData; /*[
        {
            input: [22, 4, 1984, 22, 57],
            output: Codec.encode(['己 P-', '亥 hài', '丙 F+', '戌 xū', '戊 P+', '辰 chén', '甲 L+', '子 zǐ'])
        },
        {
            input: [27, 1, 1985, 22, 57],
            output: Codec.encode(['庚 M+', '子 zǐ', '丙 F+', '寅 yín', '丁 F-', '丑 chǒu', '甲 L+', '子 zǐ'])
        },
        {
            input: [20, 6, 1987, 12, 20],
            output: Codec.encode(['戊 P+', '午 wǔ', '癸 A-', '丑 chǒu', '戊 P+', '午 wǔ', '戊 P+', '午 wǔ'])
        },
        {
            input: [25, 7, 1973, 13, 48],
            output: Codec.encode(['丁 F-', '未 wèi', '壬 A+', '戌 xū', '己 P-', '未 wèi', '癸 A-', '丑 chǒu'])
        },
        {
            input: [26, 4, 1975, 14, 45],
            output: Codec.encode(['丁 F-', '未 wèi', '壬 A+', '寅 yín', '庚 M+', '辰 chén', '乙 L-', '卯 mǎo'])
        },
        {
            input: [25, 1, 1978, 9, 0],
            output: Codec.encode(['甲 L+', '辰 chén', '丁 F-', '亥 hài', '癸 A-', '丑 chǒu', '丁 F-', '巳 sì'])
        },
        {
            input: [28, 2, 1981, 8, 40],
            output: Codec.encode(['甲 L+', '辰 chén', '丁 F-', '丑 chǒu', '庚 M+', '寅 yín', '辛 M-', '酉 yǒu'])
        },
        {
            input: [30, 10, 1990, 9, 27],
            output: Codec.encode(['丁 F-', '巳 sì', '戊 P+', '辰 chén', '丙 F+', '戌 xū', '庚 M+', '午 wǔ'])
        },
        {
            input: [20, 6, 1978, 11, 20],
            output: Codec.encode(['戊 P+', '午 wǔ', '癸 A-', '丑 chǒu', '戊 P+', '午 wǔ', '戊 P+', '午 wǔ'])
        },
        {
            input: [25, 7, 1973, 13, 0],
            output: Codec.encode(['丙 F+', '午 wǔ', '壬 A+', '戌 xū', '己 P-', '未 wèi', '癸 A-', '丑 chǒu'])
        },
        {
            input: [24, 1, 2004, 3, 40],
            output: Codec.encode(['壬 A+', '寅 yín', '壬 A+', '寅 yín', '乙 L-', '丑 chǒu', '癸 A-', '未 wèi'])
        },
        {
            input: [24, 12, 1948, 1, 30],
            output: Codec.encode(['癸 A-', '丑 chǒu', '癸 A-', '未 wèi', '甲 L+', '子 zǐ', '戊 P+', '子 zǐ'])
        },
        {
            input: [7, 9, 1989, 18, 40],
            output: Codec.encode(['乙 L-', '酉 yǒu', '庚 M+', '午 wǔ', '癸 A-', '酉 yǒu', '己 P-', '巳 sì'])
        },


        {
            input: [25, 4, 2012, 16, 50],
            output: Codec.encode(['丙 F+', '申 shēn', '丙 F+', '辰 chén', '甲 L+', '辰 chén', '壬 A+', '辰 chén'])
        },
        {
            input: [31, 5, 1987, 12, 10],
            output: Codec.encode(['壬 A+', '午 wǔ', '庚 M+', '辰 chén', '乙 L-', '巳 sì', '丁 F-', '卯 mǎo'])
        },
        {
            input: [11, 2, 1958, 23, 50],
            output: Codec.encode(['丙 F+', '子 zǐ', '己 P-', '未 wèi', '甲 L+', '寅 yín', '戊 P+', '戌 xū'])
        },
        {
            input: [4, 1, 1996, 10, 45],
            output: Codec.encode(['辛 M-', '巳 sì', '庚 M+', '子 zǐ', '戊 P+', '子 zǐ', '乙 L-', '亥 hài'])
        },

        {
            input: [3, 7, 1985, 3, 30],
            output: Codec.encode(['癸 A-', '丑 chǒu', '癸 A-', '卯 mǎo', '壬 A+', '午 wǔ', '乙 L-', '丑 chǒu'])
        },


        {
            input: [4, 10, 1981, 6, 30],
            output: Codec.encode(['己 P-', '卯 mǎo', '乙 L-', '卯 mǎo', '丁 F-', '酉 yǒu', '辛 M-', '酉 yǒu'])
        },

        {
            input: [7, 10, 1986, 10, 15],
            output: Codec.encode(['己 P-', '巳 sì', '甲 L+', '申 shēn', '丁 F-', '酉 yǒu', '丙 F+', '寅 yín'])
        },
        {
            input: [7, 1, 1991, 15, 21],
            output: Codec.encode(['戊 P+', '申 shēn', '丁 F-', '丑 chǒu', '己 P-', '丑 chǒu', '庚 M+', '午 wǔ'])
        },
        {
            input: [6, 6, 1973, 19, 30],
            output: Codec.encode(['壬 A+', '戌 xū', '癸 A-', '酉 yǒu', '戊 P+', '午 wǔ', '癸 A-', '丑 chǒu'])
        },
        {
            input: [11, 3, 2015, 14, 14],
            output: Codec.encode(['乙 L-', '未 wèi', '丙 F+', '戌 xū', '己 P-', '卯 mǎo', '乙 L-', '未 wèi'])
        },
        {
            input: [1, 2, 1974, 1, 45],
            output: Codec.encode(['癸 A-', '丑 chǒu', '癸 A-', '酉 yǒu', '乙 L-', '丑 chǒu', '癸 A-', '丑 chǒu'])
        },
        {
            input: [21, 9, 2015, 19, 30],
            output: Codec.encode(['戊 P+', '戌 xū', '庚 M+', '子 zǐ', '乙 L-', '酉 yǒu', '乙 L-', '未 wèi'])
        },
        {
            input: [7, 6, 1955, 17, 30],
            output: Codec.encode(['癸 A-', '酉 yǒu', '己 P-', '亥 hài', '壬 A+', '午 wǔ', '乙 L-', '未 wèi'])
        },
        {
            input: [22, 4, 1984, 23, 1],
            output: Codec.encode(['己 P-', '亥 hài', '丙 F+', '戌 xū', '戊 P+', '辰 chén', '甲 L+', '子 zǐ'])
        },
        {
            input: [27, 7, 1933, 0, 8],
            output: Codec.encode(['壬 A+', '申 shēn', '甲 L+', '午 wǔ', '己 P-', '未 wèi', '癸 A-', '酉 yǒu'])
        },
        {
            input: [28, 1, 1985, 0, 5],
            output: Codec.encode(['庚 M+', '子 zǐ', '丙 F+', '寅 yín', '丁 F-', '丑 chǒu', '甲 L+', '子 zǐ'])
        },
        {
            input: [24, 5, 1956, 16, 30],
            output: Codec.encode(['丙 F+', '申 shēn', '辛 M-', '卯 mǎo', '癸 A-', '巳 sì', '丙 F+', '申 shēn'])
        },
        {
            input: [10, 7, 1983, 4, 1],
            output: Codec.encode(['丙 F+', '寅 yín', '己 P-', '亥 hài', '己 P-', '未 wèi', '癸 A-', '亥 hài'])
        },
        {
            input: [18, 12, 2012, 10, 0],
            output: Codec.encode(['丁 F-', '巳 sì', '癸 A-', '丑 chǒu', '壬 A+', '子 zǐ', '壬 A+', '辰 chén'])
        },
        {
            input: [27, 2, 1988, 2, 30],
            output: Codec.encode(['辛 M-', '丑 chǒu', '壬 A+', '子 zǐ', '甲 L+', '寅 yín', '戊 P+', '辰 chén'])
        },
        {
            input: [13, 8, 1982, 4, 1],
            output: Codec.encode(['甲 L+', '寅 yín', '戊 P+', '辰 chén', '戊 P+', '申 shēn', '壬 A+', '戌 xū'])
        },
        {
            input: [23, 5, 1980, 8, 30],
            output: Codec.encode(['壬 A+', '辰 chén', '丙 F+', '申 shēn', '辛 M-', '巳 sì', '庚 M+', '申 shēn'])
        },
        {
            input: [5, 11, 2012, 17, 45],
            output: Codec.encode(['乙 L-', '酉 yǒu', '庚 M+', '午 wǔ', '庚 M+', '戌 xū', '壬 A+', '辰 chén'])
        },
        {
            input: [5, 1, 1956, 5, 30],
            output: Codec.encode(['庚 M+', '寅 yín', '辛 M-', '未 wèi', '戊 P+', '子 zǐ', '乙 L-', '未 wèi'])
        },
        {
            input: [17, 7, 1955, 5, 30],
            output: Codec.encode(['丁 F-', '卯 mǎo', '己 P-', '卯 mǎo', '癸 A-', '未 wèi', '乙 L-', '未 wèi'])
        },

        {
            input: [13, 6, 1988, 21, 9],
            output: Codec.encode(['甲 L+', '戌 xū', '己 P-', '亥 hài', '戊 P+', '午 wǔ', '戊 P+', '辰 chén'])
        },
        {
            input: [16, 3, 1986, 3, 30],
            output: Codec.encode(['丙 F+', '寅 yín', '己 P-', '未 wèi', '辛 M-', '卯 mǎo', '丙 F+', '寅 yín'])
        },
        {
            input: [22, 11, 1988, 19, 0],
            output: Codec.encode(['戊 P+', '戌 xū', '辛 M-', '巳 sì', '癸 A-', '亥 hài', '戊 P+', '辰 chén'])
        },

        {
            input: [22, 5, 1991, 9, 9],
            output: Codec.encode(['甲 L+', '辰 chén', '壬 A+', '辰 chén', '癸 A-', '巳 sì', '辛 M-', '未 wèi'])
        },
        {
            input: [27, 3, 1985, 4, 52],
            output: Codec.encode(['戊 P+', '寅 yín', '乙 L-', '丑 chǒu', '己 P-', '卯 mǎo', '乙 L-', '丑 chǒu'])
        },
        {
            input: [9, 4, 1960, 11, 30],
            output: Codec.encode(['庚 M+', '子 zǐ', '庚 M+', '辰 chén', '丁 F-', '卯 mǎo', '丙 F+', '午 wǔ'])
        },

        {
            input: [26, 9, 2014, 7, 30],
            output: Codec.encode(['庚 M+', '辰 chén', '庚 M+', '子 zǐ', '癸 A-', '酉 yǒu', '甲 L+', '午 wǔ'])
        },
        {
            input: [26, 4, 1980, 8, 20],
            output: Codec.encode(['戊 P+', '辰 chén', '己 P-', '巳 sì', '庚 M+', '辰 chén', '庚 M+', '申 shēn'])
        },
        {
            input: [1, 4, 1980, 23, 18],
            output: Codec.encode(['丙 F+', '子 zǐ', '甲 L+', '辰 chén', '己 P-', '卯 mǎo', '庚 M+', '申 shēn'])
        },
        {
            input: [23, 8, 2011, 15, 15],
            output: Codec.encode(['甲 L+', '申 shēn', '庚 M+', '戌 xū', '丙 F+', '申 shēn', '辛 M-', '卯 mǎo'])
        },
        {
            input: [18, 8, 1980, 12, 30],
            output: Codec.encode(['戊 P+', '午 wǔ', '癸 A-', '亥 hài', '甲 L+', '申 shēn', '庚 M+', '申 shēn'])
        },
        {
            input: [3, 9, 1979, 6, 30],
            output: Codec.encode(['丙 F+', '辰 chén', '癸 A-', '酉 yǒu', '壬 A+', '申 shēn', '己 P-', '未 wèi'])
        },


        {
            input: [16, 11, 1984, 1, 0],
            output: Codec.encode(['戊 P+', '辰 chén', '甲 L+', '寅 yín', '乙 L-', '亥 hài', '甲 L+', '子 zǐ'])
        },
        {
            input: [26, 5, 1986, 22, 30],
            output: Codec.encode(['丁 F-', '亥 hài', '庚 M+', '午 wǔ', '癸 A-', '巳 sì', '丙 F+', '寅 yín'])
        },
        {input: [16, 2, 1969, 11, 0], output: Codec.encode(['', '', '壬 A+', '戌 xū', '丙 F+', '寅 yín', '己 P-', '酉 yǒu'])},
        {
            input: [25, 8, 1985, 18, 0],
            output: Codec.encode(['丁 F-', '酉 yǒu', '丙 F+', '申 shēn', '甲 L+', '申 shēn', '乙 L-', '丑 chǒu'])
        },
        {
            input: [14, 11, 1985, 6, 0],
            output: Codec.encode(['癸 A-', '卯 mǎo', '丁 F-', '巳 sì', '丁 F-', '亥 hài', '乙 L-', '丑 chǒu'])
        },
        {
            input: [7, 5, 1963, 6, 0],
            output: Codec.encode(['己 P-', '卯 mǎo', '庚 M+', '戌 xū', '丁 F-', '巳 sì', '癸 A-', '卯 mǎo'])
        },
        {
            input: [22, 5, 2014, 17, 25],
            output: Codec.encode(['辛 M-', '酉 yǒu', '癸 A-', '巳 sì', '己 P-', '巳 sì', '甲 L+', '午 wǔ'])
        },
        {
            input: [15, 2, 1985, 2, 30],
            output: Codec.encode(['丁 F-', '丑 chǒu', '乙 L-', '酉 yǒu', '戊 P+', '寅 yín', '乙 L-', '丑 chǒu'])
        },
        {
            input: [15, 8, 1984, 4, 30],
            output: Codec.encode(['庚 M+', '寅 yín', '辛 M-', '巳 sì', '壬 A+', '申 shēn', '甲 L+', '子 zǐ'])
        },
        {
            input: [4, 2, 1989, 8, 10],
            output: Codec.encode(['庚 M+', '辰 chén', '乙 L-', '未 wèi', '丙 F+', '寅 yín', '己 P-', '巳 sì'])
        },


        {
            input: [28, 11, 1985, 14, 0],
            output: Codec.encode(['乙 L-', '未 wèi', '辛 M-', '未 wèi', '丁 F-', '亥 hài', '乙 L-', '丑 chǒu'])
        },

        {
            input: [22, 2, 1998, 6, 0],
            output: Codec.encode(['己 P-', '卯 mǎo', '庚 M+', '子 zǐ', '甲 L+', '寅 yín', '戊 P+', '寅 yín'])
        },
        {
            input: [31, 1, 1972, 3, 30],
            output: Codec.encode(['庚 M+', '寅 yín', '辛 M-', '酉 yǒu', '辛 M-', '丑 chǒu', '辛 M-', '亥 hài'])
        },
        {
            input: [5, 3, 1971, 21, 0],
            output: Codec.encode(['甲 L+', '戌 xū', '己 P-', '丑 chǒu', '庚 M+', '寅 yín', '辛 M-', '亥 hài'])
        },


        {
            input: [25, 4, 1987, 14, 0],
            output: Codec.encode(['戊 P+', '午 wǔ', '癸 A-', '酉 yǒu', '癸 A-', '卯 mǎo', '丁 F-', '卯 mǎo'])
        },
        {
            input: [5, 7, 1987, 1, 45],
            output: Codec.encode(['丁 F-', '丑 chǒu', '乙 L-', '卯 mǎo', '丙 F+', '午 wǔ', '丁 F-', '卯 mǎo'])
        },


        {
            input: [2, 3, 1990, 0, 49],
            output: Codec.encode(['戊 P+', '子 zǐ', '丙 F+', '寅 yín', '戊 P+', '寅 yín', '庚 M+', '午 wǔ'])
        },


        {
            input: [12, 2, 1969, 23, 30],
            output: Codec.encode(['甲 L+', '子 zǐ', '己 P-', '巳 sì', '丙 F+', '寅 yín', '戊 P+', '申 shēn'])
        },
        {
            input: [14, 9, 2012, 23, 1],
            output: Codec.encode(['丁 F-', '巳 sì', '戊 P+', '寅 yín', '己 P-', '酉 yǒu', '壬 A+', '辰 chén'])
        },
        {
            input: [3, 10, 1967, 10, 10],
            output: Codec.encode(['辛 M-', '巳 sì', '庚 M+', '子 zǐ', '己 P-', '酉 yǒu', '丁 F-', '未 wèi'])
        },
        {
            input: [7, 11, 1999, 0, 30],
            output: Codec.encode(['壬 A+', '子 zǐ', '癸 A-', '亥 hài', '甲 L+', '戌 xū', '己 P-', '卯 mǎo'])
        },
        {
            input: [12, 2, 1969, 23, 30],
            output: Codec.encode(['甲 L+', '子 zǐ', '戊 P+', '午 wǔ', '丙 F+', '寅 yín', '己 P-', '酉 yǒu'])
        },

        {
            input: [12, 6, 1981, 10, 0],
            output: Codec.encode(['辛 M-', '巳 sì', '庚 M+', '子 zǐ', '乙 L-', '未 wèi', '辛 M-', '酉 yǒu'])
        }
    ];*/
}

let trainingSets = {
    xor: [
        {
            input: [0, 0],
            output: [0]
        },
        {
            input: [0, 1],
            output: [1]
        },
        {
            input: [1, 0],
            output: [1]
        },
        {
            input: [1, 1],
            output: [0]
        }
    ]
};

module.exports = function (setName) {
    if (setName === 'bazi') return makeBaziTrainingSet();
    return trainingSets['xor'];
};