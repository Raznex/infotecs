import './App.scss';
import SearchInput from '../SearchInput/SearchInput';
import Table from '../Table/Table';
import { useState } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='App'>
      <SearchInput onSearch={setSearchQuery} />
      <Table searchQuery={searchQuery} />
    </div>
  );
};

export default App;
