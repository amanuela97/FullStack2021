import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@material-ui/core'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            margin="dense"
            type="text"
            label="username"
            name='username'
            value={username}
            variant="outlined"
            onChange={({ target }) => setUsername(target.value)}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="password"
            margin="dense"
            type="password"
            label="password"
            name='password'
            value={password}
            variant="outlined"
            onChange={({ target }) => setPassword(target.value)}
            size="small"
          />
        </div>
        <Box mt={1} mb={1}>
          <Button
            variant='outlined'
            margin='dense'
            color='primary'
            id='create-blog'
            type="submit">login</Button>
        </Box>
      </form>
    </div>
  )
}


LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm