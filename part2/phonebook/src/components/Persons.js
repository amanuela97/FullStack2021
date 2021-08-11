import React from 'react';

function Persons({List}) {
    return (
        <>
         {List.map((person) => 
            <p key={person.name} >{person.name} {person.number}</p>
        )}   
        </>
    );
}

export default Persons;