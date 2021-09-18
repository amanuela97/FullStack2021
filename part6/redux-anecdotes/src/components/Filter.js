import React from 'react'
import {connect} from 'react-redux'
import {filter} from '../reducers/filterReducer'

const Filter = ({filter}) => {

  const handleChange = (event) => {
    filter(event.target.value)
  }
  const style = {
    marginBottom: 10,
    marginTop: 5
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null,{filter})(Filter)