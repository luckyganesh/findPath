const { selectLevel } = require('./src/lib.js');
const readline = require('readline-sync').question;
const exit = process.exit;
const main = function(){
  console.log(selectLevel(readline, exit));
}

main();