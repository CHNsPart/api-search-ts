import React from 'react';
interface SearchFormProps {
    onSearch: (params: Record<string, any>) => void;
    fields: Array<{
        name: string;
        label: string;
        type: string;
    }>;
}
export declare const SearchForm: React.FC<SearchFormProps>;
export {};
