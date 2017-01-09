"use strict";
let synaptic = require("synaptic");
let moment = require("moment");
let jsonfile = require('jsonfile');
let fs = require('fs');
let _ = require('lodash');

let Codec = require('./utils/chart-codec');

let NetworkMaker = require('./utils/network-maker');
let TrainingSetMaker = require('./utils/training-set-maker');

let file = '.\\trained-bazi.json';
let start = moment();
let myNetwork = NetworkMaker([5, 10, 10, 10, 8]);

console.log('making dataset');
let rawDataSet = TrainingSetMaker('bazi');

console.log('shuffling dataset');
let dataSet = _.shuffle(rawDataSet);

// separate a training set and a validation set
let threshold = 1000;
let trainingSet = dataSet.splice(0, threshold);

let dataSetSize = _.size(dataSet);
let trainingSetSize = _.size(trainingSet);

if (fs.existsSync(file)) {
    console.log('loading pre-trained network from', file);
    myNetwork = synaptic.Network.fromJSON(jsonfile.readFileSync(file));
}

let trainer = new synaptic.Trainer(myNetwork);
let iterations = 100 * 1000 * 1000;
trainer.train(
    trainingSet,
    {
        rate: .001,
        iterations: iterations,
        error: .005,
        shuffle: true,
        log: 0,
        cost: synaptic.Trainer.cost.MSE,

        schedule: {
            every: 10 * 1000,
            do: function (data) {
                let errors = 0;
                let errorWidth = [];
                dataSet.forEach(
                    function (dataPoint) {
                        let expected = Codec.decode(dataPoint.output);
                        // console.log('expected raw    ', dataPoint.output);
                        // console.log('expected decoded', expected);

                        let networkPrediction = myNetwork.activate(dataPoint.input);
                        let predicted = Codec.decode(networkPrediction);
                        // console.log('predicted raw    ', networkPrediction);
                        // console.log('predicted decoded', predicted);

                        if (expected != predicted) {
                            errors++;
                        }
                        let badPillarsCount = 0;
                        if (expected[0] != predicted[0] || expected[1] != predicted[1]) {
                            badPillarsCount++;
                        }
                        if (expected[2] != predicted[2] || expected[3] != predicted[3]) {
                            badPillarsCount++;
                        }
                        if (expected[4] != predicted[4] || expected[5] != predicted[5]) {
                            badPillarsCount++;
                        }
                        if (expected[6] != predicted[6] || expected[7] != predicted[7]) {
                            badPillarsCount++;
                        }
                        // console.log('bad pillars count:', badPillarsCount);
                        errorWidth[badPillarsCount] = ++errorWidth[badPillarsCount] || 1;
                        // console.log(errorWidth);
                    }
                );
                // console.log('data', data);
                console.log('iterations', data.iterations,
                    '  progress', Math.round(data.iterations / iterations * 100) / 100 + '%',
                    '  error', errors / dataSetSize,
                    '  error spread', errorWidth);

                // Save network in-between runs
                jsonfile.writeFileSync(file, myNetwork.toJSON());
            }
        }
    }
);

let end = moment();

console.log("[1984, 4, 22, 22, 57] => [" +
    Codec.decode(myNetwork.activate([1984, 4, 22, 22, 57])) + "]");

console.log("[1998, 10, 16, 2, 55] => [" +
    Codec.decode(myNetwork.activate([1998, 10, 16, 2, 55])) + "]");

jsonfile.writeFileSync(file, myNetwork.toJSON());

console.log('Training took', end.diff(start));
