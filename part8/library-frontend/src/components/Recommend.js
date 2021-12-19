import React,{useEffect, useState} from 'react';
import { ME, ALL_BOOKS} from '../queries'
import {useLazyQuery, useQuery} from '@apollo/client'

const Recommend = ({show, books}) => {
    const meResponse = useQuery(ME)
    const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    const [me, setMe] = useState(null)
    const [Recbooks, setRecBooks] = useState([])
    
    useEffect(() => {
        if(meResponse.data && meResponse.data.me){
            setMe(meResponse.data.me)
            getBooks({variables: {genre: meResponse.data.me.favoriteGenre}})
        }
    },[meResponse.data, books.data]) // eslint-disable-line

    useEffect(() => {
        if(result.data){
            setRecBooks(result.data.allBooks)
        }
    }, [result.data, me]) 

    if(!show){
        return null
    }

    if(meResponse.loading){
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <strong>{me.favoriteGenre}</strong></p>
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
                {Recbooks.map((a, index) =>
                    <tr key={a.title + index}>
                    <td>{a.title} </td>
                    <td>{a.author.name} </td>
                    <td>{a.published} </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};


export default Recommend;