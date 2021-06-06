import * as React from 'react'
import { format, startOfMonth } from 'date-fns'

import useFetch from '../../../../hooks/useFetch'
import Spinner from '../../../shared/Spinner'
import ErrorMessage from '../../../shared/ErrorMessage'

import CalendarTable from './CalendarTable'


interface Props {
  calendarDate: Date
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>
}

const EventsCalendar: React.FC<Props> = ({calendarDate, setCalendarDate}) => {
  const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: format(startOfMonth(calendarDate), 'yyyy-MM-dd') })

  return (
    <div className="calendar">
      {
        errorMessage && <ErrorMessage message={errorMessage} /> ||
        <CalendarTable
          calendarDate={calendarDate}
          eventsData={isLoading ? null : data}
          setCalendarDate={setCalendarDate}
        />
      }
    </div>
  )
}

export default EventsCalendar;
