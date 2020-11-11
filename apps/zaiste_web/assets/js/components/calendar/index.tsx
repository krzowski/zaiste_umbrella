import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

import Spinner from '../shared/Spinner'
import ErrorMessage from '../shared/ErrorMessage'
import EventsCalendar from './EventsCalendar'


const Calendar: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState<string>(new Date().toISOString().slice(0,10))

  const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: calendarDate })

  return (
    <div className="calendar-container">
      <div className="calendar">
        {
          isLoading && <Spinner /> ||
          errorMessage && <ErrorMessage message={errorMessage} /> ||
          <EventsCalendar
            month={calendarDate}
            events_data={data}
          />
        }
      </div>
    </div>
  )
}

export default Calendar
