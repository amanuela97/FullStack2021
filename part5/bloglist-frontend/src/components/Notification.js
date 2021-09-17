import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ message }) => {

  if (message === null) {
    return null
  }
  return (
    <div className={message.status ? 'error' : 'success'}>
      {message.message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}
export default Notification