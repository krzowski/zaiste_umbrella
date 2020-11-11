import * as React from 'react'
import { format, addMonths, subMonths } from 'date-fns'

interface EventObject {
  id: number
  name: string
  date: string
  done: boolean
  position: number | null
}
interface DayEvents {
  date: string
  events: Array<EventObject>
}
interface Props {
  calendar_date: Date
  events_data: Array<DayEvents>,
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>
}

const EventsCalendar: React.FC<Props> = ({calendar_date, events_data, setCalendarDate}) => {
  return (
    <div className="simple-calendar">
      <div className="calendar-heading">
        <span onClick={() => setCalendarDate(subMonths(calendar_date, 1))}>Previous</span>
        <span className="calendar-title">{format(calendar_date, "MMMM yyyy")}</span>
        <span onClick={() => setCalendarDate(addMonths(calendar_date, 1))}>Next</span>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>

        {/* <tbody>
            <tr>
                <td className="day wday-1 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_26-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-26"><div className="calendar-day">26</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-2 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_27-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-27"><div className="calendar-day">27</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-3 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_28-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-28"><div className="calendar-day">28</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-4 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_29-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-29"><div className="calendar-day">29</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-5 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_30-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-30"><div className="calendar-day">30</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-6 past prev-month">
                  <div className="calendar-day-container non-month-day" id="day_31-10-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-10-31"><div className="calendar-day">31</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-0 past current-month">
                  <div className="calendar-day-container month-day" id="day_01-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-01"><div className="calendar-day">1</div><div className="calendar-activities">-</div></a></div></td>        </tr>
                          <tr>
                              <td className="day wday-1 past current-month">
                  <div className="calendar-day-container month-day" id="day_02-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-02"><div className="calendar-day">2</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-2 past current-month">
                  <div className="calendar-day-container month-day" id="day_03-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-03"><div className="calendar-day">3</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-3 past current-month">
                  <div className="calendar-day-container month-day" id="day_04-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-04"><div className="calendar-day">4</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-4 past current-month">
                  <div className="calendar-day-container month-day" id="day_05-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-05"><div className="calendar-day">5</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-5 past current-month">
                  <div className="calendar-day-container month-day" id="day_06-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-06"><div className="calendar-day">6</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-6 past current-month">
                  <div className="calendar-day-container month-day" id="day_07-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-07"><div className="calendar-day">7</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-0 past current-month">
                  <div className="calendar-day-container month-day" id="day_08-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-08"><div className="calendar-day">8</div><div className="calendar-activities">-</div></a></div></td>        </tr>
                          <tr>
                              <td className="day wday-1 past current-month">
                  <div className="calendar-day-container month-day" id="day_09-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-09"><div className="calendar-day">9</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-2 past current-month">
                  <div className="calendar-day-container month-day" id="day_10-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-10"><div className="calendar-day">10</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-3 today start-date current-month">
                  <div className="calendar-day-container today-day" id="day_11-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-11"><div className="calendar-day">11</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-4 future current-month">
                  <div className="calendar-day-container month-day" id="day_12-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-12"><div className="calendar-day">12</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-5 future current-month">
                  <div className="calendar-day-container month-day" id="day_13-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-13"><div className="calendar-day">13</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-6 future current-month">
                  <div className="calendar-day-container month-day" id="day_14-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-14"><div className="calendar-day">14</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-0 future current-month">
                  <div className="calendar-day-container month-day" id="day_15-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-15"><div className="calendar-day">15</div><div className="calendar-activities">-</div></a></div></td>        </tr>
                          <tr>
                              <td className="day wday-1 future current-month">
                  <div className="calendar-day-container month-day" id="day_16-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-16"><div className="calendar-day">16</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-2 future current-month">
                  <div className="calendar-day-container month-day" id="day_17-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-17"><div className="calendar-day">17</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-3 future current-month">
                  <div className="calendar-day-container month-day" id="day_18-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-18"><div className="calendar-day">18</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-4 future current-month">
                  <div className="calendar-day-container month-day" id="day_19-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-19"><div className="calendar-day">19</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-5 future current-month">
                  <div className="calendar-day-container month-day" id="day_20-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-20"><div className="calendar-day">20</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-6 future current-month">
                  <div className="calendar-day-container month-day" id="day_21-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-21"><div className="calendar-day">21</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-0 future current-month">
                  <div className="calendar-day-container month-day" id="day_22-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-22"><div className="calendar-day">22</div><div className="calendar-activities">-</div></a></div></td>        </tr>
                          <tr>
                              <td className="day wday-1 future current-month">
                  <div className="calendar-day-container month-day" id="day_23-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-23"><div className="calendar-day">23</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-2 future current-month">
                  <div className="calendar-day-container month-day" id="day_24-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-24"><div className="calendar-day">24</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-3 future current-month">
                  <div className="calendar-day-container month-day" id="day_25-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-25"><div className="calendar-day">25</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-4 future current-month">
                  <div className="calendar-day-container month-day" id="day_26-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-26"><div className="calendar-day">26</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-5 future current-month">
                  <div className="calendar-day-container month-day" id="day_27-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-27"><div className="calendar-day">27</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-6 future current-month">
                  <div className="calendar-day-container month-day" id="day_28-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-28"><div className="calendar-day">28</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-0 future current-month">
                  <div className="calendar-day-container month-day" id="day_29-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-29"><div className="calendar-day">29</div><div className="calendar-activities">-</div></a></div></td>        </tr>
                          <tr>
                              <td className="day wday-1 future current-month">
                  <div className="calendar-day-container month-day" id="day_30-11-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-11-30"><div className="calendar-day">30</div><div className="calendar-activities">-</div></a></div></td>            <td className="day wday-2 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_01-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-01"><div className="calendar-day">1</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-3 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_02-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-02"><div className="calendar-day">2</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-4 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_03-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-03"><div className="calendar-day">3</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-5 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_04-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-04"><div className="calendar-day">4</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-6 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_05-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-05"><div className="calendar-day">5</div><div className="calendar-activities"></div></a></div></td>            <td className="day wday-0 future next-month">
                  <div className="calendar-day-container non-month-day" id="day_06-12-20"><a onclick="showLoader('calendar-side')" data-remote="true" href="/calendar_events_day/2020-12-06"><div className="calendar-day">6</div><div className="calendar-activities"></div></a></div></td>        </tr>
            </tbody> */}
        </table>
      </div>


    // <div>
    //   {events_data.map( day_events => {
    //     return (<div>
    //       {day_events.events.map( event => <div key={event.id}>{event.name}</div> )}
    //     </div>)
    //   } )}
    // </div>
  )
}

export default EventsCalendar;
