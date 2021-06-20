import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { logo } from '../../../layout/logo'
import { useForm } from 'react-hook-form'


import { AuthContext } from '../../../contexts/AuthContext'

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const { setAuthenticatedSession } = React.useContext(AuthContext)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = (data, e) => {
    fetch('/api/sign_in', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data),
    }).then(response => {
      if (response.status === 204) setAuthenticatedSession(true)
      if (response.status === 401) setError("password", { type: "manual", message: "Email or password is invalid" })
    })
  }

  return (
    <div className="login-container">
      <div className="login-logo">
        {logo}
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-email mt10">
            <input {...register('email')}
              type="text"
              placeholder="Email"
              required
              className='in-box'
              onClick={() => clearErrors('password')}
            />
          </div>

          <div className="row form-password mt10">
            <input {...register('password')}
              type="password"
              placeholder="Password"
              required
              className='in-box'
              onClick={() => clearErrors('password')}
            />
          </div>

          {errors.password && <div className="login-error">{errors.password.message}</div>}

          <div className="form-button mt10">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
