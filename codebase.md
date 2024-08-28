# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

# rollup.config.js

```js
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
    }),
  ],
  external: ['react', 'react-dom', 'axios'],
};
```

# package.json

```json
{
  "name": "api-search-ts",
  "version": "0.1.1",
  "description": "A React Typescript library for connecting search forms with API endpoints and providing reusable components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "type": "module",
  "scripts": {
    "build": "rollup -c rollup.config.mjs",
    "test": "jest",
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "react",
    "search",
    "api",
    "components"
  ],
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "author": "Touhidul Islam Chayan",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/CHNsPart/api-search-ts.git"
  },
  "dependencies": {
    "@types/node": "^22.5.1",
    "@types/react": "^18.3.4",
    "@types/react-dom": "^18.3.0",
    "axios": "^1.7.5",
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "rollup": "^4.21.1",
    "typescript": "^5.5.4"
  }
}

```

# jest.config.js

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
```

# README.md

```md

```

# .eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

# src/index.ts

```ts
export { SearchForm } from './components/SearchForm';
export { SearchResults } from './components/SearchResults';
export { Pagination } from './components/Pagination';
export { useSearchConnect } from './hooks/useSearchConnect';
export { searchConnect } from './utils/api';
export type { SearchConfig, SearchResult, SearchParams } from './utils/api';
```

# src/utils/api.ts

```ts
import axios, { AxiosRequestConfig } from 'axios';

export interface SearchConfig extends AxiosRequestConfig {
  endpoint: string;
}

export interface SearchResult<T = any> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export type SearchParams = Record<string, any>;

export async function searchConnect<T = any>(
  params: SearchParams,
  config: SearchConfig
): Promise<SearchResult<T>> {
  const { endpoint, ...axiosConfig } = config;
  const response = await axios.request({
    ...axiosConfig,
    url: endpoint,
    params,
  });

  return {
    data: response.data.data || response.data,
    totalCount: response.data.totalCount || response.data.length,
    page: response.data.page || 1,
    pageSize: response.data.pageSize || response.data.length,
  };
}
```

# src/hooks/useSearchConnect.ts

```ts
import { useState, useCallback } from 'react';
import { searchConnect, SearchConfig, SearchParams, SearchResult } from '../utils/api';

export function useSearchConnect<T = any>(config: SearchConfig) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<SearchResult<T> | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchConnect<T>(params, config);
      setResults(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { search, loading, error, results };
}
```

# src/components/SearchResults.tsx

```tsx
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
```

# src/components/SearchForm.tsx

```tsx
import React, { useState, FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (params: Record<string, any>) => void;
  fields: Array<{
    name: string;
    label: string;
    type: string;
  }>;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, fields }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button type="submit">Search</button>
    </form>
  );
};
```

# src/components/Pagination.tsx

```tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
```

