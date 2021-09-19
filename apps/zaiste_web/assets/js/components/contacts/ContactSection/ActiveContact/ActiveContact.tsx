import * as React from "react"
import { useForm } from "react-hook-form"
import { Contact } from "../../interfaces"

interface Props {
  activeContact: Contact
}

const ActiveContact: React.FC<Props> = ({ activeContact }) => {
  const { name, dateOfBirth, notes } = activeContact
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  return (
    <div className="contact-container">
      <h3>{name}</h3>
      <form onSubmit={() => { }}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("name")}
            id="name"
            required
            className="in-box mt5"
          />
        </div>
      </form>
    </div>
  )
}

export default ActiveContact
