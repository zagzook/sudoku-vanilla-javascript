import { Daily_Games } from '../data/daily.js'
import { CONSTANT } from './constant.js'

export const dailySudokuGenerator = (dailySeed) => {
  const dailyGameDB = Daily_Games
  const dailyGame = dailyGameDB[dailySeed]
  let puzzleBoard = dailyGame['board']
  let puzzleSolution = dailyGame['solution']
  let gridDigits = CONSTANT.NUMBER

  puzzleSolution = reorderString(puzzleSolution, gridDigits)
  puzzleBoard = setBoardTemplate(puzzleBoard, puzzleSolution)

  let sudoku = breakDown(puzzleSolution, 9)
  let question = breakDown(puzzleBoard, 9)
  let keyDigits = gridDigits

  return {
    original: sudoku,
    question: question,
    keyDigits: keyDigits,
  }
}

export const proSudokuGenerator = () => {}

function reorderString(inputString, targetArray) {
  const totalChars = inputString.length
  let reorderedString = ''

  // Iterate over all characters in chunks of size equal to the target array length
  for (let i = 0; i < totalChars; i++) {
    const chunk = parseInt(inputString.slice(i, i + 1), 10) // Extract the current chunk
    reorderedString += targetArray[chunk - 1]
  }
  return reorderedString
}

function setBoardTemplate(boardTemplate, solutionArray) {
  const totalChars = boardTemplate.length
  let newBoard = ''

  // Iterate over all characters in chunks of size equal to the target array length
  for (let i = 0; i < totalChars; i++) {
    const oldBoard = boardTemplate.slice(i, i + 1) // Extract the current chunk
    const oldSolution = solutionArray.slice(i, i + 1) // Extract the current chunk

    if (oldBoard === '-') {
      newBoard += oldBoard
    } else {
      newBoard += oldSolution
    }
  }
  return newBoard
}

function breakDown(board, gridSize) {
  const newBoard = []
  let temprow = []
  for (let i = 0; i < board.length + 1; i++) {
    if ((i + 1) % gridSize === 0) {
      if (i !== 0) {
        temprow.push(board[i])
        newBoard.push(temprow)
        temprow = []
      } else {
        temprow.push(board[i])
      }
    } else {
      temprow.push(board[i])
    }
  }
  return newBoard
}
