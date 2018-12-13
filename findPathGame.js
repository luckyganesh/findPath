const { startGame } = require('./src/lib.js');
const readline = require('readline-sync').question;
const exit = process.exit;
const randomGenerator = function(length) {
  return Math.random()*length;
}

const main = function(){
  console.log(startGame(randomGenerator ,readline, exit));
}

main();