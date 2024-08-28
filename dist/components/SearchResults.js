import React from 'react';
export function SearchResults({ results, renderItem }) {
    return (React.createElement("div", null, results.map((item, index) => (React.createElement("div", { key: index }, renderItem(item))))));
}
