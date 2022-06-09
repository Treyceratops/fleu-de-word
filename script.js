/*----- constants -----*/

// defines letters allowed to be used
const ALLOWED_LETTERS = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
['z', 'x', 'c', 'v', 'b', 'n', 'm']];

// defines an array of words
const WORD_BANK = ['FLOWER', 'GARDEN', 'STAMEN', 'PETAL', 'LEAF', 'POLLEN', 'STEM', 'THORN', 'ROOT', 'BLOSSOM', 'ROSE', 'ORCHID', 'DAISY', 'SUNFLOWER', 'LILAC', 'LAVENDER', 'TULIP', 'LILY', 'PEONY', 'GARDENIA', 'CARNATION', 'DAHLIA', 'PANSY', 'AZALEA', 'GERANIUM', 'SNAPDRAGON', 'IRIS', 'POPPY', 'DAFFODIL', 'PETUNIA', 'VIOLET', 'HIBISCUS', 'PLUMERIA'];

// defines flowers in diff states of decay's images
const DECAYED_FLOWERS = ['https://i.imgur.com/sSlpUiV.jpg?2', 'https://i.imgur.com/r8SL3dO.jpg?1', 'https://i.imgur.com/0v8IfiF.jpg?1', 'https://i.imgur.com/bft2YiS.jpg?2', 'https://i.imgur.com/mT7c7QG.jpg?2', 'https://i.imgur.com/hNeSeqR.jpg?2'];

// defines the most incorrect guesses that can be made
const MAX_WRONG_GUESSES = 5

/*----- app's state (variables) -----*/

// holds variable to pick a random word from array
let secretWord;

// holds array to show # of empty spaces per word
let lengthOfWord;

// holds variable of current guessed letter
let currentGuess;

// holds variable that tracks # of wrong guesses
let currWrongGuesses;

// holds variable as true or false depending on whether current guess is in secretWord
let includedLetter;

// holds variables of correctly guessed letters
let correctLetters = [];

// holds variables of incorrectly guessed letters
let incorrectLetters = [];

/*----- cached element references -----*/

// gets display screen from DOM 
const displayScreen = document.getElementById('displayScreen')

// gets reset button from DOM
const resetButton = document.getElementById('reset-button');

// gets image div from DOM
const roses = document.getElementById('roses');

// gets keyboard rows from DOM
const keyboard1 = document.getElementById('keyboard1');
const keyboard2 = document.getElementById('keyboard2');
const keyboard3 = document.getElementById('keyboard3');

// gets current guessed word div from DOM
const guessDiv = document.getElementById('current-guess')

/*----- event listeners -----*/

// listens to reset button when clicked, runs resetGame function
resetButton.addEventListener('click', resetGame);

/*----- functions -----*/

