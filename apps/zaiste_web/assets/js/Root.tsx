import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './layout'
import Calendar from './components/calendar'
import Wallet from './components/wallet'

export default class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route exact path="/" component={Calendar} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/wallet" component={Wallet} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
