/*----- constants -----*/

// create an array of words
const WORD_BANK = ['flower', 'garden', 'stamen', 'petal', 'leaf', 'pollen', 'stem', 'thorn', 'root', 'blossom', 'rose', 'orchid', 'daisy', 'sunflower', 'lilac', 'lavender', 'tulip', 'lily', 'peony', 'gardenia', 'carnation', 'dahlia', 'pansy', 'azalea', 'geranium', 'snapdragon', 'iris', 'poppy', 'daffodil', 'petunia', 'violet', 'hibiscus', 'plumeria'];
// const WORD_BANK = [
//     ['f', 'l', 'o', 'w', 'e', 'r'], 
//     ['s', 't', 'a', 'i', 'r', 's'],
// ];

// const MAX_GUESSES = 5

// letters allowed to use
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// holds flowers in diff states of decay's images
const DECAYED_FLOWERS = []

/*----- app's state (variables) -----*/

// let currentWord = ['f', 'l', 'o', 'w', 'e', 'r']

// pick a random word from array
let secretWord

// setup array to show # of empty spaces per word '_' (arr.length)
let lengthOfWord

// variable that holds guess from keyboard
let currentGuess

// variable that tracks # of wrong guesses
let numOfWrongGuesses

// variable that holds flower img's current state of decay in array 

// (icebox: hints)

/*----- cached element references -----*/

// keyboard
const keyboard = document.getElementById('keyboard')

// current guessed letter
const currentGuessEl = document.getElementById('current-guess')

// display screen (icebox: update display to say `You have made ${# of wrong guesses}` or `you have `${x}` amount of guesses left`)

// image of flower with petals being individual divs

/*----- event listeners -----*/

// allows keyboard to be clicked
keyboard.addEventListener('click', handleClick)

// check to see if guessed letter is in word (indexOf? or array.Some?)
// if guess === true then update '_' to correct letter
// otherwise, run guessed wrong function  

// if no more '_', then win game function

// if more than 6 wrong guesses made, game over function

// stop letter from being double clicked (icebox:change button color)

// reset button

/*----- functions -----*/

// guessed wrong function, updates numOfWrongGuesses variable, changes image to next in image array, makes wrong guess unclickable

// game over function, update display "you lose, press reset game to try again", stop keyboard from being clicked again (.removeEventListener for keyboard)

// win game function, update display "you win! press reset to play again", stop keyboard from being pressed again (.removeEventListener for keyboard)


// sets game up to starting state
function initGame() {
    secretWord = getSecretWord()
    numOfWrongGuesses = 0
    currentGuess = ''
    generateKeyboard()
}
function getSecretWord() {
    const randomInt = Math.floor(Math.random() * WORD_BANK.length)
    return WORD_BANK[randomInt]
}

function generateKeyboard() {
    // GENERATES THE LETTER KEYS
    ALLOWED_LETTERS.forEach(function (letter) {
        const cell = document.createElement('div')
        cell.innerText = letter.toUpperCase()
        cell.classList.add('cell')
        keyboard.appendChild(cell)
    })
}

function handleClick(evt) {
    if (evt.target.innerText === "DELETE") {
        handleDelete()
        render()
    } else if (evt.target.innerText === "SUBMIT") {
        console.log('SUBMIT was clicked')
    } else {
        updateCurrentGuess(evt.target.innerText)
        render()
    }
}

function updateCurrentGuess(letter) {
    currentGuess += letter
    console.log(currentGuess)
}

function handleDelete() {
    currentGuess = currentGuess.slice(0, currentGuess.length - 1)
    console.log(currentGuess)
}

function render() {
    while (currentGuessEl.firstElementChild) {
        currentGuessEl.removeChild(currentGuessEl.firstElementChild)
    }
    const currentGuessArr = currentGuess.split('')
    currentGuessArr.forEach(function (letter) {
        const cell = document.createElement('div')
        cell.innerText = letter
        cell.classList.add('cell')
        currentGuessEl.appendChild(cell)
    })
}

initGame() 