// listens to keyboard being clicked, runs handleClick function
function addKeyboard() {
    keyboard1.addEventListener('click', handleClick);
    keyboard2.addEventListener('click', handleClick);
    keyboard3.addEventListener('click', handleClick);
}
// removes event listener to keyboard
function removeKeyboard() {
    keyboard1.removeEventListener('click', handleClick);
    keyboard2.removeEventListener('click', handleClick);
    keyboard3.removeEventListener('click', handleClick);
}
// sets game up to starting state
function initGame() {
    roses.src = DECAYED_FLOWERS[0]
    secretWord = getSecretWord()
    currWrongGuesses = 0
    currentGuess = ''
    renderDisplay()
    correctLetters = []
    incorrectLetters = []
    generateKeyboard1()
    generateKeyboard2()
    generateKeyboard3()
    addKeyboard()
    generateSecretSpots()
}
// resets game to starting state
function resetGame() {
    roses.src = DECAYED_FLOWERS[0]
    secretWord = getSecretWord()
    currWrongGuesses = 0
    currentGuess = ''
    renderDisplay()
    correctLetters = []
    incorrectLetters = []
    addKeyboard()
    generateSecretSpots()
    document.querySelectorAll('.keyboard .cell').forEach(function (cell) {
        cell.style.color = 'white'
    })
}
// randomizes secret word
function getSecretWord() {
    const randomInt = Math.floor(Math.random() * WORD_BANK.length)
    return WORD_BANK[randomInt]
}
// generates top row of keyboard
function generateKeyboard1() {
    ALLOWED_LETTERS[0].forEach(function (letter) {
        const cell1 = document.createElement('div')
        cell1.innerText = letter.toUpperCase()
        cell1.classList.add('cell')
        keyboard1.appendChild(cell1)
    })
}
// generates middle row of keyboard
function generateKeyboard2() {
    ALLOWED_LETTERS[1].forEach(function (letter) {
        const cell2 = document.createElement('div')
        cell2.innerText = letter.toUpperCase()
        cell2.classList.add('cell')
        keyboard2.appendChild(cell2)
    })
}
// generates bottom row of keyboard
function generateKeyboard3() {
    ALLOWED_LETTERS[2].forEach(function (letter) {
        const cell3 = document.createElement('div')
        cell3.innerText = letter.toUpperCase()
        cell3.classList.add('cell')
        keyboard3.appendChild(cell3)
    })
}
// when keyboard is clicked, updates the inner text and runs updateCurrentGuess function with clicked letter
function handleClick(evt) {
    updateCurrentGuess(evt.target)
}
// stops keys from being clicked again, checks conditions of other functions
function updateCurrentGuess(cell) {
    currentGuess = cell.innerText
    if (correctLetters.some((letter) => letter === currentGuess) || incorrectLetters.some((letter) => letter === currentGuess)) {
        return
    }
    // correctLetters.some(function(letter){
    //     return letter === currentGuess
    // })
    checkForLetter()
    dealResults(cell)
    phaseFlower()
    winGame()
}
// generates cells for the secret word
function generateSecretSpots() {
    guessDiv.innerHTML = ''
    secretWord.split('').forEach(function (letter) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        guessDiv.appendChild(cell)
    })
}
// searches to see if current guess is in secret word
function checkForLetter() {
    includedLetter = secretWord.includes(currentGuess)
}
// sorts correct or incorrect guesses, changes key color, adds correct results to secret word
function dealResults(cell) {
    if (includedLetter === true) {
        cell.style.color = 'green'
        correctLetters.push(currentGuess)
        addResults(currentGuess)
    } else {
        currWrongGuesses += 1
        cell.style.color = 'red'
        incorrectLetters.push(currentGuess)
    }
}
// adds letter to word when correctly guessed
function addResults(guessedLetter) {
    secretWord.split('').forEach((currLetter, idx) => {
        if (currLetter === guessedLetter) {
            guessDiv.childNodes[idx].innerHTML = guessedLetter
        }
    })
}
// changes image based on incorrect guesses
function phaseFlower() {
    roses.src = DECAYED_FLOWERS[currWrongGuesses]
    renderDisplay()
    loseGame()
}
// in event of a won game, deactivates keyboard & displays win
function winGame() {
    let filledCells = true
    for (let idx = 0; idx < guessDiv.childNodes.length; idx++) {
        if (guessDiv.childNodes[idx].innerText === '') {
            filledCells = false
        }
    }
    if (filledCells === true) {
        removeKeyboard()
        displayScreen.innerText = 'Felicitations! We have a winner!'
    }
}
// in event of a lost game, deactivates keyboard & displays loss
function loseGame() {
    if (currWrongGuesses === 5) {
        removeKeyboard()
        displayScreen.innerText = 'Fin... Play again?'
    }
}
// displays length of secret word and guesses left
function renderDisplay() {
    displayScreen.innerText = `Make a guess! Your word is ${secretWord.length} letters long, you have ${5 - currWrongGuesses} guesses left.`
}
initGame() 