import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../utils/api';
import './Table.scss';

const Table = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'none',
  });

  useEffect(() => {
    fetchUsers().then((res) => {
      setUsers(res.users);
    });
  }, []);

  const arr = [
    'firstName',
    'lastName',
    'age',
    'gender',
    'phone',
    'address.city',
    'address.address',
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Задержка в 300 мс

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      let filteredUsers = [];
      let hasResults = false;

      for (const item of arr) {
        const response = await fetch(
          `https://dummyjson.com/users/filter?key=${item}&value=${debouncedQuery}`
        );
        const data = await response.json();
        if (data.total !== 0) {
          filteredUsers = [...filteredUsers, ...data.users];
          hasResults = true;
        }
      }

      if (hasResults) {
        setUsers(filteredUsers);
      } else {
        fetchUsers().then((res) => {
          setUsers(res.users);
        });
      }
    };

    if (debouncedQuery) {
      fetchFilteredUsers();
    }
  }, [debouncedQuery]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === 'descending'
    ) {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    if (sortConfig.key && sortConfig.direction !== 'none') {
      return [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return users;
  }, [users, sortConfig]);

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return ' ↑';
      } else if (sortConfig.direction === 'descending') {
        return ' ↓';
      }
    }
    return '';
  };

  return (
    <div className='table'>
      <table className='table__container' style={{}}>
        <thead>
          <tr>
            <th className='table__header'>
              <div
                className='table__header-column'
                onClick={() => handleSort('firstName')}
              >
                <p className='table__header-title'>ФИО</p>
                {getSortArrow('firstName')}
              </div>
            </th>
            <th className='table__header'>
              <div
                onClick={() => handleSort('age')}
                className='table__header-column'
              >
                <p className='table__header-title'>Возраст</p>
                {getSortArrow('age')}
              </div>
            </th>
            <th className='table__header'>
              <div
                className='table__header-column'
                onClick={() => handleSort('gender')}
              >
                <p className='table__header-title'>Пол</p>
                {getSortArrow('gender')}
              </div>
            </th>
            <th className='table__header'>
              <div className='table__header-column'>
                <p className='table__header-title'>Номер телефона</p>
              </div>
            </th>
            <th className='table__header'>
              <div className='table__header-column'>
                <p className='table__header-title'>Адрес</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td className='table__body-column'>{`${user.firstName} ${user.lastName}`}</td>
              <td className='table__body-column'>{user.age}</td>
              <td className='table__body-column'>{user.gender}</td>
              <td className='table__body-column'>{user.phone}</td>
              <td className='table__body-column'>{`${user.address.city}, ${user.address.address}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
