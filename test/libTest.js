const {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes,
  isValidEdgeNeighbour,
  isPositionsEqual,
  isPositionOnEdge,
  validateNeighbours,
  isIncludes,
  userInput,
  selectLevel,
  getGridLength,
  initialGrid,
  placeAlives,
  generateGrid,
  startPoint,
  validateStartPoint,
  validateInput,
  rules,
  getNextPosition
} = require("../src/lib.js");

const { deepEqual } = require("assert");

describe("generatePath", function() {
  it("should return straight path", function() {
    const randomGenerator = function(length) {
      return 0;
    };
    let expectedOutput = [
      { row: 3, column: 0 },
      { row: 2, column: 0 },
      { row: 1, column: 0 },
      { row: 0, column: 0 }
    ];
    deepEqual(generatePath(4, randomGenerator), expectedOutput);
  });
  it('should work for blocking ones', function() {
      const randomGenerator = function() {
        let array = [3,0,0,2,1,0,0,0,0,1,0,0];
        let index = 0;
        return function() {
          return array[index++]
        };
      };
      expectedOutput = [
          {row :4 , column :3 },
          {row :3 , column :3 },
          {row :2 , column :3 },
          {row :2 , column :2 },
          {row :2 , column :1 },
          {row :2 , column :0 },
          {row :1 , column :0 },
          {row :0 , column :0 }
      ]
      deepEqual(generatePath(5,randomGenerator()),expectedOutput)
  });
});

describe("findNeighbours", function() {
  it("should return neighbours", function() {
    let expectedOutput = [
      { row: 2, column: 1 },
      { row: 0, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 0 }
    ];
    deepEqual(findNeighbours({ row: 1, column: 1 }), expectedOutput);
  });

  it("should return neighbours co-ordinates for [0,0] ", function() {
    let expectedOutput = [
      { row: 1, column: 0 },
      { row: -1, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: -1 }
    ];
    deepEqual(findNeighbours({ row: 0, column: 0 }), expectedOutput);
  });

  it("should return neighbours co-ordinates for [-1,0] ", function() {
    let expectedOutput = [
      { row: 0, column: 0 },
      { row: -2, column: 0 },
      { row: -1, column: 1 },
      { row: -1, column: -1 }
    ];
    deepEqual(findNeighbours({ row: -1, column: 0 }), expectedOutput);
  });
});

describe("isNotInvalidPosition", function() {
  it("should return true for valid position", function() {
    deepEqual(isNotInvalidPosition(1, { row: 0, column: 0 }), true);
    deepEqual(isNotInvalidPosition(5, { row: 3, column: 4 }), true);
  });
  it("should return false for invalid position", function() {
    deepEqual(isNotInvalidPosition(1, { row: -1, column: 0 }), false);
    deepEqual(isNotInvalidPosition(4, { row: 3, column: 4 }), false);
  });
});

describe("isNotIncludes", function() {
  it("should return true when given positon is not included in set ", function() {
    let setOfPositions = [{ row: 3, column: 3 }];
    let position = { row: 2, column: 3 };
    deepEqual(isNotIncludes(setOfPositions, position), true);
  });

  it("should return false when given positon is included in set ", function() {
    let setOfPositions = [{ row: 3, column: 3 }];
    let position = { row: 3, column: 3 };
    deepEqual(isNotIncludes(setOfPositions, position), false);
  });

  it("should return true when given positon is not included in larger set ", function() {
    let setOfPositions = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 2, column: 2 }
    ];
    let position = { row: 5, column: 5 };
    deepEqual(isNotIncludes(setOfPositions, position), true);
  });

  it("should return false when given positon is included in larger set ", function() {
    let setOfPositions = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 2, column: 2 }
    ];
    let position = { row: 2, column: 3 };
    deepEqual(isNotIncludes(setOfPositions, position), false);
  });
});

describe("isValidEdgeNeighbour", function() {
  it("should return false for invalid edge neighbour", function() {
    let path = [
      { row: 3, column: 1 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 3 }
    ];
    let length = 4;
    let presentNeighbour = { row: 3, column: 3 };
    deepEqual(isValidEdgeNeighbour(path, length, presentNeighbour), false);
  });
  it("should return true for invalid edge neighbour", function() {
    let path = [
      { row: 3, column: 1 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 3 }
    ];
    let length = 4;
    let presentNeighbour = { row: 1, column: 3 };
    deepEqual(isValidEdgeNeighbour(path, length, presentNeighbour), true);
    deepEqual(isValidEdgeNeighbour(path, length, { row: 2, column: 2 }), true);
  });
  it("should return check invalid edge neighbour for left rotation", function() {
    let path = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
      { row: 3, column: 1 }
    ];
    let length = 4;
    let presentNeighbour = { row: 3, column: 2 };
    deepEqual(isValidEdgeNeighbour(path, length, presentNeighbour), false);
    deepEqual(isValidEdgeNeighbour(path, length, { row: 2, column: 1 }), true);
    deepEqual(isValidEdgeNeighbour(path, length, { row: 3, column: 0 }), true);
  });
  it("should return check invalid edge neighbour for right rotation", function() {
    let path = [
      { row: 3, column: 0 },
      { row: 2, column: 0 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 2, column: 2 },
      { row: 3, column: 2 }
    ];
    let length = 4;
    let presentNeighbour = { row: 3, column: 1 };
    deepEqual(isValidEdgeNeighbour(path, length, presentNeighbour), false);
    deepEqual(isValidEdgeNeighbour(path, length, { row: 3, column: 3 }), true);
    deepEqual(isValidEdgeNeighbour(path, length, { row: 2, column: 2 }), true);
  });
});

