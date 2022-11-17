const reducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.data
    case 'RESET':
      return null
    default:
      return state
  }
}

let timerID
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      data: message,
    })

    if (timerID) clearTimeout(timerID)

    timerID = setTimeout(() => {
      dispatch({
        type: 'RESET',
      })
    }, time * 1000)
  }
}

export default reducer
