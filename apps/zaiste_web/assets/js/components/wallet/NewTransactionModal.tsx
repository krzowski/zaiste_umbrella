import * as React from 'react'

import { Formik, Field, Form } from 'formik';
import { format } from 'date-fns'

import ModalCard from '../shared/ModalCard'


interface Props {
  modalId: string
  closeModal: Function
}


const NewTransactionModal: React.FC<Props> = ({ modalId, closeModal }) => {
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
        <Formik
          initialValues={{
            date: format(new Date(), "dd / MM / yyyy"),
            name: '',
          }}
          onSubmit={(values) => { }}
        >
          <Form>
            <div className="row">
              <label htmlFor="date">Date</label>
              <Field id="date" name="date" className='numeric-font in-box mt5' />
            </div>

            <div className="row mt10">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" className='numeric-font in-box mt5' />
            </div>

            <div className="form-button mt20">
              <button type="submit">Add</button>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalCard>
  )
}

export default NewTransactionModal

