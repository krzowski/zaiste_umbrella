import * as React from "react"
import { format, eachMonthOfInterval, addYears, subYears, startOfYear, endOfYear } from "date-fns"
import { DatesRange } from "../../interfaces"

interface Props {
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
}

const MonthsCalendar: React.FC<Props> = ({ setDatesRange }) => {
  const today = new Date()
  const [currentYearDate, setCurrentYearDate] = React.useState<Date>(today)

  function isCurrentYearSet(): boolean {
    return currentYearDate.getFullYear() === today.getFullYear()
  }

  function setDatesRangeForMonth(monthDate: Date) {
    setDatesRange({
      startDate: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
      endDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0),
    })
  }

  function setPrevYear() {
    setCurrentYearDate(subYears(currentYearDate, 1))
  }

  function setNextYear() {
    setCurrentYearDate(addYears(currentYearDate, 1))
  }

  return (
    <>
      <div className="section-title mb3 mt30 flex-row-justify">
        <div className="pt4">{currentYearDate.getFullYear()}</div>
        <div className="calendar-nav-arrows">
          <span role="button" className="pl5 pr5" onClick={setPrevYear}>
            &#8249;
          </span>

          {isCurrentYearSet() ? (
            <span className="pl5 disabled">&#8250;</span>
          ) : (
            <span role="button" className="pl5" onClick={setNextYear}>
              &#8250;
            </span>
          )}
        </div>
      </div>

      <div className="wallet-months custom-scrollbar">
        {eachMonthOfInterval({
          start: startOfYear(currentYearDate),
          end: isCurrentYearSet() ? today : endOfYear(currentYearDate),
        }).map(monthDate => (
          <div
            role="button"
            className="wallet-month"
            key={`timestamp_${+monthDate}`}
            onClick={() => setDatesRangeForMonth(monthDate)}
          >
            {format(monthDate, "MMMM")}
          </div>
        ))}
      </div>
    </>
  )
}

export default MonthsCalendar
