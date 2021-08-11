import React from 'react';

function Search({value, handleOnSearch}) {
    return (
        <>
         find countries: <input 
            value={value}
            onChange={handleOnSearch}
         />   
        </>
    );
}

export default Search;