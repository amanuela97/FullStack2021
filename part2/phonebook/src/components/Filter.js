import React from 'react';

function Filter({search, handleSearch}) {
    return (
        <div>
            filter by name: <input
            value={search}
            onChange={handleSearch}
            /> 
        </div>
    );
}

export default Filter;