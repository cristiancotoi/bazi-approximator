'use strict';

let synaptic = require("synaptic");

module.exports = function (setupArr) {
    let networkDepth = setupArr.length;

    let inputLayer = new synaptic.Layer(setupArr[0]);
    let outputLayer = new synaptic.Layer(setupArr[networkDepth - 1]);

    let hLayers = [];
    console.log('depth', networkDepth);
    for (let i = 0; i <= networkDepth - 2; i++) {
        let layerName = 'hidden layer ' + i + '['+setupArr[i + 1]+']';
        let hiddenLayer;

        if (i < networkDepth - 2) {
            hiddenLayer = new synaptic.Layer(setupArr[i + 1]);
            hLayers.push(hiddenLayer);
        }

        if (i == 0) {
            console.log(layerName, '- input -> hidden', i);
            inputLayer.project(hiddenLayer);
        } else if (i == networkDepth - 2) {
            console.log(layerName, '- hidden', i - 1, '-> output');
            hLayers[i - 1].project(outputLayer)
        } else {
            console.log(layerName, '- hidden', i - 1, '-> hidden', i);
            hLayers[i - 1].project(hiddenLayer)
        }
    }

    return new synaptic.Network({
        input: inputLayer,
        hidden: hLayers,
        output: outputLayer
    });
};