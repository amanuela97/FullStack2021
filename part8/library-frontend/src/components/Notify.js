import React from "react"

const Notify = ({error}) => {
    if(!error){
        return null
    }

    return <div style={{color: 'red'}}>{error}</div>
}

export default Notify