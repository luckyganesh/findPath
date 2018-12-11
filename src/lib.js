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
        let randomIndex = (Math.floor(randomGenerator(validNeighbours.length)));
        presentPosition = validNeighbours[randomIndex];
        path.push(presentPosition);
    }
    return path;
}

const isNotIncludes = function(setOfPositions,position){
    return !setOfPositions.some(isPositionsEqual.bind(null,position));
}

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
    let presentPosition = prevPath[prevPath.length-1];
    if(isPositionOnEdge(presentPosition,length)){
        validNeighbours = validNeighbours.filter(isValidEdgeNeighbour.bind(null,prevPath,length));
    }
    return validNeighbours;
};

module.exports = {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes,
  isValidEdgeNeighbour,
  isPositionsEqual,
  isPositionOnEdge,
  validateNeighbours
}