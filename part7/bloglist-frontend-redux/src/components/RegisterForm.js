import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@material-ui/core'

const RegisterForm = ({ register }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
    password: '',
  })

  const handleRegister = async (event) => {
    event.preventDefault()
    register(userInfo)
    setUserInfo({
      username: '',
      name: '',
      password: '',
    })
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <TextField
            id="username"
            margin="dense"
            type="username"
            label="username"
            name='username'
            value={userInfo.username}
            variant="outlined"
            onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="name"
            margin="dense"
            type="name"
            label="name"
            name='name'
            value={userInfo.name}
            variant="outlined"
            onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })}
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
            value={userInfo.password}
            variant="outlined"
            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
            size="small"
          />
        </div>
        <Box mt={1} mb={1}>
          <Button
            variant='outlined'
            margin='dense'
            color='primary'
            id='create-blog'
            type="submit">register</Button>
        </Box>
      </form>
    </div>
  )
}


RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
}

export default RegisterForm