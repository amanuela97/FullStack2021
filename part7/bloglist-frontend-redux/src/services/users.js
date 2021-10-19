import axios from 'axios'
const baseUrl = '/api/users'


const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (user) => {
  const res = await axios.post(baseUrl, user)
  return res.data
}

export default { getAllUsers, addUser }