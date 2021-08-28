import * as React from "react"
import { DatesRange } from "../interfaces"
import MonthsCalendar from "./MonthsCalendar"
import TransactionTypeFilters from "./TransactionTypeFilters"
import DatesForm from "./DatesForm"
import TransactionsSummary from "./TransactionsSummary"

interface Props {
  datesRange: DatesRange
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
  openNewTransactionModal: React.MouseEventHandler<HTMLButtonElement>
}

const WalletMenu: React.FC<Props> = ({ datesRange, setDatesRange, openNewTransactionModal }) => (
  <div className="wallet-menu">
    <div className="new-transaction mt40">
      <button type="button" className="d-b m0a" onClick={openNewTransactionModal}>
        Add transaction
      </button>
    </div>

    <div className="mt40" />
    <TransactionsSummary />

    <div className="section-title mt30 pt5 mb13">Type</div>
    <TransactionTypeFilters />

    {/* TODO - labels for transactions */}
    {/* <div className="section-title mt20">Labels</div>
      <div className="labels">
        <div className="label">Food</div>
        <div className="label">Leisure</div>
      </div> */}

    <div className="section-title mt40 mb8">Date</div>
    <DatesForm datesRange={datesRange} setDatesRange={setDatesRange} />

    <div className="mt30" />
    <MonthsCalendar setDatesRange={setDatesRange} />
  </div>
)

export default WalletMenu
