const { generatePath , findNeighbours } = require('../src/lib.js');

const { deepEqual } = require('assert');

describe('generatePath', function() {
    it('should return the length of grid', function() {
        deepEqual(generatePath(2),2)
    });

});

describe('findNeighbours', function() {
    it('should return neighbours', function() {
        let expectedOutput = [{row:2,column:1},{row:0,column:1},{row:1,column:2},{row:1,column:0}];
        deepEqual(findNeighbours({row:1,column:1}),expectedOutput)
    });

    it('should return neighbours co-ordinates for [0,0] ', function() {
        let expectedOutput = [{row:1,column:0},{row:-1,column:0},{row:0,column:1},{row:0,column:-1}];
        deepEqual(findNeighbours({row:0,column:0}),expectedOutput)
    });

    it('should return neighbours co-ordinates for [-1,0] ', function() {
        let expectedOutput = [{row:0,column:0},{row:-2,column:0},{row:-1,column:1},{row:-1,column:-1}];
        deepEqual(findNeighbours({row:-1,column:0}),expectedOutput)
    });
});