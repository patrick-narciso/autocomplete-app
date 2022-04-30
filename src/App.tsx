import React, { useEffect, useState } from 'react';

import { Autocomplete } from './components';
import { getUsers } from './services/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      setUsers(users.map(({ email }) => email));
    }
    loadUsers();
  }, []);

  return <Autocomplete data={users} placeholder="Search for email user" />
};

export default App;
