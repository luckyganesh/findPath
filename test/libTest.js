const { 
    generatePath , 
    findNeighbours , 
    isNotInvalidPosition, 
    isNotIncludes,
    isValidEdgeNeighbour,
    isPositionsEqual,
    isPositionOnEdge,
    validateNeighbours,
    isIncludes
} = require('../src/lib.js');

const { deepEqual } = require('assert');

describe('generatePath', function() {

    const randomGenerator = function(length) {
        return 0;
    };

    it('should return straight path', function() {
        let expectedOutput = [{row:3,column:0},{row:2,column:0},{row:1,column:0},{row:0,column:0}];
        deepEqual(generatePath(4, randomGenerator), expectedOutput);
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
        deepEqual(isNotInvalidPosition(1,{row:0,column:0}),true);
        deepEqual(isNotInvalidPosition(5,{row:3,column:4}),true);
    });
    it('should return false for invalid position', function() {
        deepEqual(isNotInvalidPosition(1,{row:-1,column:0}),false);
        deepEqual(isNotInvalidPosition(4,{row:3,column:4}),false);
    });
});

describe('isNotIncludes', function() {
    it('should return true when given positon is not included in set ', function() {
        let setOfPositions = [{row:3,column:3}];
        let position = {row: 2, column:3};
        deepEqual(isNotIncludes(setOfPositions, position), true);
    });

    it('should return false when given positon is included in set ', function() {
        let setOfPositions = [{row:3,column:3}];
        let position = {row: 3, column:3};
        deepEqual(isNotIncludes(setOfPositions, position), false);
    });

    it('should return true when given positon is not included in larger set ', function() {
        let setOfPositions = [{row:3,column:3},{row:2,column:3},{row:1,column:3},{row:1,column:2},{row:2,column:2}];
        let position = {row: 5, column:5};
        deepEqual(isNotIncludes(setOfPositions, position), true);
    });

    it('should return false when given positon is included in larger set ', function() {
        let setOfPositions = [{row:3,column:3},{row:2,column:3},{row:1,column:3},{row:1,column:2},{row:2,column:2}];
        let position = {row: 2, column:3};
        deepEqual(isNotIncludes(setOfPositions, position), false);
    });
});

describe('isValidEdgeNeighbour', function() {
    it('should return false for invalid edge neighbour', function() {
        let path = [{row:3 ,column:1},{row:2,column:1},{row:2,column:2},{row:2,column:3}];
        let length = 4;
        let presentNeighbour = {row:3,column:3}
        deepEqual(isValidEdgeNeighbour(path,length,presentNeighbour),false);
    });
    it('should return true for invalid edge neighbour', function() {
        let path = [{row:3 ,column:1},{row:2,column:1},{row:2,column:2},{row:2,column:3}];
        let length = 4;
        let presentNeighbour = {row:1,column:3}
        deepEqual(isValidEdgeNeighbour(path,length,presentNeighbour),true);
        deepEqual(isValidEdgeNeighbour(path,length,{row:2,column:2}),true);
    });
    it('should return check invalid edge neighbour for left rotation', function() {
        let path = [{row:3 ,column:3},{row:2,column:3},{row:1,column:3},{row:1,column:2},{row:1,column:1},{row:2,column:1},{row:3,column:1}];
        let length = 4;
        let presentNeighbour = {row:3,column:2}
        deepEqual(isValidEdgeNeighbour(path,length,presentNeighbour),false);
        deepEqual(isValidEdgeNeighbour(path,length,{row:2,column:1}),true);
        deepEqual(isValidEdgeNeighbour(path,length,{row:3,column:0}),true);
    });
    it('should return check invalid edge neighbour for right rotation', function() {
        let path = [{row:3 ,column:0},{row:2,column:0},{row:1,column:0},{row:1,column:1},{row:1,column:2},{row:2,column:2},{row:3,column:2}];
        let length = 4;
        let presentNeighbour = {row:3,column:1}
        deepEqual(isValidEdgeNeighbour(path,length,presentNeighbour),false);
        deepEqual(isValidEdgeNeighbour(path,length,{row:3,column:3}),true);
        deepEqual(isValidEdgeNeighbour(path,length,{row:2,column:2}),true);
    });
});

describe('isPositionsEqual', function() {
    it('should return true when given positions are equal', function() {
        let positon1 = {row:0, column:0};
        deepEqual(isPositionsEqual(positon1, positon1),true);
    });

    it('should return false when given positions are not equal', function() {
        let positon1 = {row:0, column:0};
        let positon2 = {row:1, column:0};
        deepEqual(isPositionsEqual(positon1, positon2),false);
    });
});

