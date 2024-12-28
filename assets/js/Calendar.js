import { CONSTANT } from './constant.js'

export const createCalendar = () => {
  // console.log('createCalendar')
  calendar()
}

// calender

const date = CONSTANT.TODAY_DATE
const beginDate = CONSTANT.BEGIN_DATE

date.setDate(1)

const calendar = () => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const monthDays = document.querySelector('.days')
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  const firstDayIndex = date.getDay()
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
  const nextDays = 7 - lastDayIndex - 1
  // console.log('lastDay', lastDay)

  document.querySelector('.date h1').innerHTML = month[date.getMonth()]
  document.querySelector('.date p').innerHTML = getFormattedDate(1)
  const todays_date = getFormattedDate(2)
  document.querySelector('.today-date-display span').innerHTML = `Today ${todays_date}`

  let days = ''
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
    monthDays.innerHTML = days
  }
  for (let i = 1; i <= lastDay; i++) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), i)
    const totalDays = Math.floor(Math.abs(newDate - beginDate) / (1000 * 60 * 60 * 24))
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="day today" data-days="${totalDays}">${i}</div>`
    } else if (i > new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="after-day" data-days="${totalDays}">${i}</div>`
    } else {
      days += `<div class="day" data-days="${totalDays}">${i}</div>`
    }

    monthDays.innerHTML = days
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`

    monthDays.innerHTML = days
  }
}

function getFormattedDate(num) {
  const options_1 = {
    weekday: 'long', // Full weekday name (e.g., "Thursday")
    year: 'numeric', // Full year (e.g., "2024")
    month: 'long', // Full month name (e.g., "November")
    day: 'numeric', // Day of the month (e.g., "28")
  }

  const options_2 = {
    year: 'numeric', // Full year (e.g., "2024")
    month: 'long', // Full month name (e.g., "November")
    day: 'numeric', // Day of the month (e.g., "28")
  }

  if (num === 1) {
    return date.toLocaleDateString('en-US', options_1)
  }

  if (num === 2) {
    return new Date().toLocaleDateString('en-US', options_1)
  }
}

// end calender
