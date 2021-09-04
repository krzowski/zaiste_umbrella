import * as React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ProjectFormFields } from "../../interfaces"

interface Props {
  onSubmit: SubmitHandler<ProjectFormFields>
  defaultValues: ProjectFormFields
  buttonName: string
  modalId: string
}

const ProjectModalForm: React.FC<Props> = ({ modalId, onSubmit, defaultValues, buttonName }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="form-button">
        <button type="submit" disabled={isSubmitting}>
          {buttonName}
        </button>
      </div>
    </form>
  )
}

export default ProjectModalForm
