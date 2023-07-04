
// let gameBoard = (function Gameboard() {
//   const board = [[],[],[],[],[],[],[],[],[]];
//   return board
// })()

function getRandomInt(max=2) {
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


function alternateTurns(last_player){
  let current_player = 'X'
  let otherplayer = 'O' 
  current_player = (current_player == last_player) ? otherplayer : current_player
  return current_player
}


function overwriteBoard(newBoard){
  for (let i = 0; i<htmlBoard.children.length; i++) {
    // langs alle childnodes van het htmlDIV en overwrite met het nieuwe board
    htmlBoard.children[i].innerHTML = newBoard[i];
  }
}
// const testGameBoard = randomBoardGame();
// console.log(testGameBoard)
// overwriteBoard()


// alle html haakpunten
let htmlBoard = document.querySelector('.gameboard');
let allCells = document.querySelectorAll('.board-cell');
// let num_clicks = 0;

// eventlisteners

// htmlBoard.addEventListener('mousedown', (eventData)=>{
//   if (eventData.button === 0) {
//     num_clicks++;
//     console.log(num_clicks) 
//   };
// });

let last_move = 'I';

allCells.forEach((cell)=>{
  cell.addEventListener('click', ()=>{

    // if statement for prevention of overwriting already taken cells
    if (cell.innerHTML === ''){
      cell.innerHTML = alternateTurns(last_move);
      last_move = alternateTurns(last_move);
    } else{
      alert('Already confiscated')
    }
    
  });
});


