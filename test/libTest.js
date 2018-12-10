const { generatePath , findNeighbours , isNotInvalidPosition } = require('../src/lib.js');

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

describe('isNotInvalidPosition', function() {
    it('should return true for valid position', function() {
        deepEqual(isNotInvalidPosition({row:0,column:0},1),true);
        deepEqual(isNotInvalidPosition({row:3,column:4},5),true);
    });
    it('should return false for invalid position', function() {
        deepEqual(isNotInvalidPosition({row:-1,column:0},1),false);
        deepEqual(isNotInvalidPosition({row:3,column:4},4),false);
    });
});