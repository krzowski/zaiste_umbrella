import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { TransactionsProvider } from '../../contexts/TransactionsContext'
import Transactions from './Transactions'
import WalletMenu from './WalletMenu'
import { DatesRange } from './interfaces'
import { fetchTransactions } from './api_calls'
import { formatDatesRange } from './helper_functions'


const today = new Date()
const initialDates = {
  startDate: new Date(today.getFullYear(), today.getMonth(), 1),
  endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
}

const Wallet: React.FC<RouteComponentProps> = () => {
  const [datesRange, setDatesRange] = React.useState<DatesRange>(initialDates)
  const { data } = fetchTransactions(formatDatesRange(datesRange))

  return (
    <TransactionsProvider
      fetchedTransactions={data || []}
      datesRange={datesRange}
    >
      <div className="wallet-container">
        <Transactions />

        <WalletMenu
          datesRange={datesRange}
          setDatesRange={setDatesRange}
        />
      </div>
    </TransactionsProvider>
  )
}

export default Wallet
