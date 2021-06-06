import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'
import useFetch from '../../hooks/useFetch'


const Wallet: React.FC<RouteComponentProps> = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  // const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: format(calendarDate, 'yyyy-MM-dd') })

  return (
    <div className="wallet-container">

    </div>
  )
}

export default Wallet
