import * as React from 'react'


interface UserSettings {
  currency: string
}

// TODO : query settings from db
const initialState = {
  currency: 'PLN'
}


export const UserSettingsContext = React.createContext<{
  userSettings: UserSettings
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>
}>({} as any)


export const UserSettingsProvider = ({ children }) => {
  const [userSettings, setUserSettings] = React.useState<UserSettings>(initialState)

  return (
    <UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}
