import * as React from "react"

interface UserSettings {
  currency: string
}

interface Props {
  children: JSX.Element
}

// TODO : query settings from db
const initialState = {
  currency: "PLN",
  taskTimer: 5,
}

export const UserSettingsContext = React.createContext<{
  userSettings: UserSettings
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>
}>({} as any)

export const UserSettingsProvider: React.FC<Props> = ({ children }) => {
  const [userSettings, setUserSettings] = React.useState<UserSettings>(initialState)

  return (
    <UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}
