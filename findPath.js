const { generatePath } = require('./src/lib.js');

const randomGenerator = function(length) {
    return Math.random()*length;
}
const main = function(){
  let moves = +process.argv[2];
  console.log(generatePath(moves,randomGenerator))
  return ;
}
main();