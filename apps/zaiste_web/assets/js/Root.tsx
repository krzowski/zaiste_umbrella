import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Calendar from './components/Calendar'
import Wallet from './components/Wallet'

export default class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/wallet" component={Wallet} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
