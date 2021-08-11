import React from 'react';

function PersonForm({formHandlers}) {
    const [
        newName,
        newNumber,
        handleSubmit, 
        handleNameChange,
        handleNumberChange
    ] = formHandlers
    
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input 
          value={newName}
          required={true}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          required={true}
          onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default PersonForm;