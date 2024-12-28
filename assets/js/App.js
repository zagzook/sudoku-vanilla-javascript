import { CONSTANT } from './constant.js'
import { createCalendar } from './Calendar.js'
import { createGrid } from './CreateGridsDiv.js'
import { dailySudokuGenerator, proSudokuGenerator } from './sudoku.js'

// div elements
const DARK_MODE_TOGGLE = document.querySelector('#dark-mode-toggle')
const META_NAME_THEME_COLOR = document.querySelector('meta[name="theme-color"]')
const BODY_ELEMENT = document.body
const DAILY_PICK_DATE = document.querySelector('#daily-game-date')
const CALENDAR_PICK_DATE = document.querySelector('.date p')
const NAME_INPUT = document.querySelector('#input-name')
const EDITION_NUMBER = document.querySelector('#edition-number')
const DAILY_SUDOKU_GRID = document.querySelector('#daily-sudoku-grid')
const PRO_SUDOKU_GRID = document.querySelector('#pro-sudoku-grid')
const DAILY_GAME_LEVEL = document.querySelector('#daily-game-level > span')
const PRO_GAME_LEVEL = document.querySelector('#pro-game-level > span')
const DAILY_GAME_TIMER = document.querySelector('#daily-game-time')
const PRO_GAME_TIMER = document.querySelector('#pro-game-time')
const RESULT_TIME = document.querySelector('#result-time')
const GAME_ERROR = document.querySelector('#game-err')
const DAILY_NUMBERS_KEY = document.querySelector('.daily-numbers')
const PRO_NUMBERS_KEY = document.querySelector('.pro-numbers')
const GRID_TITLE = document.querySelector('#grid-type-title')
const PUZZLE_NUMBER = document.querySelector('#puzzle-number')
const FOOTER = document.querySelector('.footer-bottom p')
const DAILY_HOME = document.querySelector('#daily-back-to-menu')
const PRO_HOME = document.querySelector('#pro-back-to-menu')

// screens
const START_SCREEN = document.querySelector('#start-screen')
const DAILY_GAME_SCREEN = document.querySelector('#daily-game-screen')
const PRO_GAME_SCREEN = document.querySelector('#pro-game-screen')
const PAUSE_SCREEN = document.querySelector('#pause-screen')
const RESULT_SCREEN = document.querySelector('#result-screen')
const ERROR_SCREEN = document.querySelector('#error-screen')
const CALENDAR_SCREEN = document.querySelector('#calendar-screen')

// buttons
const BTN_CONTINUE = document.querySelector('#btn-continue')
const BTN_PLAY = document.querySelector('#btn-play')
const BTN_LEVEL = document.querySelector('#btn-level')
const DAILY_BTN_PAUSE = document.querySelector('#daily-pause-game')
const PRO_BTN_PAUSE = document.querySelector('#pro-pause-game')
const BTN_RESUME = document.querySelector('#btn-resume')
const BTN_NEW_GAME = document.querySelector('#btn-new-game')
const BTN_GAME_VERSION = document.querySelector('#btn-game-version')
const BTN_NEW_GAME_RESULTS = document.querySelector('#btn-new-game-2')
const BTN_NEW_GAME_ERROR = document.querySelector('#btn-new-game-3')
const BTN_RESTART_GAME_ERROR = document.querySelector('#btn-restart')
const BTN_DELETE = document.querySelector('#btn-delete')
const PLAYER_NAME = document.querySelector('#player-name')
const BTN_GRID_SIZE = document.querySelector('#btn-grid-size')
const BTN_GAME_TYPE = document.querySelector('#btn-game-type')
const DISPLAY_PLAYERS_NAME = document.querySelector('#display-players-name')

const date = CONSTANT.TODAY_DATE

date.setDate(1)

// Toggle dark mode
DARK_MODE_TOGGLE.addEventListener('click', () => {
  BODY_ELEMENT.classList.toggle('dark')
  const isDarkMode = BODY_ELEMENT.classList.contains('dark')
  localStorage.setItem('dark-mode', isDarkMode)
  META_NAME_THEME_COLOR.setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff')
})

// initial value
const beginDate = CONSTANT.BEGIN_DATE
let cells = undefined
let numberInputs = undefined

let level_index = 1
let level = CONSTANT.LEVEL[level_index]
let level_name = CONSTANT.LEVEL_NAME[level_index]

let game_index = 5
let game_size = CONSTANT.GRID_SIZE[game_index]
let game_size_name = CONSTANT.GRID_TYPE[game_index]

let game_type_index = 0
let game_type = CONSTANT.GAME_TYPE[game_type_index]
let game_type_name = CONSTANT.GAME_NAME[game_type_index]

let game_version_index = 0
let game_version = CONSTANT.GAME_VERSION[game_version_index]
let game_version_name = CONSTANT.GAME_VERSION_NAME[game_version_index]

