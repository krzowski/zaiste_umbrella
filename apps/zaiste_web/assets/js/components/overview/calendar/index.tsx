import * as React from 'react'
import { format, startOfMonth } from 'date-fns'
import ErrorMessage from '../../shared/ErrorMessage'
import EventsCalendar from './EventsCalendar'
import EventsList from './Events'
import { fetchCalendarEvents } from '../api_calls'


export interface EventObject {
  id: number
  name: string
  date: string
  done: boolean
  position: number | null
}
export interface DayEvents {
  date: string // YYYY-MM-DD
  events: Array<EventObject>
}

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
        <EventsList
          eventsData={data}
        />
      </div>
    </>
  )
}

export default Calendar
