
// let gameBoard = (function Gameboard() {
//   const board = [[],[],[],[],[],[],[],[],[]];
//   return board
// })()

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function bernoulli(){
  randomNumber = getRandomInt(2)
  return randomNumber == 0 ? 'X' : 'O'
}

function randomBoardGame(){
  let board = [];
  for (let i=0; i<9; i++){
    board.push(bernoulli());
  }
  return board
}

function overwriteBoard(newBoard){
  for (let i = 0; i<htmlBoard.children.length; i++) {
    // langs alle childnodes van het htmlDIV en overwrite met het nieuwe board
    htmlBoard.children[i].innerHTML = newBoard[i];
  }
}
const testGameBoard = randomBoardGame();
console.log(testGameBoard)


// alle html haakpunten
let htmlBoard = document.querySelector('.gameboard');

overwriteBoard(testGameBoard)


