import * as React from "react"
import { format, eachMonthOfInterval, addYears, subYears, startOfYear, endOfYear } from "date-fns"
import { DatesRange } from "../interfaces"

interface Props {
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
}

const MonthsCalendar: React.FC<Props> = ({ setDatesRange }) => {
  const today = new Date()
  const [currentYearDate, setCurrentYearDate] = React.useState<Date>(today)
  let isCurrentYear = currentYearDate.getFullYear() === today.getFullYear()
  React.useEffect(() => {
    isCurrentYear = currentYearDate.getFullYear() === today.getFullYear()
  }, [currentYearDate])

  function setDatesRangeForMonth(monthDate: Date) {
    setDatesRange({
      startDate: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
      endDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0),
    })
  }

  return (
    <>
      <div className="section-title mb3 flex-row-justify">
        <div className="pt4">{currentYearDate.getFullYear()}</div>
        <div className="calendar-nav-arrows">
          <span
            role="button"
            tabIndex={0}
            className="pl5 pr5"
            onClick={() => setCurrentYearDate(subYears(currentYearDate, 1))}
            onKeyPress={() => setCurrentYearDate(subYears(currentYearDate, 1))}
          >
            &#8249;
          </span>

          {isCurrentYear ? (
            <span className="pl5 disabled">&#8250;</span>
          ) : (
            <span
              role="button"
              tabIndex={0}
              className="pl5"
              onClick={() => setCurrentYearDate(addYears(currentYearDate, 1))}
              onKeyPress={() => setCurrentYearDate(addYears(currentYearDate, 1))}
            >
              &#8250;
            </span>
          )}
        </div>
      </div>

      <div className="wallet-months custom-scrollbar">
        {eachMonthOfInterval({
          start: startOfYear(currentYearDate),
          end: isCurrentYear ? today : endOfYear(currentYearDate),
        }).map(monthDate => (
          <div
            role="button"
            tabIndex={0}
            className="wallet-month"
            key={`stamp_${+monthDate}`}
            onClick={() => setDatesRangeForMonth(monthDate)}
            onKeyPress={() => setDatesRangeForMonth(monthDate)}
          >
            {format(monthDate, "MMMM")}
          </div>
        ))}
      </div>
    </>
  )
}

export default MonthsCalendar
