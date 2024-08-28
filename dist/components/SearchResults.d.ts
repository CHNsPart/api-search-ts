import React from 'react';
interface SearchResultsProps<T> {
    results: T[];
    renderItem: (item: T) => React.ReactNode;
}
export declare function SearchResults<T>({ results, renderItem }: SearchResultsProps<T>): React.JSX.Element;
export {};
