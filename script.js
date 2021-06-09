// variables
const selectPlayersInput = document.querySelector('.select-players-input');
const choosePlayersBtn = document.querySelector('.choose-players-btn');
const choosePlayersNameContainer = document.querySelector('.choose-players-name-container');
const playersContainer = document.querySelector('.players-container');

let totalPlayers;
// functions


// event listeners

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
          <label class="player-${i}">Choose name for Player ${i}</label>
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
  console.log('clicked');

  // get all the players inputs
  totalPlayers = document.querySelectorAll('.total-players');
  console.log(totalPlayers);

  // create an empty array what will store each player as an object
  let players = [];

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
        <button class="player-${i}-btn">+1 ${name}</button>
    `

    // add players to DOM
    playersContainer.insertAdjacentHTML('beforeend', html);

    
    // store each player in an object
    players[i] = {
      name: name,
      button: document.querySelector(`.player-${i}-btn`),
      score: 0,
      display: document.querySelector(`.player-${i}-display`)
    };
  };
  console.log(players);
});