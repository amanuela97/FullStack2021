import React, {useState, useEffect} from 'react'
import {EDIT_AUTHOR, ALL_AUTHORS} from '../queries'
import {useQuery,useMutation} from '@apollo/client'
import Select from 'react-select';

const Authors = ({show, setError, token}) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState(null);
  const authors = useQuery(ALL_AUTHORS)
  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError({message: error.graphQLErrors[0]?.message, color: 'red'})
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      const editedData = response.data.editAuthor
      const updatedAuthors = dataInStore.allAuthors.map( author => author.name === editedData.name ? editedData : author)
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: updatedAuthors,
        }
      })
    }
  })
  
  useEffect(()=> {
    if(result.data && result.data.editAuthor === null){
      setError({message: 'user not found', color: 'red'})
    }
  }, [result]) // eslint-disable-line

  if (!show || !authors.data) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if(!name || !born){
      setError({message: 'you must fill all fields', color: 'red'})
      return null
    }

    console.log('edit birthyear...')
    editAuthor({ variables: {name: name.value , setBornTo: parseInt(born)}})

    setBorn('')
  }


  if (authors.loading) {
    return <div>loading...</div>
  }

  let options = authors.data.allAuthors.map( author => author && {value: author.name, label: author.name})

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map((a, index) =>
            <tr key={a.name + index}>
              <td>{a.name} </td>
              <td>{a.born} </td>
              <td>{a.bookCount} </td>
            </tr>
          )}
        </tbody>
      </table>
    {token &&
    <>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            <Select
            defaultValue={name}
            onChange={setName}
            options={options}
            />
          </div>
          <div>
            born<input
            type='number'
            value={born} 
            onChange={({target}) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </>}
    </div>
  )
}

export default Authors
