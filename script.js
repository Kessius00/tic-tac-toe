
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
let scoreboard = document.querySelector('.scoreboard');
let title = document.querySelector('.title');
let x_cells = [];
let o_cells = [];
let form = document.querySelector('#formPopStart');
let winPopUp = document.querySelector('.popUpWin');

winPopUp.style.display = 'none';



// Make board non-interactable if names are yet to be put in
htmlBoard.style.display = 'none';

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let firstPlayerName = document.querySelector('#firstPlayer').value;
  let secondPlayerName = document.querySelector('#secondPlayer').value;
  window.firstPlayerName = firstPlayerName;
  window.secondPlayerName = secondPlayerName;


  form.style.display = 'none'

  htmlBoard.style.display = '';
  title.innerHTML = firstPlayerName +' vs ' + secondPlayerName;

  
});

let last_move = 'I';

function wrongClick(c){
  c.classList.add("wrong-click");
  scoreboard.innerHTML = 'ALREADY CONFISCATED!'

  setTimeout(function(){
    c.classList.remove("wrong-click");
    scoreboard.innerHTML = ''

  }, 800);
  // alert('Already confiscated');
}

function checkWinner(winlist){
  const winnerCombination = [[1,2,3], [4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  for (let i = 0; i<winnerCombination.length; i++) {
    // langs alle childnodes van het htmlDIV en overwrite met het nieuwe board
    let numbersToFind = winnerCombination[i];
    let allNumFound = numbersToFind.every(number => winlist.includes(number));
    if (allNumFound){
      return 1
    } 
  }
  return 0
}

function winnerCongrats(winner){

  if (winner == 'X'){
    congrats.innerHTML= `${firstPlayerName} wins!`;
  } else{
    congrats.innerHTML= `${secondPlayerName} wins!`;
  }

  winPopUp.style.display = '';

}

let congrats = document.querySelector('.congratulations');


allCells.forEach((cell)=>{
  cell.addEventListener('click', ()=>{

    // if statement for prevention of overwriting already taken cells
    if (cell.innerHTML === ''){
      cell.innerHTML = alternateTurns(last_move);
      last_move = alternateTurns(last_move);
      // also check if any winners are declared 
      
      if (last_move == 'X'){
        x_cells.push(parseInt(cell.getAttribute('value')));
        if(checkWinner(x_cells)){
          // scoreboard.innerHTML='X WINS!';
          let winner = 'X';
          window.winner = winner;
          winnerCongrats(winner);
          htmlBoard.style.pointerEvents = 'none';



        }
      } else{
        o_cells.push(parseInt(cell.getAttribute('value')));
        if(checkWinner(o_cells)){
          // scoreboard.innerHTML='O WINS!';
          let winner = 'O';
          window.winner = winner;
          winnerCongrats(winner);

          htmlBoard.style.pointerEvents = 'none';



        }
      }
      

    } else{
      wrongClick(cell);


    }
    
  });
});

function restart(){
  winPopUp.style.display = 'none';
  htmlBoard.style.pointerEvents = '';
  last_move = winner;
  allCells.forEach((cell)=>{
    cell.innerHTML = '';
  });
  x_cells = [];
  o_cells = [];

}

const restartButton = document.querySelector('#restartButton');

restartButton.addEventListener('click', (e)=>{
  restart();
});


