import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

// import Layout from '../../layout'
import Spinner from '../shared/Spinner'
import EventsCalendar from './EventsCalendar'
// import NewEvent from './NewEvent'
// import EventsList from './EventsList'


const Calendar: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState(Date.now())
  const { isLoading, data, error } = useFetch('/calendar_events', [calendarDate])

  if ( isLoading ) {

  }

  return (
    <div className="calendar-container">
      <div className="calendar">
        {isLoading ? (
          <Spinner />
        ) : (
          <EventsCalendar
            month={calendarDate}
            events_data={data} />
        )}
      </div>
    </div>
  )
}

export default Calendar
