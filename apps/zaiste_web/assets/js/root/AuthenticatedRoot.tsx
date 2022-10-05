import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Layout from "../layout"
import Overview from "../components/overview"
import Wallet from "../components/wallet"
import Patterns from "../components/patterns"
import Contacts from "../components/contacts"
import { UserSettingsProvider } from "../contexts/UserSettingsContext"

const AuthenticatedRoot: React.FC = () => (
  <UserSettingsProvider>
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Redirect to="/overview" />
          </Route>

          <Route path="/overview" component={Overview} />
          <Route path="/patterns" component={Patterns} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/contacts" component={Contacts} />

          {/* Fake route used for styling */}
          <Route path="/nothing" />
        </Layout>
      </Switch>
    </BrowserRouter>
  </UserSettingsProvider>
)

export default AuthenticatedRoot
