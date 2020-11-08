import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

import Spinner from '../shared/Spinner'
import ErrorMessage from '../shared/ErrorMessage'
import EventsCalendar from './EventsCalendar'
// import NewEvent from './NewEvent'
// import EventsList from './EventsList'


const Calendar: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState(Date.now())

  // fetch month's events
  const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', [calendarDate])

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
