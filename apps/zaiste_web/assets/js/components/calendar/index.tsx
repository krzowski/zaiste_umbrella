import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { format } from 'date-fns'

import Spinner from '../shared/Spinner'
import ErrorMessage from '../shared/ErrorMessage'
import EventsCalendar from './EventsCalendar'


const Calendar: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: format(calendarDate, 'yyyy-MM-dd') })

  return (
    <div className="calendar-container">
      <div className="calendar">
        {
          isLoading && <Spinner /> ||
          errorMessage && <ErrorMessage message={errorMessage} /> ||
          <EventsCalendar
            calendar_date={calendarDate}
            events_data={data}
            setCalendarDate={setCalendarDate}
          />
        }
      </div>
    </div>
  )
}

export default Calendar
