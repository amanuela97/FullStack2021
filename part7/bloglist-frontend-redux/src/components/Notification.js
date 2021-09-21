import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector((store) => store)

  if (!message) {
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