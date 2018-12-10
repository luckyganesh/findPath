const {generatePath} = require('../src/lib.js');

const { deepEqual } = require('assert');

describe('generatePath', function() {
    it('should return the length of grid', function() {
        deepEqual(generatePath(2),2)
    });
});