describe("isPositionsEqual", function() {
  it("should return true when given positions are equal", function() {
    let positon1 = { row: 0, column: 0 };
    deepEqual(isPositionsEqual(positon1, positon1), true);
  });

  it("should return false when given positions are not equal", function() {
    let positon1 = { row: 0, column: 0 };
    let positon2 = { row: 1, column: 0 };
    deepEqual(isPositionsEqual(positon1, positon2), false);
  });
});

describe("isPositionOnEdge", function() {
  it("should return true when the position is on edge", function() {
    deepEqual(isPositionOnEdge({ row: 0, column: 0 }, 1), true);
    deepEqual(isPositionOnEdge({ row: 1, column: 3 }, 4), true);
  });

  it("should return false when the position is not on edge", function() {
    deepEqual(isPositionOnEdge({ row: 2, column: 3 }, 5), false);
    deepEqual(isPositionOnEdge({ row: -1, column: -1 }, 4), false);
  });
});
describe("validateNeighbours", function() {
  it("should return valid neighbours which are in bounds", function() {
    let presentNeighbour = [{ row: -1, column: -1 }];
    let expectedOutput = [];
    deepEqual(
      validateNeighbours([{ row: 0, column: 0 }], 4, presentNeighbour),
      expectedOutput
    );

    presentNeighbour = [{ row: 0, column: 1 }];
    expectedOutput = [{ row: 0, column: 1 }];
    deepEqual(
      validateNeighbours([{ row: 0, column: 0 }], 4, presentNeighbour),
      expectedOutput
    );

    presentNeighbour = [
      { row: 0, column: 1 },
      { row: 0, column: -1 },
      { row: 1, column: 0 },
      { row: -1, column: 0 }
    ];
    expectedOutput = [{ row: 0, column: 1 }];
    deepEqual(
      validateNeighbours(
        [
          { row: 3, column: 0 },
          { row: 2, column: 0 },
          { row: 1, column: 0 },
          { row: 0, column: 0 }
        ],
        4,
        presentNeighbour
      ),
      expectedOutput
    );
  });

  it("should return the neighbours which are in bounds and not included in path ", function() {
    let presentNeighbour = [{ row: -1, column: -1 }, { row: 1, column: 1 }];
    let expectedOutput = [];
    deepEqual(
      validateNeighbours([{ row: 1, column: 1 }], 4, presentNeighbour),
      expectedOutput
    );
    presentNeighbour = [{ row: 2, column: 3 }];
    expectedOutput = [{ row: 2, column: 3 }];
    deepEqual(
      validateNeighbours([{ row: 3, column: 3 }], 4, presentNeighbour),
      expectedOutput
    );

    presentNeighbour = [
      { row: 0, column: 1 },
      { row: 0, column: -1 },
      { row: 1, column: 0 },
      { row: -1, column: 0 }
    ];
    expectedOutput = [{ row: 1, column: 0 }];
    deepEqual(
      validateNeighbours(
        [{ row: 0, column: 0 }, { row: 0, column: 1 }],
        4,
        presentNeighbour
      ),
      expectedOutput
    );
  });

  it("should return valid edge neighbours with on the previous condition", function() {
    let presentNeighbour = [
      { row: 1, column: 1 },
      { row: 0, column: 0 },
      { row: 2, column: 0 },
      { row: 1, column: -1 }
    ];
    let expectedOutput = [{ row: 0, column: 0 }];
    let path = [
      { row: 3, column: 2 },
      { row: 2, column: 2 },
      { row: 1, column: 2 },
      { row: 1, column: 1 },
      { row: 1, column: 0 }
    ];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 1, column: 2 },
      { row: 2, column: 3 },
      { row: 1, column: 4 },
      { row: 0, column: 3 }
    ];
    path = [
      { row: 3, column: 1 },
      { row: 2, column: 1 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 }
    ];
    expectedOutput = [{ row: 0, column: 3 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 2, column: 2 },
      { row: 3, column: 1 },
      { row: 3, column: 3 },
      { row: 4, column: 2 }
    ]
    path = [
      { row: 3, column: 0 },
      { row: 2, column: 0 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 2, column: 2 },
      { row: 3, column: 2 }
    ];
    expectedOutput = [];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 2, column: 1 },
      { row: 3, column: 2 },
      { row: 3, column: 0 },
      { row: 4, column: 1 }
    ];
    path = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
      { row: 3, column: 1 }
    ];
    expectedOutput = [];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 2, column: 1 },
      { row: 2, column: 3 },
      { row: 3, column: 2 },
      { row: 1, column: 2 }
    ];
    path = [
      { row: 3, column: 1 },
      { row: 2, column: 1 },
      { row: 2, column: 2 }
    ];
    expectedOutput = [{ row: 2, column: 3 }, { row: 1, column: 2 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);
  });

  it("should return valid neighbours for start points", function() {
    let presentNeighbour = [
      { row: 2, column: 0 },
      { row: 3, column: 1 },
      { row: 4, column: 0 },
      { row: 3, column: -1 }
    ];
    let expectedOutput = [{ row: 2, column: 0 }];
    let path = [{ row: 3, column: 0 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 2, column: 2 },
      { row: 3, column: 3 },
      { row: 3, column: 1 },
      { row: 4, column: 2 }
    ];
    path = [{ row: 3, column: 2 }];
    expectedOutput = [{ row: 2, column: 2 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 2, column: 3 },
      { row: 4, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 2 }
    ];
    path = [{ row: 3, column: 3 }];
    expectedOutput = [{ row: 2, column: 3 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);
  });

  it("should return valid neighbours for middle points", function() {
    let presentNeighbour = [
      { row: 1, column: 1 },
      { row: 3, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 0 }
    ];
    let expectedOutput = [
      { row: 1, column: 1 },
      { row: 2, column: 2 },
      { row: 2, column: 0 }
    ];
    let path = [{ row: 3, column: 1 }, { row: 2, column: 1 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);

    presentNeighbour = [
      { row: 0, column: 2 },
      { row: 2, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 1 }
    ];
    path = [
      { row: 3, column: 0 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 1, column: 1 },
      { row: 1, column: 2 }
    ];
    expectedOutput = [{ row: 0, column: 2 }, { row: 1, column: 3 }];
    deepEqual(validateNeighbours(path, 4, presentNeighbour), expectedOutput);
  });
});

