import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { logo } from '../../../layout/logo'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { AuthContext } from '../../../contexts/AuthContext'

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const { setAuthenticatedSession } = React.useContext(AuthContext)

  return (
    <div className="login-container">
      <div className="login-logo">
        {logo}
      </div>

      <div className="login-form">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(fields, { setSubmitting, setStatus }) => {
            setSubmitting(true)
            fetch('/api/sign_in', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'post',
              body: JSON.stringify(fields),
            }).then(response => {
              if (response.status === 204) setAuthenticatedSession(true)
              if (response.status === 401) setStatus({password: "Email or password is invalid"})
              setSubmitting(false)
            })
          }}
        >
          {() => (
            <Form>
              <div className="row form-email mt10">
                <Field name="email" type="text" placeholder="Email" className='numeric-font in-box' />
              </div>

              <div className="row form-password mt10">
                <Field name="password" type="password" placeholder="Password" className='form-numeric-font in-box' />
              </div>

              <div className="form-button mt10">
                <button type="submit">Sign in</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
