import * as React from 'react'
import {
  format,
  eachMonthOfInterval,
  addYears,
  subYears,
  startOfYear,
  endOfYear,
} from 'date-fns'
import { DatesRange } from '../interfaces'


interface Props {
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
}


const MonthsCalendar: React.FC<Props> = ({ setDatesRange }) => {
  const today = new Date()
  const [currentYearDate, setCurrentYearDate] = React.useState<Date>(today)
  let isCurrentYear = currentYearDate.getFullYear() == today.getFullYear()
  React.useEffect(() => {
    isCurrentYear = currentYearDate.getFullYear() == today.getFullYear()
  }, [currentYearDate])


  return (
    <>
      <div className="section-title mt30 mb3 flex-row-justify">
        <div className="pt4">{currentYearDate.getFullYear()}</div>
        <div className='calendar-nav-arrows'>
          <span className="pl5 pr5" onClick={() => setCurrentYearDate(subYears(currentYearDate, 1))}>&#8249;</span>
          {isCurrentYear ?
            <span className="pl5 pr5 disabled">&#8250;</span> :
            <span className="pl5 pr5" onClick={() => setCurrentYearDate(addYears(currentYearDate, 1))}>&#8250;</span>
          }
        </div>
      </div>

      <div className="wallet-months custom-scrollbar">
        {eachMonthOfInterval({
          start: startOfYear(currentYearDate),
          end: isCurrentYear ? today : endOfYear(currentYearDate)
        }).map(monthDate => (
          <div
            className="wallet-month"
            key={`stamp_${+monthDate}`}
            onClick={() => setDatesRange({
              startDate: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
              endDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0),
            })}
          >
            {format(monthDate, "MMMM")}
          </div>
        ))}
      </div>
    </>
  )
}

export default MonthsCalendar