let timer = null
let pause = false
let seconds = 0
let su = undefined
let suAnswer = undefined
let selectedCell = -1
let errorCount = 0

let dailySeed = 1
let dailyDatePicked = new Date()
// end initial value

// addEventListeners

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1)
  if (date.getMonth() <= beginDate.getMonth() && date.getFullYear() <= beginDate.getFullYear()) {
    return
  }
  createCalendar()
  addEvents()
})
document.querySelector('.next').addEventListener('click', () => {
  if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
    return
  } else {
    date.setMonth(date.getMonth() + 1)
    createCalendar()
    addEvents()
  }
})

DAILY_HOME.addEventListener('click', () => {
  deactivateAllScreens()
  clearKeyboard()
  clearSudoku()
  CALENDAR_SCREEN.classList.add('active')
})

DAILY_BTN_PAUSE.addEventListener('click', () => {
  console.log('BTN_PAUSE')
  deactivateAllScreens()
  PAUSE_SCREEN.classList.add('active')
  pause = true
})

BTN_RESUME.addEventListener('click', () => {
  console.log('BTN_RESUME')
  deactivateAllScreens()
  if (game_index === 5) {
    DAILY_GAME_SCREEN.classList.add('active')
  } else {
    PRO_GAME_SCREEN.classList.add('active')
  }
  pause = false
})

BTN_NEW_GAME.addEventListener('click', () => {
  returnStartScreen()
})

// end addEventListeners

// arrow functions
const getGameInfo = () => JSON.parse(localStorage.getItem('game-info'))

const setPlayerName = (name) => localStorage.setItem('playerName', name)
const getPlayerName = () => localStorage.getItem('playerName')
const showTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19)
// end arrow functions

// functions

function init() {
  console.log('init')
  const isDarkMode = JSON.parse(localStorage.getItem('dark-mode'))
  // console.log('darkmode', isDarkMode)
  BODY_ELEMENT.classList.add(isDarkMode ? 'dark' : 'light')

  META_NAME_THEME_COLOR.setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff')
  FOOTER.innerHTML = `© 2024 - ${new Date().getFullYear()} Zagzook Games`

  const game = getGameInfo()

  if (getPlayerName()) {
    NAME_INPUT.value = getPlayerName()
  } else {
    NAME_INPUT.focus()
  }
  console.log('===========init test ======')
  testTheCLOG()
}

function addEvents() {
  console.log('addEvents')
  const currentDays = document.querySelectorAll('.day')
  currentDays.forEach((day) => {
    day.addEventListener('click', () => {
      const selectedDay = day.dataset.days
      dailySeed = Number(selectedDay)
      console.log('dailySeed', dailySeed)
      dailyDatePicked = addDaysToDate(beginDate, dailySeed)
      // console.log('===========addEvents test ======')
      // testTheCLOG()
      dailyClickHandler()
    })
  })
}

function returnStartScreen() {
  clearInterval(timer)
  deactivateAllScreens()
  clearSudoku()
  clearKeyboard()
  pause = false
  seconds = 0
  CALENDAR_SCREEN.classList.add('active')
  errorCount = 0
  if (game_index === 5) {
    DAILY_GAME_TIMER.innerHTML = '00:00:00'
  } else {
    PRO_GAME_TIMER.innerHTML = '00:00:00'
  }
}

function dailyClickHandler() {
  console.log('dailyClickHandler')
  DAILY_PICK_DATE.innerHTML = getFormattedDate(dailyDatePicked)
  CALENDAR_PICK_DATE.innerHTML = getFormattedDate(dailyDatePicked)

  if (NAME_INPUT.value.trim().length > 0) {
    initSudoku()
    startGame(game_size)
    // console.log('===========dailyClickHandler test ======')
    // testTheCLOG()
    CALENDAR_SCREEN.classList.remove('active')
    DAILY_GAME_SCREEN.classList.add('active')
    EDITION_NUMBER.classList.add('active')
    EDITION_NUMBER.innerHTML = `Daily Edition ${dailySeed}`
  } else {
    NAME_INPUT.classList.add('input-err')
    setTimeout(() => {
      NAME_INPUT.classList.remove('input-err')
      NAME_INPUT.focus()
    }, 500)
  }
}

function initSudoku() {
  console.log('initSudoku')
  clearSudoku()
  clearKeyboard()
  createGrid(game_index, game_size, game_type)
  cells = document.querySelectorAll('.main-grid-cell')
  numberInputs = document.querySelectorAll('.number')

  if (game_index === 5) {
    su = dailySudokuGenerator(dailySeed)
  } else {
    su = proSudokuGenerator()
  }
  suAnswer = JSON.parse(JSON.stringify(su.question))
  // console.log('suAnswer', suAnswer)
  setSudokuToDiv()
  // console.log('===========initSudoku test ======')
  // testTheCLOG()
}

