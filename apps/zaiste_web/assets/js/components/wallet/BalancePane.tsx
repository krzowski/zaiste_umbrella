import * as React from 'react'

interface Income {
  id: number
  name: string
  amount: number
}

interface Props {
  incomes_data: Array<Income>
  expenses_amount: number
  date: Date
}

const BalancePane: React.FC<Props> = ({incomes_data, expenses_amount, date}) => {
  return (
    <div className="balance">

    </div>
  )
}

export default BalancePane
