import React from 'react';

const SearchField = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      Filter Search: <input type="text" value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchField;