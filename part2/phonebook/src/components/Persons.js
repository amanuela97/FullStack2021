import React from 'react';

function Persons({List, handleDelete}) {
    return (
        <>
         {List.map((person) => 
            <p key={person.id} >{person.name} {person.number} <button onClick={() => handleDelete(person.name,person.id)}>delete</button></p>
        )}   
        </>
    );
}

export default Persons;