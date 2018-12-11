const { generatePath } = require('./src/lib.js');

const randomGenerator = function(length) {
    return Math.random()*length;
}
const main = function(){
  console.log(generatePath(+process.argv[2],randomGenerator))
  return ;
}
main();