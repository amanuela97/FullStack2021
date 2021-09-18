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

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
          type: 'MESSAGE',
          data: message,
        })

        setTimeout(() => {
            dispatch({
                type: 'RESET'    
            })
        }, time * 1000)
    }
}


export default reducer