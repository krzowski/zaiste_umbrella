import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './layout'
import Overview from './components/overview'
import Wallet from './components/wallet'

export default class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route exact path="/">
                <Redirect to="/overview" />
              </Route>

              <Route path={["/overview", "/projects", "/patterns"]} component={Overview} />
              <Route path="/wallet" component={Wallet} />

              {/* Fake route used for styling */}
              <Route path="/nothing" />
            </Layout>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
