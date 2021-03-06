import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { useForm } from "react-hook-form"
import { logo } from "../../../layout/logo"
import { AuthContext } from "../../../contexts/AuthContext"
import { requestCreateSession } from "../../../api_calls/session"

const Login: React.FC<RouteComponentProps> = () => {
  const { setAuthenticatedSession } = React.useContext(AuthContext)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data: { email: string; password: string }) => {
    requestCreateSession(data).then(response => {
      if (response.status === 204) setAuthenticatedSession(true)
      if (response.status === 401)
        setError("password", { type: "manual", message: "Email or password is invalid" })
    })
  }

  return (
    <div className="login-container">
      <div className="login-logo">{logo}</div>

      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-email mt10">
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email")}
              type="text"
              placeholder="Email"
              required
              className="in-box"
              onClick={() => clearErrors("password")}
            />
          </div>

          <div className="row form-password mt10">
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("password")}
              type="password"
              placeholder="Password"
              required
              className="in-box"
              onClick={() => clearErrors("password")}
            />
          </div>

          {errors.password && <div className="login-error">{errors.password.message}</div>}

          <div className="form-button mt10">
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
