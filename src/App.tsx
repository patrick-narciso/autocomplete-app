import React, { useEffect } from 'react';

import { Autocomplete } from './components';
import { getUsers } from './services/users';

const App: React.FC = () => {
  useEffect(() => {
    getUsers().then((response) => console.log(response));
  }, []);

  return <Autocomplete />
};

export default App;
