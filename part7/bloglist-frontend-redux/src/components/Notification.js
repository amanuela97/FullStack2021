import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const Notification = () => {
  const message = useSelector((store) => store.notification)
  if (!message) {
    return null
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={message.status ? 'error' : 'success'}>
        {message.message}
      </Alert>
    </Stack>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}
export default Notification