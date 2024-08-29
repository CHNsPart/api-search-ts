![api-search-ts](https://github.com/user-attachments/assets/278fb229-ba76-4080-931c-a682fc926657)
 # api-search-ts

A powerful and flexible React TypeScript library for creating advanced search interfaces with API integration.

## Features

- Easy-to-use React components for search forms and results display
- Custom hooks for seamless API integration
- TypeScript support for better type safety and developer experience
- Pagination support out of the box
- Customizable and extensible components

<p align="center">
  <img src="https://github.com/user-attachments/assets/6eb930f6-9dce-46e8-b06c-9a909ad965f6" width="100%" />
</p>

## Installation

```bash
npm install api-search-ts
```

## Usage

### Basic Example

Here's a simple example of how to use the main components of api-search-ts:

```tsx
import React from 'react';
import { useSearchConnect, SearchForm, SearchResults, Pagination } from 'api-search-ts';

const SearchPage = () => {
  const { search, loading, error, results } = useSearchConnect({
    endpoint: 'https://api.example.com/search',
    method: 'GET',
  });

  const handleSearch = (params) => {
    search(params);
  };

  const handlePageChange = (page) => {
    search({ ...results, page });
  };

  return (
    <div>
      <SearchForm
        onSearch={handleSearch}
        fields={[
          { name: 'query', label: 'Search', type: 'text' },
          { name: 'category', label: 'Category', type: 'select' },
        ]}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {results && (
        <>
          <SearchResults
            results={results.data}
            renderItem={(item) => <div>{item.title}</div>}
          />
          <Pagination
            currentPage={results.page}
            totalPages={Math.ceil(results.totalCount / results.pageSize)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
```

### Advanced Usage

For more complex search interfaces, you can customize the components and use additional features:

1. **Custom Search Form Fields**:
   You can define custom fields for your search form, including different input types:

   ```tsx
   <SearchForm
     onSearch={handleSearch}
     fields={[
       { name: 'query', label: 'Search Query', type: 'text' },
       { name: 'category', label: 'Category', type: 'select' },
       { name: 'dateFrom', label: 'From Date', type: 'date' },
       { name: 'dateTo', label: 'To Date', type: 'date' },
     ]}
   />
   ```
2. **Custom Result Rendering**:
   Customize how each search result is displayed:

   ```tsx
   <SearchResults
     results={results.data}
     renderItem={(item) => (
       <div key={item.id} className="search-item">
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <img src={item.thumbnail} alt={item.title} />
       </div>
     )}
   />
   ```
3. **Pagination with Custom Styling**:
   Apply custom styles to the pagination component:

   ```tsx
   <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={handlePageChange}
     className="custom-pagination"
     activeClassName="active-page"
   />
   ```
4. **Using with TypeScript**:
   Leverage TypeScript for better type checking:

   ```tsx
   interface SearchItem {
     id: number;
     title: string;
     description: string;
   }

   const { search, results } = useSearchConnect<SearchItem>({
     endpoint: 'https://api.example.com/search',
   });

   // Now 'results.data' will be correctly typed as SearchItem[]
   ```
5. **Custom API Configuration**:
   Pass custom Axios configurations to the `useSearchConnect` hook:

   ```tsx
   const { search } = useSearchConnect({
     endpoint: 'https://api.example.com/search',
     method: 'POST',
     headers: {
       'Authorization': 'Bearer your-token-here',
     },
     timeout: 5000,
   });
   ```

## API Reference

### useSearchConnect

A custom hook for connecting to your search API.

```tsx
const { search, loading, error, results } = useSearchConnect(config);
```

- `config`: AxiosRequestConfig & { endpoint: string }
- Returns:
  - `search`: (params: SearchParams) => Promise`<void>`
  - `loading`: boolean
  - `error`: Error | null
  - `results`: SearchResult`<T>` | null

### SearchForm

A component for rendering a customizable search form.

```tsx
<SearchForm onSearch={handleSearch} fields={fields} />
```

- `onSearch`: (params: Record<string, any>) => void
- `fields`: Array<{ name: string, label: string, type: string }>

### SearchResults

A component for rendering search results.

```tsx
<SearchResults results={results} renderItem={renderItem} />
```

- `results`: T[]
- `renderItem`: (item: T) => React.ReactNode

### Pagination

A component for handling result pagination.

```tsx
<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
```

- `currentPage`: number
- `totalPages`: number
- `onPageChange`: (page: number) => void

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
