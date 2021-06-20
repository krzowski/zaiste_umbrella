import * as React from 'react'

import { AuthContext } from '../contexts/AuthContext'

import AuthenticatedRoot from './AuthenticatedRoot'
import UnauthenticatedRoot from './UnauthenticatedRoot'


const Root: React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean>(!!localStorage.getItem('authenticated'))

  const setAuthenticatedSession = (isSignedIn: boolean) => {
    if (isSignedIn) {
      localStorage.setItem('authenticated', 'true')
      setAuthenticated(true)
    } else {
      localStorage.removeItem('authenticated')
      setAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticatedSession }}>
      {authenticated ? <AuthenticatedRoot /> : <UnauthenticatedRoot />}
    </AuthContext.Provider>
  )
}

export default Root
