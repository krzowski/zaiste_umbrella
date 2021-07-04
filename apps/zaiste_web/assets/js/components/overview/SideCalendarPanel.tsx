import * as React from 'react'
import { format, startOfMonth } from 'date-fns'
import ErrorMessage from '../shared/ErrorMessage'
import EventsCalendar from './EventsCalendar'
import CalendarEvent from './CalendarEvent'
import { fetchCalendarEvents } from '../../api_calls/overview'


const Calendar: React.FC = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  const { data, errorMessage } = fetchCalendarEvents(format(startOfMonth(calendarDate), 'yyyy-MM-dd'))

  if (errorMessage) return <ErrorMessage message={errorMessage} />

  return (
    <>
      <div className="calendar-container">
        <div className="calendar">
          <EventsCalendar
            calendarDate={calendarDate}
            eventsData={data}
            setCalendarDate={setCalendarDate}
          />
        </div>
      </div>

      <div className="events-container custom-scrollbar">
        <CalendarEvent
          eventsData={data}
        />
      </div>
    </>
  )
}

export default Calendar
