import React, { useState } from 'react';

import { AutocompleteInput } from './styles';

interface AutocompleteProps {
  fetchData: (text: string) => Promise<string[] | null>,
  placeholder?: string,
  className?: string,
}

interface HighlightedProps {
  text: string,
  highlight: string,
}

  const Highlighted: React.FC<HighlightedProps> = ({ text, highlight }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.filter(String).map((part, index) => {
          return regex.test(part) ? (
            <mark key={`${part}-${index}`}>{part}</mark>
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
    setSuggestions(matches || [""]);
    setText(text);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

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
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <div key={`${suggestion}-${index}`}>
            <Highlighted text={suggestion} highlight={text} />
          </div>
        ))}
    </div>
  );
};

export default Autocomplete;
