import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, List, ListItem, ListItemText, Paper, Link } from '@material-ui/core'


const Blogs = ({ blogs }) => {
  if(!blogs[0]){ return null }

  return (
    <>
      <Grid item xs={12} md={8}>
        <List dense={false}>
          {blogs.map( (blog) => (
            <div key={blog.id}>
              <Paper elevation={ 2 } style={{ marginBottom: '1%' }}>
                <ListItem>
                  <ListItemText
                    primary={<Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>}
                    secondary={ `by ${blog.author}`}
                  />
                </ListItem>
              </Paper>
            </div>
          ))}
        </List>
      </Grid>
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs