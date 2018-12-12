const { startGame } = require('./src/lib.js');
const readline = require('readline-sync').question;
const exit = process.exit;
const main = function(){
  console.log(startGame(readline, exit));
}

main();