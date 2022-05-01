import styled from 'styled-components';

const AutoCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 70vw;
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 12px 20px;
  border: 1px solid #cccccc;
  span,
  strong {
    cursor: pointer;
    margin-top: 5px;
    &:hover {
      padding: 10px;
      background-color: #173b67;
      color: #ffffff
    }
  }
`;

export { AutocompleteInput, SuggestionContainer, AutoCompleteContainer };