function startGame(game_size) {
  console.log('startGame')
  // console.log('game_size', game_size)
  // console.log('===========startGame test ======')
  // testTheCLOG()
  START_SCREEN.classList.remove('active')

  if (game_index === 5) {
    DAILY_GAME_SCREEN.classList.add('active')
  } else {
    GAME_SCREEN.classList.add('active')
  }
  const displayName = NAME_INPUT.value.toUpperCase().trim()
  DISPLAY_PLAYERS_NAME.innerHTML = `Welcome ${displayName}`
  setPlayerName(NAME_INPUT.value.trim())

  if (game_index === 5) {
    DAILY_GAME_LEVEL.innerHTML = level_name
  } else {
    PRO_GAME_LEVEL.innerHTML = level_name
  }

  seconds = 0
  showTime(seconds)
  timer = setInterval(() => {
    if (!pause) {
      seconds = seconds + 1
      if (game_index === 5) {
        DAILY_GAME_TIMER.innerHTML = showTime(seconds)
      } else {
        PRO_GAME_TIMER.innerHTML = showTime(seconds)
      }
    }
  }, 1000)
}

function setSudokuToDiv() {
  console.log('setSudokuToDiv')
  for (let i = 0; i < Math.pow(game_size, 2); i++) {
    const colorGame = game_type === 6 ? true : false
    let row = Math.floor(i / game_size)
    let col = i % game_size
    const divValue = su.question[row][col]

    cells[i].setAttribute('data-value', divValue)
    cells[i].classList.add(colorGame ? `color-${divValue}` : 'color-none')

    if (divValue !== '-') {
      cells[i].classList.add('filled')
      cells[i].innerHTML += colorGame ? 'O' : divValue
    }
  }
}

function addDaysToDate(startDate, daysToAdd) {
  console.log('addDaysToDate')
  const date = new Date(startDate)
  daysToAdd++
  date.setTime(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  return date
}

function getFormattedDate(date) {
  console.log('getFormattedDate')
  const options_1 = {
    weekday: 'long', // Full weekday name (e.g., "Thursday")
    year: 'numeric', // Full year (e.g., "2024")
    month: 'long', // Full month name (e.g., "November")
    day: 'numeric', // Day of the month (e.g., "28")
  }

  return date.toLocaleDateString('en-US', options_1)
}

function clearSudoku() {
  let childDivs
  if (document.querySelector('.main-grid-cell')) {
    for (let i = 0; i < Math.pow(game_size, 2); i++) {
      cells[i].innerHTML = ''
      cells[i].classList.remove('filled')
      cells[i].classList.remove('fill-ans')
      cells[i].classList.remove('selected')
      cells[i].classList.remove('hover')
    }
  }

  if (game_index === 5) {
    childDivs = document.querySelectorAll('#daily-sudoku-grid > div')
  } else {
    childDivs = document.querySelectorAll('#pro-sudoku-grid > div')
  }

  for (var i = 0; i < childDivs.length; i++) {
    childDivs[i].remove()
  }

  if (game_index === 5) {
    DAILY_SUDOKU_GRID.classList.remove(`grid-${game_size}`)
  } else {
    PRO_SUDOKU_GRID.classList.remove(`grid-${game_size}`)
  }
}

function clearKeyboard() {
  console.log('clearKeyboard')
  let childDivs
  if (document.querySelector('.number')) {
    for (let i = 0; i < game_size; i++) {
      numberInputs[i].innerHTML = ''
    }
    if (game_index === 5) {
      childDivs = document.querySelectorAll('#daily-numbers-keys > div')
    } else {
      childDivs = document.querySelectorAll('#pro-numbers-keys > div')
    }
    for (var i = 0; i < childDivs.length; i++) {
      childDivs[i].remove()
    }
    if (game_index === 5) {
      DAILY_NUMBERS_KEY.classList.remove(`grid-${game_size}`)
    } else {
      PRO_NUMBERS_KEY.classList.remove(`grid-${game_size}`)
    }
  }
}

function deactivateAllScreens() {
  console.log('deactivateAllScreens')
  START_SCREEN.classList.remove('active')
  DAILY_GAME_SCREEN.classList.remove('active')
  PRO_GAME_SCREEN.classList.remove('active')
  PAUSE_SCREEN.classList.remove('active')
  RESULT_SCREEN.classList.remove('active')
  ERROR_SCREEN.classList.remove('active')
  CALENDAR_SCREEN.classList.remove('active')
}

function testTheCLOG() {
  console.log('testTheCLOG')
  console.log('level_index', level_index)
  console.log('level', level)
  console.log('level_name', level_name)
  console.log('game_index', game_index)
  console.log('game_size', game_size)
  console.log('game_size_name', game_size_name)
  console.log('game_type', game_type)
  console.log('game_type_name', game_type_name)
  console.log('game_version', game_version)
  console.log('game_version_name', game_version_name)
  console.log('dailySeed', dailySeed)
  console.log('dailyDatePicked', dailyDatePicked)
}

// end functions

createCalendar()
addEvents()
init()
