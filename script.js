'use strict'

// ?SELECTING DOM ELEMENTS
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const currentScore0 = document.querySelector('#current--0')
const currentScore1 = document.querySelector('#current--1')
const startGameBtn = document.querySelector('.start-game')

// ?STARTING CONDITIONS
let scores, currentScore, activePLayer, playing



// ?FUNCTIONS
const init = () => {
    scores = [0, 0]
    currentScore = 0
    activePLayer = 0
    playing = true

    //todo: RESET THE UI
    score0El.textContent = 0
    score1El.textContent = 0
    currentScore0.textContent = 0
    currentScore1.textContent = 0

    diceEl.classList.add('hidden')
    player0.classList.add('player--active')
    player1.classList.remove('player--active')
    player1.classList.remove('player--winner')
    player0.classList.remove('player--winner')
}

init()

const swtichPlayer = () => {
    document.querySelector(`#current--${activePLayer}`).textContent = 0
    currentScore = 0
    activePLayer = activePLayer === 0 ? 1 : 0
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}

const startGame = () => {
    document.querySelector('.left').style.left = '-50%'
    document.querySelector('.right').style.left = '100%'
    startGameBtn.classList.add('hidden')
    setTimeout(() => {
        document.querySelector('.overlay').classList.add('hidden')
        document.querySelector('main').classList.remove('hidden')
        document.querySelector('.content h2').classList.add('hidden')

    }, 1000)
}

//*ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', () => {
    if (playing) {
        //todo: GENERATE A RANDOM DICE NUMBER FROM 1-6
        const dice = Math.floor(Math.random() * 6) + 1

        //todo: DISPLAY DICE
        diceEl.classList.remove('hidden')
        diceEl.setAttribute('src', `img/dice-${dice}.png`)

        //todo: check for rolled 1
        if (dice !== 1) {
            //todo: ADD DICE TO THE CURRENT SCORE
            currentScore += dice
            document.querySelector(`#current--${activePLayer}`).textContent = currentScore

        }
        else {
            //todo: SWITCH TO NEXT PLAYER
            swtichPlayer()

        }
    }
})

//*HOLDING THE SCORE
btnHold.addEventListener('click', () => {
    if (playing) {
        //todo: ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
        scores[activePLayer] += currentScore
        document.querySelector(`#score--${activePLayer}`).textContent = scores[activePLayer]


        //todo: CHECK IF SCORE IS >= 100
        if (scores[activePLayer] >= 100) {
            //todo: FINISH THE GAME
            playing = false
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePLayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePLayer}`).classList.remove('player--active')
        }
        else {
            //todo: SWITCH TO THE NEXT PLAYER
            swtichPlayer()

        }
    }
})

//* RESETTING THE GAME
btnNew.addEventListener('click', init)

//* START THE GAME FOR THE FIRST TIME AFTER PAGE RELOAD
startGameBtn.addEventListener('click', startGame)
window.addEventListener('keyup', e => {
    if (e.key === 'Enter') startGame()
})