import * as React from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'

import ModalCard from '../shared/ModalCard'


interface Props {
  modalId: string
  closeModal: Function
}


const NewTransactionModal: React.FC<Props> = ({ modalId, closeModal }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: format(new Date(), "dd / MM / yyyy"),
      name: ''
    }
  })
  const onSubmit = (data, e) => { }

  React.useEffect(() => {
    const name_input: HTMLElement = document.getElementById(modalId)!.querySelector('input#name')!
    name_input.focus()
  }, [])

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="New transaction"
      closeModal={closeModal}
      modalWidth={300}
      modalHeight={200}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 500}
    >
      <div className="card-form new-transaction p15">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <label htmlFor="date">Date</label>
            <input {...register('date')}
              required
              className='in-box mt5'
            />
          </div>

          <div className="row mt10">
            <label htmlFor="name">Name</label>
            <input {...register('name')}
              id="name"
              required
              className='in-box mt5'
            />
          </div>

          <div className="form-button mt20">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </ModalCard>
  )
}

export default NewTransactionModal

