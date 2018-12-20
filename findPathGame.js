const chalkRainbow = require('chalk-rainbow');
const readline = require('readline-sync').question;
const exit = process.exit;
const randomGenerator = function(length) {
  return Math.random()*length;
}
const { startGame } = require('./src/lib.js');
const main = function(){
  console.log(chalkRainbow(startGame(randomGenerator ,readline, exit)));
}

main();
