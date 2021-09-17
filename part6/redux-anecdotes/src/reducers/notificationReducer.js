const reducer = (state = '', action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.data.message
        case 'RESET':
            return ''    
        default: 
            return state    
    }
}

export const setMessage = (message) => {
    return {
        type: 'MESSAGE',
        data: {message}
    }
}

export const resetMessage = () => {
    return {
        type: 'RESET',
    }
}


export default reducer