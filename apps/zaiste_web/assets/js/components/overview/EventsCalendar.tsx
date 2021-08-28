import * as React from "react"
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
  isToday,
} from "date-fns"
import { DayEvents } from "./interfaces"

interface Props {
  calendarDate: Date
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>
  eventsData: Array<DayEvents>
}

const EventsCalendar: React.FC<Props> = ({ calendarDate, setCalendarDate, eventsData }) => {
  const firstDay = startOfMonth(calendarDate)
  const lastDay = endOfMonth(calendarDate)
  const monthDays = { start: firstDay, end: lastDay }
  const displayedDays = { start: startOfISOWeek(firstDay), end: endOfISOWeek(lastDay) }

  const dayCells = eachDayOfInterval(displayedDays).map(date => {
    const isMonthDat = isWithinInterval(date, monthDays)

    const class1 = isMonthDat ? "month-day" : "non-month-day"
    const class2 = isToday(date) ? "today-day" : ""

    return (
      <div className={`calendar-day-container ${class1} ${class2}`} key={+date}>
        <div className="calendar-day">{isMonthDat ? date.getDate() : ""}</div>
        {/* <div className="calendar-activities">
          TODO: count events in eventsData for the day and show a dot when there are
        </div> */}
      </div>
    )
  })

  return (
    <div className="simple-calendar">
      <div className="calendar-heading">
        <span className="section-title pl8 pt2">{format(calendarDate, "MMMM yyyy")}</span>
        <div className="calendar-nav-arrows">
          <span
            role="button"
            tabIndex={0}
            onClick={() => setCalendarDate(subMonths(calendarDate, 1))}
            onKeyPress={() => setCalendarDate(subMonths(calendarDate, 1))}
          >
            &#8249;
          </span>

          <span
            role="button"
            tabIndex={0}
            onClick={() => setCalendarDate(addMonths(calendarDate, 1))}
            onKeyPress={() => setCalendarDate(addMonths(calendarDate, 1))}
          >
            &#8250;
          </span>
        </div>
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

      <div className="calendar-days">{dayCells}</div>
    </div>
  )
}

export default EventsCalendar
