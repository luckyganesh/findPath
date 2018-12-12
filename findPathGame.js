const { selectLevel } = require('./src/lib.js');
const readline = require('readline-sync').question;
const main = function(){
  console.log(selectLevel(readline));
}

main();