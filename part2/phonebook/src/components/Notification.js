import React from "react";

const Notification = ({ message}) => {

    if (message.message === null) {
        return null
    }
      
    return (
    <div className={message.state ? "error" : "success"}>
        {message.message}
    </div>
    )
}

export default Notification;