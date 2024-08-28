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