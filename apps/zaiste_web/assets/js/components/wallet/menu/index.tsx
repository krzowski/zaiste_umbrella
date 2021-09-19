import * as React from "react"
import { DatesRange } from "../interfaces"
import { UserSettingsContext } from "../../../contexts/UserSettingsContext"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import MonthsCalendar from "./MonthsCalendar/MonthsCalendar"
import TransactionTypeFilters from "./TransactionTypeFilters/TransactionTypeFilters"
import DatesForm from "./DatesForm/DatesForm"
import TransactionsSummary from "./TransactionsSummary/TransactionsSummary"
import AddButton from "../../shared/AddButton/AddButton"

interface Props {
  datesRange: DatesRange
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
  openNewTransactionModal: React.MouseEventHandler<HTMLButtonElement>
}

const WalletMenu: React.FC<Props> = ({ datesRange, setDatesRange, openNewTransactionModal }) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const { filteredTransactions, transactionsFilters, toggleShowIncomes, toggleShowExpenses } =
    React.useContext(TransactionsContext)

  return (
    <div className="page-menu wallet-menu">
      <AddButton buttonText="Add transaction" handleOnClick={openNewTransactionModal} />
      <TransactionsSummary transactions={filteredTransactions} currency={userSettings.currency} />
      <TransactionTypeFilters
        transactionsFilters={transactionsFilters}
        toggleShowIncomes={toggleShowIncomes}
        toggleShowExpenses={toggleShowExpenses}
      />
      <DatesForm datesRange={datesRange} setDatesRange={setDatesRange} />
      <MonthsCalendar setDatesRange={setDatesRange} />
    </div>
  )
}

export default WalletMenu
