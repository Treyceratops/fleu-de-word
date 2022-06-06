/*----- constants -----*/

// create an array of words
// const WORD_BANK = [
//     ['f', 'l', 'o', 'w', 'e', 'r'], 
//     ['s', 't', 'a', 'i', 'r', 's'],
// ];

// const MAX_GUESSES = 6

const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/*----- app's state (variables) -----*/

// let currentWord = ['f', 'l', 'o', 'w', 'e', 'r']

// pick a random word from array

// setup array to show # of empty spaces per word '_' (arr.length)
// let lengthOfWord;

// variable that holds guess from keyboard

// variable that tracks # of wrong guesses

// variable that holds petal state in array of remaining petals so they dont get double fadedout

// (icebox: hints)

/*----- cached element references -----*/

// keyboard

// display screen (icebox: update display to say `You have made ${# of wrong guesses}` or `you have `${x}` amount of guesses left`)

// image of flower with petals being individual divs

/*----- event listeners -----*/

// check to see if guessed letter is in word (indexOf? or array.Some?)
// if guess === true then update '_' to correct letter
// otherwise, run guessed wrong function  

// if no more '_', then win game function

// if more than 6 wrong guesses made, game over function

// stop letter from being double clicked (icebox:change button color)

// reset button

/*----- functions -----*/

// guessed wrong function, updates wrong guess variable, fades out a petal at random, updates petal state variable

// game over function, update display "you lose, press reset game to try again", stop keyboard from being clicked again (.removeEventListener for keyboard)

// win game function, update display "you win! press reset to play again", stop keyboard from being pressed again (.removeEventListener for keyboard)


// initGame() (addEventListener to keyboard)