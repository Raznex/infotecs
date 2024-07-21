export const fetchUsers = async () => {
  const response = await fetch('https://dummyjson.com/users');
  return await response.json();
};
