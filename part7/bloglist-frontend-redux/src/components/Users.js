import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/userReducer'
import { Link as RouterLink } from 'react-router-dom'
import { Paper, Table, TableCell, TableHead, TableRow, TableContainer, TableBody, Link, Grid } from '@material-ui/core'


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.usersList)
  useEffect(() => {
    dispatch(setUsers())
  }, [])
  return (
    <Grid  item xs={12} md={8}>
      <h1>
        added blogs
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Usernames</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link component={RouterLink} to={`/users/${user.id}`} >{user.username}</Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default Users