const reducer = (state = '', action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.data
        case 'RESET':
            return ''    
        default: 
            return state    
    }
}

let timerID = 0
export const setNotification = (message, time) => {
    return async dispatch => {
        clearTimeout(timerID)
        dispatch({
          type: 'MESSAGE',
          data: message,
        })

        timerID = setTimeout(() => {
            dispatch({
                type: 'RESET'    
            })
        }, time * 1000)
    }
}


export default reducer