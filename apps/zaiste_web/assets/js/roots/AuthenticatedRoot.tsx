import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Layout from '../layout'
import Overview from '../components/overview'
import Wallet from '../components/wallet'
import Projects from '../components/projects'

import { UserSettingsProvider } from '../contexts/UserSettingsContext'


const AuthenticatedRoot: React.FC = () => {
  return (
    <UserSettingsProvider>
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route exact path="/">
              <Redirect to="/overview" />
            </Route>

            <Route path={["/overview", "/patterns"]} component={Overview} />
            <Route path="/projects" component={Projects} />
            <Route path="/wallet" component={Wallet} />

            {/* Fake route used for styling */}
            <Route path="/nothing" />
          </Layout>
        </Switch>
      </BrowserRouter>
    </UserSettingsProvider>
  )
}

export default AuthenticatedRoot
