// variables
const selectPlayersInput = document.querySelector('.select-players-input');
const choosePlayersBtn = document.querySelector('.choose-players-btn');
const playAgainBtn = document.querySelector('.play-again-btn');
const startGameBtn = document.querySelector('.start-game-btn');

const choosePlayersNameContainer = document.querySelector('.choose-players-name-container');
const playersContainer = document.querySelector('.players-container');
const playersSelectContainer = document.querySelector('.players-select-container');
const scoreSelectContainer = document.querySelector('.score-select-container');

const scoreSelectUI = document.querySelector('#score-select');
const playersSelectUI = document.querySelector('#players-select');

let totalPlayers;
// create an empty array what will store each player as an object
let players = [];
let scoreSelect = parseInt(scoreSelectUI.value);


// functions
const removeAllChildNodes = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};


const init = () => {
  for (let i = 0; i < players.length; i++) {
    document.querySelector(`.player-${i}-display`).style.color = "black";
    players[i].winner = false;
    players[i].button.disabled = false;
    players[i].button.classList.remove('disabled');
    players[i].score = 0;
    players[i].button.parentElement.classList.remove('winner');
    document.querySelector(`.player-${i}-display`).textContent = players[i].score;
  }
};
init();

// event listeners
scoreSelectUI.addEventListener('change', (e) => {
  scoreSelect = parseInt(e.target.value);
});

// choose players btn event listener
playersSelectUI.addEventListener('change', (e) => {
  // prevent the form from reloadind the page
  e.preventDefault();

  // clean childs inside dom element after each click
  choosePlayersNameContainer.innerHTML = '';

  // get the number of players from the input
  const numOfPlayers = parseInt(playersSelectUI.value);

  if (numOfPlayers) {
    if (numOfPlayers < 11) {
      // loop over the number of players selected above
      for (let i = 0; i < numOfPlayers; i++) {

        // for each num of players, create html
        const html = `
        <div>
          <label class="player-${i}">Choose name for Player ${i+1}</label>
          <input type="text" class="player-${i}-input total-players" />
        </div>
      `
        // add the option for each player to choose their names to the dom
        choosePlayersNameContainer.insertAdjacentHTML('beforeend', html);
      }
      // create button and add it to the dom
      const btn = `<button class="start-game-btn btn">Start Game</button>`;
      choosePlayersNameContainer.insertAdjacentHTML('beforeend', btn);  
    }
  }
});

// adding event listener to start button after the page loaded
$(document).on('click', '.start-game-btn', function() {
  playersSelectContainer.style.display = "none";


  // get all the players inputs
  totalPlayers = document.querySelectorAll('.total-players');
  console.log(totalPlayers);

  // loop through every player
  for(let i = 0; i < totalPlayers.length; i++) {
    // get his name if he chose to select a name, else put a default name
    let name;
    if (totalPlayers[i].value === '') {
      name = `Player ${i + 1}`;
    } else {
      name = `${totalPlayers[i].value}`;
    }

    const html = `
        <div class="player-container">
          <p class="player-${i}-name">${name}</p> <span class="player-${i}-display">0</span>
          <button class="player-${i}-btn btn" data-id="${i}">+1 ${name}</button>   
        </div>
    `

    // add players to DOM
    playersContainer.insertAdjacentHTML('beforeend', html);

    
    // store each player in an object
    players[i] = {
      name: name,
      button: document.querySelector(`.player-${i}-btn`),
      score: 0,
      display: document.querySelector(`.player-${i}-display`),
      winner: false
    };
  };

  const playResetBtns = `
    <div class="reset-game">
      <button class="play-again-btn btn">Play Again</button>
      <button class="reset-btn btn">Reset</button>
    </div>
  `;
  playersContainer.insertAdjacentHTML('beforeend', playResetBtns);

  console.log(players);

  choosePlayersNameContainer.style.display = "none";
  startGameBtn.style.display = "none";
  
});


playersContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn')) return;

  const clickedBtnID = e.target.dataset.id;

  players[clickedBtnID].score += 1;
  document.querySelector(`.player-${clickedBtnID}-display`).textContent = players[clickedBtnID].score;

  if (players[clickedBtnID].score === scoreSelect) {
    players[clickedBtnID].winner = true;

    for (let i = 0; i < players.length; i++) {
      players[i].button.disabled = true;
      players[i].button.classList.add('disabled');
      players[i].button.style.transition = 'none';

      if (players[i].winner === true) {
        const playerContainer = document.querySelector(`.player-${clickedBtnID}-display`).parentElement;
        playerContainer.classList.add('winner');
      }
    }
  }
});


$(document).on('click', '.play-again-btn', function() {
  init();
});

$(document).on('click', '.reset-btn', function() {
  players = [];

  removeAllChildNodes(playersContainer);

  scoreSelectContainer.style.display = "flex";
  playersSelectContainer.style.display = "flex";
  choosePlayersNameContainer.style.display = "flex";
  startGameBtn.style.display = "flex";
});