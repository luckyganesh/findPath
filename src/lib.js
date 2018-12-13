const findNeighbours = function({row,column}){
    return [{row:row+1,column},{row:row-1,column},{row,column:column+1},{row,column:column-1}];
};

const generatePath = function(length,randomGenerator) {
    let path = [];
    let presentPosition = {row:length-1};
    presentPosition.column = Math.floor(randomGenerator(length));
    path.push(presentPosition);
    let blockedPositions = [];
    while(presentPosition.row > 0){
        let allNeighbours = findNeighbours(presentPosition);
        let validNeighbours = validateNeighbours(path,length,allNeighbours);
        validNeighbours = validNeighbours.filter(isNotIncludes.bind(null,blockedPositions));
        if(validNeighbours.length == 0){
            blockedPositions.push(path[path.length-1])
            validNeighbours[0] = path[path.length-2];
            path.pop();
            path.pop()
        }
        let randomIndex = (Math.floor(randomGenerator(validNeighbours.length)));
        presentPosition = validNeighbours[randomIndex];
        path.push(presentPosition);
    }
    return path;
}

const isIncludes = function(setOfPositions,position){
    return setOfPositions.some(isPositionsEqual.bind(null,position));
};

const isNotIncludes = function(setOfPositions, position) {
    return !isIncludes(setOfPositions, position);
};

const isNotInvalidPosition = function(length,position) {
    let {row, column} = position;
    return !(row < 0 || row >= length || column >= length || column < 0);
};

const isValidEdgeNeighbour = function(path, length, presentNeighbour) {
    let {row, column} = path[path.length-1];
    let neighbour = {row:row+1, column};
    let startingPosition = path[0];
    if(row != length-1) {
        return !isPositionsEqual(presentNeighbour,neighbour);
    };
    if(startingPosition.column < column) {
        neighbour = {row, column:column-1};
    };
    if(startingPosition.column > column) {
        neighbour = {row, column:column+1};
    };
    return !isPositionsEqual(presentNeighbour,neighbour);
};

const isPositionsEqual = function(position1,position2) {
    return position1.row == position2.row && position1.column == position2.column;
};

const isPositionOnEdge = function(position, length) {
    let {row, column} = position;
    return (row == 0 || column == 0 || row == length-1 ||column == length-1);
};

const validateNeighbours = function(prevPath,length,presentNeighbours) {
    let validNeighbours = presentNeighbours.filter(isNotInvalidPosition.bind(null,length));
    validNeighbours = validNeighbours.filter(isNotIncludes.bind(null,prevPath));
    validNeighbours = validNeighbours.filter((x) => x.row != length-1 );
    validNeighbours = validNeighbours.filter((x)=> {
        let neighbours = findNeighbours(x)
        neighbours = neighbours.filter(isIncludes.bind(null,prevPath));
        return neighbours.length == 1;
    });
    let presentPosition = prevPath[prevPath.length-1];
    if(isPositionOnEdge(presentPosition,length)){
        validNeighbours = validNeighbours.filter(isValidEdgeNeighbour.bind(null,prevPath,length));
    };
    return validNeighbours;
};

const userInput = function(readline, stop) {
    let input = readline("");
    if(input == "exit"){
      return stop(1);
    }
    return input;
};

const selectLevel = function(readline, stop) {
    console.log("1.Easy\n2.Medium\n3.Hard");
    console.log("select the number to start:");
    let choice = userInput(readline, stop);
    if([1,2,3].includes(+choice)){
        return +choice;
    };
    console.log(choice+" is wrong input, select again:");
    return selectLevel(readline, stop);
};

const getGridLength = function(level) {
    let gridSize = [4,6,8];
    return gridSize[level-1];
};

const initialGrid = function(length){
    grid = new Array(length).fill(length).map((x) => new Array(x).fill(" "));
    return grid;
};

const placeAlives = function(grid, path) {
    path.map(({row,column}) => {
        grid[row][column] = '*';
    });
    return grid;
};

const generateGrid = function(length,path) {
    let grid = initialGrid(length);
    grid = placeAlives(grid,path);
    let dashline = new Array(4*length+1).fill("-").join("");
    let lines = grid.map((x) => "| "+ x.join(" | ")+" |");
    return dashline +"\n"+ lines.join("\n"+dashline+"\n") +"\n"+ dashline ;
};

const validateStartPoint = function(score,userInput,startPosition){
    score -= 10;
    if(userInput == startPosition.column){
      score +=20;
    }
    return score;
}

const startPoint = function(fp,length,readline,stop,score) {
    console.log(generateGrid(length,[]));
    let chances = new Array(length).fill("").map((elem,index) => index);
    console.log("  "+chances.join("   "));
    input = +userInput(readline,stop);
    console.clear();
    if(!chances.includes(input)){
        console.log("Wrong input");
        return startPoint(fp,length,readline,stop,score);
    }
    let currScore = validateStartPoint(score,input,fp);
    if(currScore === 0){
        console.log("you lost");
        return stop(0);
    }
    if(currScore == score+10){
      return currScore;
    }
    console.log('----- BOOM -----');
    console.log("score : "+currScore);
    return startPoint(fp,length,readline,stop,currScore);
}

const validateInput = function(readLine,stop) {
    let input = userInput(readLine,stop);
    if(["i","j","k","l"].includes(input)){
        return input;
    }
    console.log("wrong Input");
    return validateInput(readLine,stop);
};

const rules = function() {
    return "i : up\nk : down\nj : left\nl : right";
};

const getNextPosition = function(direction,position) {
    let {row ,column } = position;
    let nextPositions = {
        i : {row : row-1 , column},
        k : {row : row+1 , column},
        j : {row , column : column-1},
        l : {row , column : column+1}
    }
    return nextPositions[direction];
}

const startGame = function(randomGenerator, readline, stop) {
    let level = selectLevel(readline, stop);
    let gridLength = getGridLength(level);
    let path = generatePath(gridLength,randomGenerator);
    let score = 100;
    return startPoint(path[0],gridLength,readline,stop,score);
};

module.exports = {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes,
  isValidEdgeNeighbour,
  isPositionsEqual,
  isPositionOnEdge,
  validateNeighbours,
  isIncludes,
  selectLevel,
  userInput,
  startGame,
  getGridLength,
  initialGrid,
  placeAlives,
  generateGrid,
  startPoint,
  validateStartPoint,
  validateInput,
  rules,
  getNextPosition
};