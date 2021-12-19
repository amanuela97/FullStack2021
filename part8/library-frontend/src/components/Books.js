import React,{useState} from 'react'

const Books = ({show, books}) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  if (!show || !books.data) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const allbooks = books.data.allBooks.filter( book => {
    return selectedGenre !== 'all genres' ? book.genres.includes(selectedGenre) : book
  })
  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{selectedGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {allbooks.map((a, index) =>
            <tr key={a.title + index}>
              <td>{a.title} </td>
              <td>{a.author.name} </td>
              <td>{a.published} </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {allbooks.map(book => {
          return book.genres.map((genre, index) => 
            <button key={genre + index} onClick={() => setSelectedGenre(genre)}>{genre}</button>
          )
        })}
        <button onClick={() => setSelectedGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books