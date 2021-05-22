'use strict';
//Element Dome;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
let current0El = document.querySelector('#current--0');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
let current1El = document.querySelector('#current--1');
let currentScore, activePlayer, score, playing;
//Sarting Parametre
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //En fonction du joueur actif on change la couleur du background
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Quand on clique sur le bouton roll-dice
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      //Quand le nombre affichée par le dé est different de 1 alors :
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Quand le dé affichée par le dé est égale a 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //On ajoute le currentScore au score final du joueur actif
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 5) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
