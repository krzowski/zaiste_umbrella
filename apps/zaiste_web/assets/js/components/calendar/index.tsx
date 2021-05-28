import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import EventsCalendar from './EventsCalendar'


const Calendar: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())

  return (
    <div className="calendar-container">
      <EventsCalendar
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
      />
    </div>
  )
}

export default Calendar
