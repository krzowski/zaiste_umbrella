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
  calendar_date: Date
  events_data: Array<DayEvents>,
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>
}

const EventsCalendar: React.FC<Props> = ({calendar_date, events_data, setCalendarDate}) => {
  const first_day = startOfMonth(calendar_date)
  const last_day = endOfMonth(calendar_date)
  const month_days = { start: first_day, end: last_day }
  const displayed_days = { start: startOfISOWeek(first_day), end: endOfISOWeek(last_day) }

  const day_cells = eachDayOfInterval(displayed_days).map( date => {
    const is_month_day = isWithinInterval(date, month_days)

    const class1 = is_month_day ? 'month-day' : 'non-month-day'
    const class2 = isToday(date) ? 'today-day' : ''

    return (
      <div className={`calendar-day-container ${class1} ${class2}`} key={+date}>
        <div className="calendar-day">{is_month_day ? date.getDate() : ''}</div>
        <div className="calendar-activities">0</div>
      </div>
    )
  })

  return (
    <div className="simple-calendar">
      <div className="calendar-heading">
        <span onClick={() => setCalendarDate(subMonths(calendar_date, 1))}>Previous</span>
        <span className="calendar-title">{format(calendar_date, "MMMM yyyy")}</span>
        <span onClick={() => setCalendarDate(addMonths(calendar_date, 1))}>Next</span>
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
