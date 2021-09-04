import * as React from "react"

const Spinner = () => {
  const [isSpinning, setIsSpinning] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSpinning(true)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [isSpinning])

  if (isSpinning) {
    return (
      <div id="spinner">
        <div />
        <div />
        <div />
      </div>
    )
  }

  return null
}

export default Spinner
