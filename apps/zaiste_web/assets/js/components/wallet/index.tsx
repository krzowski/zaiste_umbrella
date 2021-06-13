import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

import Transactions from './Transactions'
import WalletMenu from './WalletMenu'


const Wallet: React.FC<RouteComponentProps> = () => {
  // const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: format(calendarDate, 'yyyy-MM-dd') })
  // const [date, setDate] = React.useState<Date>(new Date())

  const transactions_data = [{
      id: 1,
      name: 'Zakupy w biedronce',
      income: false,
      date: '1 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 2,
      name: 'Zakupy na allegro',
      income: false,
      date: '4 / 03 / 2020',
      transaction_items: [
        {
          name: 'Morszczuk filet 950g',
          amount: 17.99
        },
        {
          name: 'Trio warzywne 750g',
          amount: 4.49
        },
        {
          name: 'Krem do opalania Garnier 200ml x2',
          amount: 23.98
        },
        {
          name: 'Masło orzechowe Vitanella 450g x2',
          amount: 14.98
        },
        {
          name: 'Chleb z makiem 500g',
          amount: 2.89
        },
        {
          name: 'Pomidor gałązka 2.105kg (2.99zł)',
          amount: 6.21
        },
        {
          name: 'Banany 1.085kg (4.99zł)',
          amount: 5.41
        },
        {
          name: 'Rzodkiewka',
          amount: 0.99
        },
        {
          name: 'Makrela tusza wędzona 0.276kg (14.90zł)',
          amount: 4.11
        },
      ]
    },
    {
      id: 3,
      name: 'Zakupy w carrefourze',
      income: false,
      date: '6 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 4,
      name: 'Czynsz',
      income: false,
      date: '13 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 5,
      name: 'Zakupy w biedronce',
      income: false,
      date: '1 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 6,
      name: 'Zakupy na allegro',
      income: false,
      date: '4 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 7,
      name: 'Zakupy w carrefourze',
      income: false,
      date: '6 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 8,
      name: 'Czynsz',
      income: false,
      date: '13 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 9,
      name: 'Zakupy w biedronce',
      income: false,
      date: '1 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 10,
      name: 'Wynagrodzenie',
      income: true,
      date: '4 / 03 / 2020',
      transaction_items: [
        {
          name: 'Przelew',
          amount: 2132.43
        }
      ]
    },
    {
      id: 11,
      name: 'Zakupy w carrefourze',
      income: false,
      date: '6 / 03 / 2020',
      transaction_items: []
    },
    {
      id: 12,
      name: 'Czynsz',
      income: false,
      date: '13 / 03 / 2020',
      transaction_items: []
    },
  ]

  return (
    <div className="wallet-container">
      <Transactions transactions_data={transactions_data} />
      <WalletMenu dates={[]} />
    </div>
  )
}

export default Wallet
