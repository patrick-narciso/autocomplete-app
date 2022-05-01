import React from 'react';

import { Autocomplete } from './components';
import { getCockTails } from './services/cocktails';

const App: React.FC = () => {

  const searchCocktails = async (text: string): Promise<string[] | null> => {
    const response = await getCockTails(text);
    return response ? response.map(({ strDrink }) => strDrink) : null;
  };

  return <Autocomplete fetchData={searchCocktails} placeholder="Search for a cocktail by name" />
};

export default App;
