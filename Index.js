// DOM Elements
const messageContainer = document.getElementById('over');
const close = document.getElementById('close');
const guessBox = document.getElementById('guessBoxContainer');
const Box = document.getElementById('box');
const count = document.getElementById('count');
const newGameButton = document.getElementById('newGame');
const winMsg = document.getElementById('win-msg');
const loseMsg = document.getElementById('lose-msg');
const Msg = document.getElementById('msg');

// Game State
let score = parseInt(localStorage.getItem('hngt2score')) || 0;
let correctColor;

// Initialize the game
initGame();

// Event Listeners
close.onclick = () => (messageContainer.style.display = 'none');
newGameButton.onclick = startNewGame;

// Functions

/**
 * Initialize the game
 */
function initGame() {
   count.innerHTML = score;
   const initialColors = generateColors();
   setTargetColor(initialColors);
   addButtons(initialColors);
}

/**
 * Generate an array of 6 random colors with varying opacity
 */
function generateColors() {
   const r = Math.floor(Math.random() * 255);
   const g = Math.floor(Math.random() * 255);
   const b = Math.floor(Math.random() * 255);
   return Array.from({ length: 6 }, (_, i) => `rgba(${r}, ${g}, ${b}, ${(i + 1) * 0.17})`);
}

/**
 * Set the target color and update the box
 */
function setTargetColor(colors) {
   correctColor = colors[Math.floor(Math.random() * 6)];
   Box.style.backgroundColor = correctColor;
}

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

/**
 * Add buttons with colors to the guess box
 */
function addButtons(colors) {
   guessBox.innerHTML = ''; // Clear existing buttons
   colors.forEach((color) => {
      const button = document.createElement('button');
      button.className = 'guessbox';
      button.style.backgroundColor = color;
      button.setAttribute('test-id', 'colorOption');
      button.onclick = () => handleGuess(color);
      guessBox.appendChild(button);
   });
}

/**
 * Handle user's guess
 */
function handleGuess(selectedColor) {
   if (selectedColor === correctColor) {
      score += 1;
      localStorage.setItem('hngt2score', score);
      count.innerHTML = score;
      showMessage('win');
      const newColors = generateColors();
      setTargetColor(newColors);
      addButtons(shuffleArray(newColors));
   } else {
      showMessage('lose');
      score -= 2;
      localStorage.setItem('hngt2score', score);
      count.innerHTML = score;
   }
}

/**
 * Show win/lose message
 */
function showMessage(type) {
   if (type === 'win') {
      winMsg.style.display = 'flex';
      loseMsg.style.display = 'none';
      Msg.style.backgroundColor = '#1B7D4F';
   } else {
      winMsg.style.display = 'none';
      loseMsg.style.display = 'flex';
      Msg.style.backgroundColor = '#8B0000';
   }
   Msg.style.left = '3%';
   setTimeout(() => {
      Msg.style.left = '-100%';
   }, 1000);
}

/**
 * Start a new game
 */
function startNewGame() {
   score = 0;
   localStorage.setItem('hngt2score', score);
   count.innerHTML = score;
   const newColors = generateColors();
   setTargetColor(newColors);
   addButtons(shuffleArray(newColors));
}
