import React from 'react';

interface SearchResultsProps<T> {
  results: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function SearchResults<T>({ results, renderItem }: SearchResultsProps<T>) {
  return (
    <div>
      {results.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}