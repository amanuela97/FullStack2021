const reducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data.text
        default: 
            return state    
    }
}

export const filter = (text) => {
    return {
        type: 'FILTER',
        data: {text}
    }
}

export default reducer