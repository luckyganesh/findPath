const findNeighbours = function({row,column}){
    return [{row:row+1,column},{row:row-1,column},{row,column:column+1},{row,column:column-1}];
}

const generatePath = function(length) {
    return length;
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

module.exports = {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes,
  isValidEdgeNeighbour,
  isPositionsEqual,
  isPositionOnEdge
}