import React from "react"

const Notify = ({error}) => {
    if(!error || !error.message){
        return null
    }

    return <div style={{color: error.color}}>{error.message}</div>
}

export default Notify