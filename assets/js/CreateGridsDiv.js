import { CONSTANT } from './constant.js'

const PRO_SUDOKU_GRID = document.querySelector('#pro-sudoku-grid')
const DAILY_SUDOKU_GRID = document.querySelector('#daily-sudoku-grid')
const DAILY_NUMBER_KEYS = document.querySelector('#daily-numbers-keys')
const PRO_NUMBER_KEYS = document.querySelector('#pro-numbers-keys')

export const createGrid = (gameSizeIndex, gridSize, gameType) => {
  for (let i = 0; i < Math.pow(gridSize, 2); i++) {
    const cellElement = document.createElement('div')
    if (gameSizeIndex === 5) {
      cellElement.classList.add(`main-grid-cell`)
      cellElement.classList.add(`grid-${gridSize}X${gridSize}`)
      DAILY_SUDOKU_GRID.appendChild(cellElement)
      DAILY_SUDOKU_GRID.classList.add(`grid-${gridSize}`)
    } else {
      cellElement.classList.add(`main-grid-cell`)
      cellElement.classList.add(`grid-${gridSize}X${gridSize}`)
      PRO_SUDOKU_GRID.appendChild(cellElement)
      PRO_SUDOKU_GRID.classList.add(`grid-${gridSize}`)
    }
  }

  const cells = document.querySelectorAll(`.main-grid-cell`)
  let index = 0
  for (let i = 0; i < Math.pow(gridSize, 2); i++) {
    let row = Math.floor(i / gridSize)
    let col = i % gridSize
    if (gridSize === 4) {
      if (row === 1) cells[index].style.marginBottom = '10px'
      if (col === 1) cells[index].style.marginRight = '10px'
    } else if (gridSize === 6) {
      if (row === 1 || row === 3) cells[index].style.marginBottom = '10px'
      if (col === 2) cells[index].style.marginRight = '10px'
    } else if (gridSize === 8) {
      if (row === 1 || row === 3 || row === 5) cells[index].style.marginBottom = '10px'
      if (col === 3) cells[index].style.marginRight = '10px'
    } else if (gridSize === 9) {
      if (row === 2 || row === 5) cells[index].style.marginBottom = '10px'
      if (col === 2 || col === 5) cells[index].style.marginRight = '10px'
    }
    index++
  }
  let keyBoard = getKeyBoard(gameType)
  for (let i = 0; i < gridSize + 1; i++) {
    const cellElement = document.createElement('div')
    const cellCountElement = document.createElement('div')
    if (i === gridSize) {
      // do nothing
    } else {
      cellElement.classList.add('number')
      cellElement.classList.add(`grid-${gridSize}`)
      if (gameType === 5) {
        cellElement.classList.add(`color-${i + 1}`)
        if (gameSizeIndex === 5) {
          document.querySelector('#daily-numbers-keys').classList.add('color-keys')
        } else {
          document.querySelector('#pro-numbers-keys').classList.add('color-keys')
        }
      } else {
        cellElement.classList.add(`color-none`)
      }
      cellElement.innerText = keyBoard[i]
    }
    if (gameSizeIndex === 5) {
      DAILY_NUMBER_KEYS.appendChild(cellElement)
      document.querySelector('.number').appendChild(cellCountElement)
      DAILY_NUMBER_KEYS.classList.add(`grid-${gridSize}`)
    } else {
      PRO_NUMBER_KEYS.appendChild(cellElement)
      PRO_NUMBER_KEYS.classList.add(`grid-${gridSize}`)
    }
  }
}

const getKeyBoard = (gameType) => {
  let keyBoard = CONSTANT.NUMBER
  let colors = undefined

  switch (gameType) {
    case 2:
      keyBoard = CONSTANT.ALPHA
      break
    case 3:
      keyBoard = CONSTANT.ROMAN
      break
    case 4:
      keyBoard = CONSTANT.SYMBOLS
      break
    case 5:
      keyBoard = CONSTANT.COLOR_NAME
      colors = CONSTANT.COLORS
      break
    default:
      keyBoard = CONSTANT.NUMBER
  }
  return keyBoard
}
