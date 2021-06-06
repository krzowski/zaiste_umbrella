import * as React from 'react'
import EventsCalendar from './EventsCalendar'


const Calendar: React.FC = () => {
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
