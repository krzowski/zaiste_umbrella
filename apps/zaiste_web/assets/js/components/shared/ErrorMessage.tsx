import * as React from 'react'


interface ErrorMessageProps {
  message: string,
}

const ErrorMessage = (props: ErrorMessageProps) => {
  return (<div id="error_message">{props.message}</div>)
}

export default ErrorMessage
