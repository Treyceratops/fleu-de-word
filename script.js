/*----- constants -----*/

const ALLOWED_LETTERS = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
['z', 'x', 'c', 'v', 'b', 'n', 'm']];

const WORD_BANK = ['FLOWER', 'GARDEN', 'STAMEN', 'PETAL', 'LEAF', 'POLLEN', 'STEM', 'THORN', 'ROOT', 'BLOSSOM', 'ROSE', 'ORCHID', 'DAISY', 'SUNFLOWER', 'LILAC', 'LAVENDER', 'TULIP', 'LILY', 'PEONY', 'GARDENIA', 'CARNATION', 'DAHLIA', 'PANSY', 'AZALEA', 'GERANIUM', 'SNAPDRAGON', 'IRIS', 'POPPY', 'DAFFODIL', 'PETUNIA', 'VIOLET', 'HIBISCUS', 'PLUMERIA'];

const DECAYED_FLOWERS = ['https://i.imgur.com/sSlpUiV.jpg?2', 'https://i.imgur.com/r8SL3dO.jpg?1', 'https://i.imgur.com/0v8IfiF.jpg?1', 'https://i.imgur.com/bft2YiS.jpg?2', 'https://i.imgur.com/mT7c7QG.jpg?2', 'https://i.imgur.com/hNeSeqR.jpg?2'];

const MAX_WRONG_GUESSES = 5

/*----- app's state (variables) -----*/

let secretWord;

let lengthOfWord;

let currentGuess;

let currWrongGuesses;

let includedLetter;

let correctLetters = [];

let incorrectLetters = [];

/*----- cached element references -----*/

const displayScreen = document.getElementById('displayScreen')

const resetButton = document.getElementById('reset-button');

const roses = document.getElementById('roses');

const keyboard1 = document.getElementById('keyboard1');
const keyboard2 = document.getElementById('keyboard2');
const keyboard3 = document.getElementById('keyboard3');

const guessDiv = document.getElementById('current-guess')

/*----- event listeners -----*/

resetButton.addEventListener('click', resetGame);

/*----- functions -----*/

function addKeyboard() {
    keyboard1.addEventListener('click', handleClick);
    keyboard2.addEventListener('click', handleClick);
    keyboard3.addEventListener('click', handleClick);
}
function removeKeyboard() {
    keyboard1.removeEventListener('click', handleClick);
    keyboard2.removeEventListener('click', handleClick);
    keyboard3.removeEventListener('click', handleClick);
}
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
function getSecretWord() {
    const randomInt = Math.floor(Math.random() * WORD_BANK.length)
    return WORD_BANK[randomInt]
}
function generateKeyboard1() {
    ALLOWED_LETTERS[0].forEach(function (letter) {
        const cell1 = document.createElement('div')
        cell1.innerText = letter.toUpperCase()
        cell1.classList.add('cell')
        keyboard1.appendChild(cell1)
    })
}
function generateKeyboard2() {
    ALLOWED_LETTERS[1].forEach(function (letter) {
        const cell2 = document.createElement('div')
        cell2.innerText = letter.toUpperCase()
        cell2.classList.add('cell')
        keyboard2.appendChild(cell2)
    })
}
function generateKeyboard3() {
    ALLOWED_LETTERS[2].forEach(function (letter) {
        const cell3 = document.createElement('div')
        cell3.innerText = letter.toUpperCase()
        cell3.classList.add('cell')
        keyboard3.appendChild(cell3)
    })
}
function handleClick(evt) {
    updateCurrentGuess(evt.target)
}
function updateCurrentGuess(cell) {
    currentGuess = cell.innerText
    if (correctLetters.some((letter) => letter === currentGuess) || incorrectLetters.some((letter) => letter === currentGuess)) {
        return
    }
    checkForLetter()
    dealResults(cell)
    phaseFlower()
    winGame()
}
function generateSecretSpots() {
    guessDiv.innerHTML = ''
    secretWord.split('').forEach(function () {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        guessDiv.appendChild(cell)
    })
}
function checkForLetter() {
    includedLetter = secretWord.includes(currentGuess)
}
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
function addResults(guessedLetter) {
    secretWord.split('').forEach((currLetter, idx) => {
        if (currLetter === guessedLetter) {
            guessDiv.childNodes[idx].innerHTML = guessedLetter
        }
    })
}
function phaseFlower() {
    roses.src = DECAYED_FLOWERS[currWrongGuesses]
    renderDisplay()
    loseGame()
}
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
function loseGame() {
    if (currWrongGuesses === 5) {
        removeKeyboard()
        displayScreen.innerText = 'Fin... Play again?'
    }
}
function renderDisplay() {
    displayScreen.innerText = `Make a guess! Your word is ${secretWord.length} letters long, you have ${5 - currWrongGuesses} guesses left.`
}
initGame() 