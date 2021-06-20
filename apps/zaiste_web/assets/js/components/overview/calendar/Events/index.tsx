import * as React from 'react'

import { DayEvents } from '../index'


interface Props {
  eventsData: Array<DayEvents>,
}

const EventsList: React.FC<Props> = ({eventsData}) => {
  return (
    <>
      <div className="social-events">
        <div className="section-title">Social events</div>
        {/* <div className="section-no-events pl10 pt20">No events today</div> */}
        <div className="card event-card p10 mt2">
          <div className="social-event-title">
            Meeting with Julia and Andrea
          </div>
          <div className="social-event-time">
            20:30
          </div>
        </div>
      </div>

      <div className="other-tasks pt30">
        <div className="section-title">Tasks</div>
        {/* <div className="section-no-events p20">No tasks today</div> */}
        <div className="section-events">
          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
              Take trash out
              Take trash out
            </div>
            <div className="event-done-button">
              <i className="fas fa-check-square"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>
          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>
          <div className="card event-card p10 mt2">
            <div className="event-title">
              Take trash out
            </div>
            <div className="event-done-button done">
              <i className="fas fa-check green"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventsList
