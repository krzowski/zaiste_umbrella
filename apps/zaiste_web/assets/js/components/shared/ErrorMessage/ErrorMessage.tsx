import * as React from "react"

interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({ message }) => <div id="error_message">{message}</div>

export default ErrorMessage
