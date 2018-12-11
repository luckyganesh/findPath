const findNeighbours = function({row,column}){
    return [{row:row+1,column},{row:row-1,column},{row,column:column+1},{row,column:column-1}];
}

const generatePath = function(length) {
    return length;
}

const isNotIncludes = function(setOfPositions,position){
    let {row,column } = position;
    return !setOfPositions.some((x) => x.row == row && x.column == column)
}

const isNotInvalidPosition = function(position, length) {
    let {row, column} = position;
    return !(row < 0 || row >= length || column >= length);
};

const isValidEdgeNeighbour = function(path, length, presentNeighbour) {
    let {row, column} = path[path.length-1];
    let neighbour = {row:row+1, column};
    let startingPosition = path[0];
    if (row != length-1) {
        return !(presentNeighbour.row == neighbour.row && presentNeighbour.column == neighbour.column);
    };
    if(startingPosition.column < column) {
        neighbour = {row, column:column-1};
    };
    if(startingPosition.column > column) {
        neighbour = {row, column:column+1};
    };
    return !(presentNeighbour.row == neighbour.row && presentNeighbour.column == neighbour.column);
};

module.exports = {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes,
  isValidEdgeNeighbour
}