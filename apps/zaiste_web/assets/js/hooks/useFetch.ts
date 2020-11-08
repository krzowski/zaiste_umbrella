import * as React from 'react'


function fetchReducer(state, action) {
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
  isLoading: boolean,
  data: any,
  errorMessage: string | null,
}

function useFetch(url: string, use_effect_condition: Array<any>): fetchData {
  const [state, dispatch] = React.useReducer(
    fetchReducer,
    { isLoading: true, data: null, errorMessage: null }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetch(url)
      .then(res => res.json())
      .then(res_data => {
        dispatch({ type: 'success', data: res_data.data })
      })
      .catch(_error => {
        dispatch({ type: 'error' })
      })
  }, use_effect_condition)

  return {
    isLoading: state.isLoading,
    data: state.data,
    errorMessage: state.errorMessage
  }
}

export default useFetch
