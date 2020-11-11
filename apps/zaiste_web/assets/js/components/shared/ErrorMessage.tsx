import * as React from 'react'


interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({message}) => {
  return (<div id="error_message">{message}</div>)
}

export default ErrorMessage
