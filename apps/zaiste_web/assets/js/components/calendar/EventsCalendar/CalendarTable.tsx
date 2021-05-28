import * as React from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  endOfISOWeek,
  startOfISOWeek,
  eachDayOfInterval,
  isWithinInterval,
  isToday
} from 'date-fns'


interface EventObject {
  id: number
  name: string
  date: string
  done: boolean
  position: number | null
}
interface DayEvents {
  date: string // YYYY-MM-DD
  events: Array<EventObject>
}
interface Props {
  calendarDate: Date
  eventsData: Array<DayEvents>,
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>
}

const EventsCalendar: React.FC<Props> = ({calendarDate, eventsData, setCalendarDate}) => {
  const first_day = startOfMonth(calendarDate)
  const last_day = endOfMonth(calendarDate)
  const month_days = { start: first_day, end: last_day }
  const displayed_days = { start: startOfISOWeek(first_day), end: endOfISOWeek(last_day) }

  const day_cells = eachDayOfInterval(displayed_days).map( date => {
    const is_month_day = isWithinInterval(date, month_days)

    const class1 = is_month_day ? 'month-day' : 'non-month-day'
    const class2 = isToday(date) ? 'today-day' : ''

    return (
      <div className={`calendar-day-container ${class1} ${class2}`} key={+date}>
        <div className="calendar-day">{is_month_day ? date.getDate() : ''}</div>
        {/* TODO: count events in eventsData for the day */}
        <div className="calendar-activities">0</div>
      </div>
    )
  })

  return (
    <div className="simple-calendar">
      <div className="calendar-heading">
        <span onClick={() => setCalendarDate(subMonths(calendarDate, 1))}>Previous</span>
        <span className="calendar-title">{format(calendarDate, "MMMM yyyy")}</span>
        <span onClick={() => setCalendarDate(addMonths(calendarDate, 1))}>Next</span>
      </div>

      <div className="calendar-day-names">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>

      <div className="calendar-days">
        {day_cells}
      </div>
    </div>
  )
}

export default EventsCalendar;
