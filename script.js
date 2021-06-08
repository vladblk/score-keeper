const player1ScoreUI = document.querySelector('.player-1-score');
const player2ScoreUI = document.querySelector('.player-2-score');
const selectScore = document.querySelector('#score');
const player1Btn = document.querySelector('.player-1-btn');
const player2Btn = document.querySelector('.player-2-btn');
const resetBtn = document.querySelector('.reset-btn');

console.log(selectScore.value);

let totalPlayer1Score = 0;
let totalPlayer2Score = 0;
let playingTo = Number(selectScore.value);

selectScore.addEventListener('change', (e) => {
  console.log(e.target.value);

  playingTo = Number(e.target.value);
});

const checkScore = () => {
  if (playingTo === totalPlayer1Score) {
    player1ScoreUI.style.color = "green";
    player2ScoreUI.style.color = "red";
  
    player1Btn.disabled = true;
    player2Btn.disabled = true;

    console.log("Player 1 WON!");
  }
  if (playingTo === totalPlayer2Score) {
    player2ScoreUI.style.color = "green";
    player1ScoreUI.style.color = "red";
  
    player1Btn.disabled = true;
    player2Btn.disabled = true;

    console.log("Player 2 WON!");
  }
}

const init = () => {
  totalPlayer1Score = 0;
  totalPlayer2Score = 0;
  player1ScoreUI.textContent = 0;
  player2ScoreUI.textContent = 0;

  player2ScoreUI.style.color = "#000";
  player1ScoreUI.style.color = "#000";

  player1Btn.disabled = false;
  player2Btn.disabled = false;
}
init();

player1Btn.addEventListener('click', () => {
  totalPlayer1Score += 1;
  player1ScoreUI.textContent = totalPlayer1Score;

  console.log(totalPlayer1Score);

  checkScore();
});

player2Btn.addEventListener('click', () => {
  totalPlayer2Score += 1;
  player2ScoreUI.textContent = totalPlayer2Score;

  console.log(totalPlayer2Score);

  checkScore();
});

resetBtn.addEventListener('click', init);