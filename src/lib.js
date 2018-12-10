const findNeighbours = function({row,column}){
    return [{row:row+1,column},{row:row-1,column},{row,column:column+1},{row,column:column-1}];
}

const generatePath = function(length) {
    return length;
}

module.exports = {
  generatePath,
  findNeighbours
}