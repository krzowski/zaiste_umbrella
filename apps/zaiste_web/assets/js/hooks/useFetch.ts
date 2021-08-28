import * as React from "react"
import { AuthContext } from "../contexts/AuthContext"

type Action = { type: "fetch" } | { type: "success"; data: any } | { type: "error" }

function fetchReducer(_state: object, action: Action) {
  switch (action.type) {
    case "fetch":
      return {
        isLoading: true,
        data: null,
        errorMessage: null,
      }
    case "success":
      return {
        isLoading: false,
        data: action.data,
        errorMessage: null,
      }
    case "error":
      return {
        isLoading: false,
        data: null,
        errorMessage: "Error fetching data.",
      }
    default:
      throw new Error(`This action type isn't supported.`)
  }
}

interface fetchData {
  isLoading: boolean
  data: any
  errorMessage: string | null
}

const initialState: fetchData = {
  isLoading: true,
  data: null,
  errorMessage: null,
}

// Usage:
// const { isLoading, data, errorMessage } = useFetch(url, params)

function useFetch(url: string, params: any = null): fetchData {
  const { setAuthenticatedSession } = React.useContext(AuthContext)
  const [state, dispatch] = React.useReducer(fetchReducer, initialState)

  function fetchUrl() {
    if (params) return `${url}?${new URLSearchParams(params)}`
    return url
  }

  function handleErrors(response: any) {
    if (!response.ok) {
      if (response.status === 401) setAuthenticatedSession(false)

      throw Error(response.statusText)
    }

    return response
  }

  React.useEffect(() => {
    // 401 code breaks rendering when authentication state changes, because component
    // becomes unmounted. Ensure it's still mounted before dispatching actions.
    let isMounted = true

    dispatch({ type: "fetch" })

    fetch(fetchUrl(), {
      headers: { "Content-Type": "application/json" },
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        if (isMounted) dispatch({ type: "success", data: json.data })
      })
      .catch(_error => {
        if (isMounted) dispatch({ type: "error" })
      })

    return () => {
      isMounted = false
    }
  }, [url, JSON.stringify(params)])

  return {
    isLoading: state.isLoading,
    data: state.data,
    errorMessage: state.errorMessage,
  }
}

export default useFetch
