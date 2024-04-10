import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  suggestionsTrigger: boolean;
  suggestions: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: () => void;
  handleDeleteSuggestions: () => void;
  handleSuggestionClick: (value: string) => void;
  handleDeleteSuggestion: (index: number) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  suggestionsTrigger,
  suggestions,
  handleInputChange,
  handleInputClick,
  handleDeleteSuggestions,
  handleSuggestionClick,
  handleDeleteSuggestion,
  handleSearch,
}) => {
  return (
    <div className="search-bar">
      <div id="search-suggestions-container">
        <input
          type="text"
          placeholder=""
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputClick}
          list="search-suggestions"
        />
        {suggestionsTrigger && suggestions.length > 0 && (
          <ul id="search-suggestions">
            <li className="search-suggestions-header">
              <div className="recent_searches">RECENT SEARCHES</div>
              <div className="clear" onClick={handleDeleteSuggestions}>
                CLEAR
              </div>
            </li>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <div
                  className="search-suggestions-word"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
                <div
                  className="suggestion-delete-button"
                  onClick={() => handleDeleteSuggestion(index)}
                >
                  X
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
