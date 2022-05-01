import React from 'react';

import { Autocomplete } from './components';
import { getCockTails } from './services/cocktails';
import { Container } from './App.styles';

const App: React.FC = () => {

  const searchCocktails = async (text: string): Promise<string[] | null> => {
    const response = await getCockTails(text);
    return response ? response.map(({ strDrink }) => strDrink) : null;
  };

  return (
    <Container>
      <Autocomplete
        id="autoCocktails"
        name="autocompleteCocktails"
        fetchData={searchCocktails}
        placeholder="Search for a cocktail by name"
      />
    </Container>
  );
};

export default App;
