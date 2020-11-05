import * as React from 'react'


function fetchReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      isLoading: true,
      data: null,
      error: null,
    }
  } else if (action.type === 'success') {
    return {
      isLoading: false,
      data: action.data,
      error: null,
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      isLoading: false,
      data: null,
      error: 'Error fetching data.',
    }
  } else {
    throw new Error(`This action type isn't supported.`)
  }
}


interface fetchData {
  isLoading: boolean,
  data: Array<object> | null,
  error: string | null,
}

function useFetch(url: string, effect_condition: Array<any>): fetchData {
  const [state, dispatch] = React.useReducer(
    fetchReducer,
    { isLoading: true, data: null, error: null }
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
  }, effect_condition)

  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error
  }
}

export default useFetch
