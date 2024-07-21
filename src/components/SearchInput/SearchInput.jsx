import React from 'react';

const SearchInput = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type='text'
      placeholder='Поиск...'
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default SearchInput;
