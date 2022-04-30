import React, { useState } from 'react';

import { AutocompleteInput } from './styles';

interface Props {
  data: string[],
  placeholder?: string,
  className?: string,
}

const Autocomplete: React.FC<Props> = ({ data, className, placeholder = '' }) => {
  const [text, setText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChangeHandler = (text: HTMLInputElement["value"]) => {
    if (!text.length) {
      setText('');
      setSuggestions([]);
      return false;
    };
    const matches = data.filter((value) => {
      const regex = new RegExp(`${text}`, "gi");
      return value.match(regex);
    });
    setSuggestions(matches);
    setText(text);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  }

  return (
    <div>
      <AutocompleteInput
        className={className}
        placeholder={placeholder}
        value={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event.target.value)
        }
        onBlur={onBlurHandler}
      />
      {suggestions && suggestions.map((suggestion, index) => <div key={`${suggestion}-${index}`}>{suggestion}</div>)}
    </div>
  );
}

export default Autocomplete;
