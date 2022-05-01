import React, { MouseEventHandler, useState } from 'react';

import { AutocompleteInput, SuggestionContainer, AutoCompleteContainer } from "./styles";

interface AutocompleteProps {
  fetchData: (text: string) => Promise<string[] | null>,
  placeholder?: string,
  className?: string,
  type?: string,
  id: string,
  name: string,
}

interface HighlightedProps {
  text: string,
  highlight: string,
  onClick: MouseEventHandler,
}

const Highlighted: React.FC<HighlightedProps> = ({
  text,
  highlight,
  onClick,
}) => {
  if (!highlight.trim()) {
    return <span onClick={onClick}>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span onClick={onClick}>
      {parts.filter(String).map((part, index) => {
        return regex.test(part) ? (
          <strong key={`${part}-${index}`}>{part}</strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        );
      })}
    </span>
  );
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  fetchData,
  className,
  placeholder = "",
  type = "text",
  id,
  name,
}) => {
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChangeHandler = async (text: HTMLInputElement["value"]) => {
    if (!text.length) {
      setText("");
      setSuggestions([]);
      return false;
    }
    const data = await fetchData(text);
    const matches = data?.filter((value) => {
      const regex = new RegExp(`${text}`, "gi");
      return value.match(regex);
    });
    setSuggestions(matches || []);
    setText(text);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 500);
  };

  const onSuggestHandler = (text: string) => {
    setText(text);
    setSuggestions([]);
  };

  return (
    <AutoCompleteContainer>
      <AutocompleteInput
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        value={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event.target.value)
        }
        onBlur={onBlurHandler}
      />
      {suggestions.length > 0 && (
        <SuggestionContainer>
          {suggestions.map((suggestion, index) => (
            <Highlighted
              key={`${suggestion}-${index}`}
              text={suggestion}
              highlight={text}
              onClick={() => onSuggestHandler(suggestion)}
            />
          ))}
        </SuggestionContainer>
      )}
    </AutoCompleteContainer>
  );
};

export default Autocomplete;
