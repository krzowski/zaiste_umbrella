import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "../components/unauthenticated/login"

import { UserSettingsProvider } from "../contexts/UserSettingsContext"

const UnauthenticatedRoot: React.FC = () => (
  <UserSettingsProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  </UserSettingsProvider>
)

export default UnauthenticatedRoot
