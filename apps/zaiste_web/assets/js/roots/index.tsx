import * as React from 'react'

import AuthenticatedRoot from './AuthenticatedRoot'

export default class Root extends React.Component {
  public render(): JSX.Element {
    return <AuthenticatedRoot />
  }
}