describe("isIncludes", function() {
  it("should return false when given positon is not included in set ", function() {
    let setOfPositions = [{ row: 3, column: 3 }];
    let position = { row: 2, column: 3 };
    deepEqual(isIncludes(setOfPositions, position), false);
  });

  it("should return true when given positon is included in set ", function() {
    let setOfPositions = [{ row: 3, column: 3 }];
    let position = { row: 3, column: 3 };
    deepEqual(isIncludes(setOfPositions, position), true);
  });

  it("should return true when given positon is not included in larger set ", function() {
    let setOfPositions = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 2, column: 2 }
    ];
    let position = { row: 5, column: 5 };
    deepEqual(isIncludes(setOfPositions, position), false);
  });

  it("should return false when given positon is included in larger set ", function() {
    let setOfPositions = [
      { row: 3, column: 3 },
      { row: 2, column: 3 },
      { row: 1, column: 3 },
      { row: 1, column: 2 },
      { row: 2, column: 2 }
    ];
    let position = { row: 2, column: 3 };
    deepEqual(isIncludes(setOfPositions, position), true);
  });
});

describe("userInput", function() {
  it("should return one when readline get called", function() {
    const readline = function() {
      return 1;
    };
    deepEqual(userInput(readline), 1);
  });

  it("should return zero when exit get called", function() {
    const exit = function() {
      return 0;
    };
    const readline = function() {
      return "exit";
    };
    deepEqual(userInput(readline, exit), 0);
  });
});

describe("selectLevel", function() {
  it("should return level provided by readline", function() {
    const readline = function() {
      return 1;
    };
    deepEqual(selectLevel(readline), 1);
  });

  it("should return wrong input and then correct", function() {
    const readline = function() {
      let array = [5, 2];
      let index = 0;
      return function() {
        return array[index++];
      };
    };
    deepEqual(selectLevel(readline()), 2);
  });
});

describe('getGridLength', function() {
  it('should return grid size according to level', function() {
    deepEqual(getGridLength(1),4);
    deepEqual(getGridLength(2),6);
    deepEqual(getGridLength(3),8);
  });
  it('should return undefined for unknown level', function() {
    deepEqual(getGridLength(0),undefined);
  });
});

