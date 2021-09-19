import * as React from "react"

interface Props {
  buttonText: string
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>
}

const AddButton: React.FC<Props> = ({ buttonText, handleOnClick }) => (
  <button type="button" className="mt40 d-b m0a" onClick={handleOnClick}>
    {buttonText}
  </button>
)

export default AddButton
