import * as React from "react"
import { format, startOfMonth } from "date-fns"
import ErrorMessage from "../../shared/ErrorMessage/ErrorMessage"
import EventsCalendar from "./EventsCalendar/EventsCalendar"
import DayEventsList from "./DayEventsList/DayEventsList"
import { requestFetchCalendarEvents } from "../../../api_calls/overview"

const OverviewMenu: React.FC = () => {
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  const { data, errorMessage } = requestFetchCalendarEvents(
    format(startOfMonth(calendarDate), "yyyy-MM-dd")
  )

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
        <DayEventsList eventsData={data} />
      </div>
    </>
  )
}

export default OverviewMenu