describe('isPositionOnEdge', function() {
    it('should return true when the position is on edge', function() {
        deepEqual(isPositionOnEdge({row:0 , column :0},1),true);
        deepEqual(isPositionOnEdge({row:1 , column :3},4),true);
    });

    it('should return false when the position is not on edge', function() {
        deepEqual(isPositionOnEdge({row:2 , column :3},5),false);
        deepEqual(isPositionOnEdge({row:-1 , column :-1},4),false);
    });
});
describe('validateNeighbours', function() {
    it('should return valid neighbours which are in bounds', function() {
        let presentNeighbour = [{row:-1, column:-1}];
        let expectedOutput = [];
        deepEqual(validateNeighbours([{row:0,column:0}],4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:2, column:3}];
        expectedOutput = [{row:2, column:3}];
        deepEqual(validateNeighbours([{row:0,column:0}],4,presentNeighbour),expectedOutput);
        
        presentNeighbour = [{row:0,column:1}, {row:0,column:-1}, {row:1,column:0}, {row:-1,column:0}]
        expectedOutput = [{row:0,column:1}, {row:1,column:0}];
        deepEqual(validateNeighbours([{row:3,column:3}],4,presentNeighbour),expectedOutput);
    });

    it('should return the neighbours which are in bounds and not included in path ', function() {
        let presentNeighbour = [{row:-1, column:-1},{row:1, column :1}];
        let expectedOutput = [];
        deepEqual(validateNeighbours([{row:1, column :1}],4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:2, column:3}];
        expectedOutput = [{row:2, column:3}];
        deepEqual(validateNeighbours([{row:3,column:3}],4,presentNeighbour),expectedOutput);
        
        presentNeighbour = [{row:0,column:1}, {row:0,column:-1}, {row:1,column:0}, {row:-1,column:0}]
        expectedOutput = [{row:1,column:0}];
        deepEqual(validateNeighbours([{row:0,column:0},{row:0,column:1}],4,presentNeighbour),expectedOutput);
    });

    it('should return valid edge neighbours with on the previous condition', function() {
        let presentNeighbour = [{row:1, column:1},{row:0, column :0},{row:2,column:0},{row:1,column:-1}];
        let expectedOutput = [{row:0,column:0}];
        let path = [{row:3,column:2},{row:2,column:2},{row:1,column:2},{row:1,column:1},{row:1,column:0}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:1, column:2},{row:2, column:3},{row:1, column:4},{row:0, column:3}];
        path = [{row:3,column:1},{row:2,column:1},{row:1, column:1},{row:1,column:2},{row:1,column:3}];
        expectedOutput = [{row:0, column:3}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);
        
        presentNeighbour = [{row:2,column:2}, {row:3,column:1}, {row:3,column:3}, {row:4,column:2}];
        path = [{row:3,column:0},{row:2,column:0},{row:1, column:0},{row:1,column:1},{row:1,column:2},{row:2,column:2},{row:3,column:2}];
        expectedOutput = [];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:2,column:1}, {row:3,column:2}, {row:3,column:0}, {row:4,column:1}];
        path = [{row:3,column:3},{row:2,column:3},{row:1, column:3},{row:1,column:2},{row:1,column:1},{row:2,column:1},{row:3,column:1}];
        expectedOutput = [];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:2,column:1}, {row:2,column:3}, {row:3,column:2}, {row:1,column:2}];
        path = [{row:3,column:1},{row:2,column:1},{row:2, column:2}];
        expectedOutput = [{row:2,column:3},{row:1,column:2}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);
    });

    it('should return valid neighbours for start points', function() {
        let presentNeighbour = [{row:2, column:0},{row:3, column :1},{row:4,column:0},{row:3,column:-1}];
        let expectedOutput = [{row:2,column:0}];
        let path = [{row:3,column:0}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:2, column:2},{row:3, column:3},{row:3, column:1},{row:4, column:2}];
        path = [{row:3,column:2}];
        expectedOutput = [{row:2, column:2}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);
        
        presentNeighbour = [{row:2,column:3}, {row:4,column:3}, {row:3,column:4}, {row:3,column:2}];
        path = [{row:3,column:3}];
        expectedOutput = [{row:2,column:3}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

    });

    it('should return valid neighbours for middle points',function(){
        let presentNeighbour = [{row:1,column:1},{row:3,column:1},{row:2,column:2},{row:2,column:0}];
        let expectedOutput = [{row:1,column:1},{row:2,column:0}];
        let path = [{row:3,column:1},{row:2,column:2},{row:2,column:1}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);

        presentNeighbour = [{row:0, column:2},{row:2, column:2},{row:1, column:3},{row:1, column:1}];
        path = [{row:3,column:0},{row:2,column:0},{row:2,column:1},{row:1,column:1},{row:1,column:2}];
        expectedOutput = [{row:0, column:2},{row:2, column:2},{row:1, column:3}];
        deepEqual(validateNeighbours(path,4,presentNeighbour),expectedOutput);
        
    })
});

describe('isIncludes', function() {
    it('should return false when given positon is not included in set ', function() {
        let setOfPositions = [{row:3,column:3}];
        let position = {row: 2, column:3};
        deepEqual(isIncludes(setOfPositions, position), false);
    });

    it('should return true when given positon is included in set ', function() {
        let setOfPositions = [{row:3,column:3}];
        let position = {row: 3, column:3};
        deepEqual(isIncludes(setOfPositions, position), true);
    });

    it('should return true when given positon is not included in larger set ', function() {
        let setOfPositions = [{row:3,column:3},{row:2,column:3},{row:1,column:3},{row:1,column:2},{row:2,column:2}];
        let position = {row: 5, column:5};
        deepEqual(isIncludes(setOfPositions, position), false);
    });

    it('should return false when given positon is included in larger set ', function() {
        let setOfPositions = [{row:3,column:3},{row:2,column:3},{row:1,column:3},{row:1,column:2},{row:2,column:2}];
        let position = {row: 2, column:3};
        deepEqual(isIncludes(setOfPositions, position), true);
    });
});