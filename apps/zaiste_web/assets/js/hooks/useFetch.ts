import * as React from 'react'


type Action =
  | { type: 'fetch' }
  | { type: 'success', data: any }
  | { type: 'error' }

function fetchReducer(_state: object, action: Action) {
  if (action.type === 'fetch') {
    return {
      isLoading: true,
      data: null,
      errorMessage: null,
    }
  } else if (action.type === 'success') {
    return {
      isLoading: false,
      data: action.data,
      errorMessage: null,
    }
  } else if (action.type === 'error') {
    return {
      isLoading: false,
      data: null,
      errorMessage: 'Error fetching data.',
    }
  } else {
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
  errorMessage: null
}

function useFetch(url: string, params: any = null): fetchData {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState)

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    let full_url = url
    if ( params ) full_url = url + '?' + new URLSearchParams(params)

    fetch(full_url).then(res => res.json())
      .then(res_data => {
        dispatch({ type: 'success', data: res_data.data })
      })
      .catch(_error => {
        dispatch({ type: 'error' })
      })
  }, [])

  return {
    isLoading: state.isLoading,
    data: state.data,
    errorMessage: state.errorMessage
  }
}

export default useFetch
