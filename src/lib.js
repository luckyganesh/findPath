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

module.exports = {
  generatePath,
  findNeighbours,
  isNotInvalidPosition,
  isNotIncludes
}