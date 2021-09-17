import React from 'react'
import {useDispatch} from 'react-redux'
import {filter} from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filter(event.target.value))
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

export default Filter