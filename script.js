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
    players[i].score = 0;
    document.querySelector(`.player-${i}-display`).textContent = players[i].score;
  }
};
init();

// event listeners
scoreSelectUI.addEventListener('change', (e) => {
  scoreSelect = parseInt(e.target.value);
});

// choose players btn event listener
choosePlayersBtn.addEventListener('click', (e) => {
  // prevent the form from reloadind the page
  e.preventDefault();

  // clean childs inside dom element after each click
  choosePlayersNameContainer.innerHTML = '';

  // get the number of players from the input
  const numOfPlayers = parseInt(selectPlayersInput.value);

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
      const btn = `<button class="start-game-btn">Start Game</button>`;
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
        <p class="player-${i}-name">${name}</p> <span class="player-${i}-display">0</span>
        <button class="player-${i}-btn btn" data-id="${i}">+1 ${name}</button>   
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

  const resetBtnHTML = `
    <div class="reset-game">
      <button class="play-again-btn">Play Again</button>
      <button class="reset-btn">Reset</button>
    </div>
  `;
  playersContainer.insertAdjacentHTML('beforeend', resetBtnHTML);

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
    document.querySelector(`.player-${clickedBtnID}-display`).style.color = "green";

    for (let i = 0; i < players.length; i++) {
      players[i].button.disabled = true;

      if (players[i].winner === true) {
        alert(`${players[i].name} is the winner!`);
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

  scoreSelectContainer.style.display = "block";
  playersSelectContainer.style.display = "block";
  choosePlayersNameContainer.style.display = "block";
  startGameBtn.style.display = "block";
});