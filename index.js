const CHOICES = ['rock', 'paper', 'scissors'];
const EMOJI = { rock: '✊', paper: '✋', scissors: '✌️' };
const WINNING_SCORE = 5;

let humanScore = 0;
let computerScore = 0;
let round = 0;

// Getting Computer Choice
function getComputerChoice() {
  const computerChoice = Math.floor(Math.random() * 3); // gives 0, 1, or 2
  return CHOICES[computerChoice];
}

// Logic to play a single round: returns "win", "lose" or "tie"
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return 'tie';
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'paper' && computerChoice === 'rock') ||
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

/* ---------- UI ---------- */
const humanScoreEl = document.getElementById('human-score');
const computerScoreEl = document.getElementById('computer-score');
const humanPickEl = document.getElementById('human-pick');
const computerPickEl = document.getElementById('computer-pick');
const messageEl = document.getElementById('message');
const historyEl = document.getElementById('history');
const choiceButtons = document.querySelectorAll('.choice');
const dialog = document.getElementById('result-dialog');

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

function bump(el) {
  el.classList.remove('bump');
  void el.offsetWidth; // restart the animation
  el.classList.add('bump');
}

function handleChoice(humanChoice) {
  if (dialog.open) return;

  const computerChoice = getComputerChoice();
  const result = playRound(humanChoice, computerChoice);
  round++;

  humanPickEl.textContent = EMOJI[humanChoice];
  computerPickEl.textContent = EMOJI[computerChoice];
  bump(humanPickEl);
  bump(computerPickEl);

  let text;
  if (result === 'win') {
    humanScore++;
    bump(humanScoreEl);
    text = `You win! ${capitalize(humanChoice)} beats ${computerChoice}.`;
  } else if (result === 'lose') {
    computerScore++;
    bump(computerScoreEl);
    text = `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`;
  } else {
    text = `It's a tie! You both chose ${humanChoice}.`;
  }

  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
  messageEl.textContent = text;
  messageEl.className = `message ${result}`;

  const item = document.createElement('li');
  item.className = result;
  item.textContent = `Round ${round}: ${EMOJI[humanChoice]} vs ${EMOJI[computerChoice]} — ${result === 'tie' ? 'Tie' : result === 'win' ? 'You won' : 'Computer won'}`;
  historyEl.prepend(item);

  if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    showResult();
  }
}

function showResult() {
  const won = humanScore > computerScore;
  document.getElementById('result-emoji').textContent = won ? '🏆' : '🤖';
  document.getElementById('result-title').textContent = won ? 'You win the game!' : 'Computer wins the game!';
  document.getElementById('result-text').textContent =
    `Final score ${humanScore} – ${computerScore} after ${round} rounds.`;
  choiceButtons.forEach((b) => { b.disabled = true; });
  setTimeout(() => dialog.showModal(), 400);
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  round = 0;
  humanScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  humanPickEl.textContent = '❔';
  computerPickEl.textContent = '❔';
  messageEl.textContent = 'Choose your move to start.';
  messageEl.className = 'message';
  historyEl.innerHTML = '';
  choiceButtons.forEach((b) => { b.disabled = false; });
  if (dialog.open) dialog.close();
}

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => handleChoice(button.dataset.choice));
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const key = { r: 'rock', p: 'paper', s: 'scissors' }[e.key.toLowerCase()];
  if (key && !choiceButtons[0].disabled) handleChoice(key);
});

document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('play-again').addEventListener('click', resetGame);
dialog.addEventListener('cancel', resetGame);
