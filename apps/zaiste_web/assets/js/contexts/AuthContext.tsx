import * as React from "react"

export const AuthContext = React.createContext<{
  authenticated: boolean
  setAuthenticatedSession: Function
}>({} as any)
