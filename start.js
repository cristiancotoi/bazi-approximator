let synaptic = require("synaptic");
// let moment = require("moment");
let jsonfile = require('jsonfile');
let fs = require('fs');

let NetworkMaker = require('./utils/network-maker');
let TrainingSetMaker = require('./utils/training-set-maker');

let file = '.\\trained-xor.json';

let myNetwork = NetworkMaker([2, 6, 6, 1]);
let trainingSet = TrainingSetMaker('xor');

if (fs.existsSync(file)) {
    myNetwork = synaptic.Network.fromJSON(jsonfile.readFileSync(file));
}

let trainer = new synaptic.Trainer(myNetwork);

trainer.train(
    trainingSet,
    {
        rate: .1,
        iterations: 1000 * 1000,
        error: .00005,
        shuffle: true,
        log: 1000,
        cost: synaptic.Trainer.cost.MSE
    }
);

console.log("[0, 0] => [" + myNetwork.activate([0, 0]) + "]"); // [0.015020775950893527]
console.log("[0, 1] => [" + myNetwork.activate([0, 1]) + "]"); // [0.9815816381088985]
console.log("[1, 0] => [" + myNetwork.activate([1, 0]) + "]"); // [0.9871822457132193]
console.log("[1, 1] => [" + myNetwork.activate([1, 1]) + "]"); // [0.012950087641929467]

jsonfile.writeFileSync(file, myNetwork.toJSON());
