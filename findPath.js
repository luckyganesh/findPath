const { generatePath } = require('./src/lib.js');

const main = function(){
  console.log(generatePath(+process.argv[2]))
  return ;
}
main();