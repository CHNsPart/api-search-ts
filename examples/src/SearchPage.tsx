import React, { useState } from 'react';
import { useSearchConnect, SearchForm, SearchResults, Pagination } from 'api-search-ts';

interface SearchItem {
  id: number;
  title: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { search, loading, error, results } = useSearchConnect<SearchItem>({
    endpoint: 'https://api.example.com/search',
    method: 'GET',
  });

  const handleSearch = (params: Record<string, any>) => {
    search({ ...params, page: currentPage });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (results) {
      search({ ...results, page });
    }
  };

  const renderSearchItem = (item: SearchItem) => (
    <div key={item.id} className="search-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );

  return (
    <div className="search-page">
      <h1>Advanced Search</h1>
      <SearchForm
        onSearch={handleSearch}
        fields={[
          { name: 'query', label: 'Search Query', type: 'text' },
          { name: 'category', label: 'Category', type: 'select' },
          { name: 'dateFrom', label: 'From Date', type: 'date' },
          { name: 'dateTo', label: 'To Date', type: 'date' },
        ]}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {results && (
        <>
          <SearchResults<SearchItem>
            results={results.data}
            renderItem={renderSearchItem}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(results.totalCount / results.pageSize)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;