import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Grid, Button, AppBar, Toolbar, Typography  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  core: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: theme.palette.common.white,
    backgorundSize: 'Cover',
  },
  link: {
    textDecoration: 'none',
    padding: 5,
    fontSize: '2vw',
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    }
  },
  buttonFont:{
    fontSize:'large',
    color: theme.palette.common.black
  },

  logo:{
    color: '#a1a1a1',
    justifyContent:'left',
    '&:hover':{
      background:'transparent'
    }
  },

  avatar:{
    height:'100%',
    borderRadius:0,


  },

  loginButton:{
    background: theme.palette.common.black,
    color:'#fff',
    borderRadius: '50%',
    padding:'0px 25px',

    '&:hover':{
      background: '#353935',
      boxShadow: '0px 2px 10px #888888'
    }
  },
  text: {
    marginRight: 5,
    fontSize: '1vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2vw',
    }
  }
}))


const Navigation = ({ user }) => {
  const dispatch = useDispatch()
  const classes = useStyles()


  const handleLogout = () => {
    dispatch(logoutUser())
  }


  return (
    <div className={classes.core}>
      { user !== null &&
        <AppBar position="static" color="default" className={classes.AppBar}>
          <Grid item sm={12} xs={12} >
            <Toolbar>
              <Grid className={classes.grow}>
                <Button className={classes.buttonFont}>
                  <Link  to='/' className={classes.link}>
                    Blogs
                  </Link>
                </Button>
                <Button color="inherit" className={classes.buttonFont}>
                  <Link to='/users' className={classes.link}>Users</Link>
                </Button>
              </Grid>
              <Typography variant='subtitle1' className={classes.text}>{user.username} logged in</Typography>
              <Button
                color="inherit"
                className={classes.loginButton}
                onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </Grid>
        </AppBar>
      }
    </div>
  )
}

export default Navigation