describe('initialGrid', function() {
  it('should return grid of less than two length filled with spaces', function() {
    deepEqual(initialGrid(0),[]);
    deepEqual(initialGrid(1),[[' ']]);
  });

  it('should return grid of given length filled with spaces', function() {
    let expectedOutput = [ [ ' ', ' ', ' ', ' ' ],
                           [ ' ', ' ', ' ', ' ' ],
                           [ ' ', ' ', ' ', ' ' ],
                           [ ' ', ' ', ' ', ' ' ] ];
    deepEqual(initialGrid(4),expectedOutput);
  });
});

describe('placeAlives', function() {
  it("shouldn't place any alive cells when path is empty" , function() {
    deepEqual(placeAlives([[" "]],[]),[[" "]]);
  });
  it('should place one alive cell in the grid when path single position', function() {
    deepEqual(placeAlives([[" "]],[{row:0,column:0}]),[["*"]]);
    deepEqual(placeAlives([[" ", " "],[" ", " "]],[{row:0,column:0}]),[["*"," "],[" "," "]]);
  });
  it('should place more than one alive Cells in the grid when the path length is more than one',()=>{
    grid = initialGrid(4);
    path = [{row:3 , column:0},
            {row:2 , column:0},
            {row:2 , column:1},
            {row:1 , column:1}];
    let expectedOutput = [ [ ' ', ' ', ' ', ' ' ],
                           [ ' ', '*', ' ', ' ' ],
                           [ '*', '*', ' ', ' ' ],
                           [ '*', ' ', ' ', ' ' ] ];
    deepEqual(placeAlives(grid,path),expectedOutput)
  })
});

describe('generateGrid', function() {
  it('should return grid of length one when length of one is given', function() {
    let expectedOutput = "-----\n|   |\n-----";
    deepEqual(generateGrid(1,[]),expectedOutput);
  });

  it('should return grid of given length', function() {
    let path = [{row:1,column:0},{row:1,column:1},{row:0,column:1}];
    let expectedOutput = '---------\n|   | * |\n---------\n| * | * |\n---------';
    deepEqual(generateGrid(2,path),expectedOutput);
  
    path = [{row:3,column:1},
            {row:2,column:1},
            {row:2,column:2}];
    expectedOutput = '-----------------\n'+
                     '|   |   |   |   |\n'+
                     '-----------------\n'+
                     '|   |   |   |   |\n'+
                     '-----------------\n'+
                     '|   | * | * |   |\n'+
                     '-----------------\n'+
                     '|   | * |   |   |\n'+
                     '-----------------'
    deepEqual(generateGrid(4,path),expectedOutput);    
  });
});

describe('startPoint', function() {
  const exit = function() {
    return 0;
  };
  it('should return score', function() {
    const readline = function() {
      return 1;
    };
    deepEqual(startPoint({row:0,column:1},4,readline,exit,100),110);
  });

  it('should return wrong input message when invalid input is given', function() {
    const readline = function() {
      let array = ["5",1];
      let index = 0;
      return function () {
        return array[index++];
      };
    };
    deepEqual(startPoint({row:0,column:1},4,readline(),exit,100),110);
  });
  it('should return wrong input message when invalid input is given', function() {
    const readline = function() {
      let array = [2];
      let index = 0;
      return function () {
        return array[index++];
      };
    };
    deepEqual(startPoint({row:0,column:1},4,readline(),exit,10),0);
  });
  it('should return wrong input message when invalid input is given', function() {
    const readline = function() {
      let array = [2,1];
      let index = 0;
      return function () {
        return array[index++];
      };
    };
    deepEqual(startPoint({row:0,column:1},4,readline(),exit,100),100);
  });
});

describe('validateStartPoint', function() {
  it('should return given score incremented by 10 when given start point is valid', function() {
    deepEqual(validateStartPoint(10,0,{row:0,column:0}),20);
  });

  it('should return given score reduced by 10 when given start point is invalid', function() {
    deepEqual(validateStartPoint(10,0,{row:0,column:1}),0);
  });
});

describe('validateInput', function() {
  const exit = function() {
    return 0;
  };
  it('should return input among i/j/k/l', function() {
    const readline = function() {
      return 'i';
    };
    deepEqual(validateInput(readline,exit),'i');
  });

  it('should return input among i/j/k/l after wrong input', function() {
    const readline = function() {
      let array = [1,'j'];
      let index = 0;
      return function(){
        return array[index++];
      };
    };
    deepEqual(validateInput(readline(),exit),'j');
  });
});

describe('rules', function() {
  it('should return the rules for game', function() {
    deepEqual(rules(),"i : up\nk : down\nj : left\nl : right");
  });
});

describe('getNextPosition', function() {
  it('should return next position as per the direction provided', function() {
    deepEqual(getNextPosition('i',{row:3,column:3}),{row:2,column:3});
    deepEqual(getNextPosition('l',{row:3,column:3}),{row:3,column:4});
  });
});