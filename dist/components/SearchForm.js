import React, { useState } from 'react';
export const SearchForm = ({ onSearch, fields }) => {
    const [formData, setFormData] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    return (React.createElement("form", { onSubmit: handleSubmit },
        fields.map(field => (React.createElement("div", { key: field.name },
            React.createElement("label", { htmlFor: field.name }, field.label),
            React.createElement("input", { type: field.type, id: field.name, name: field.name, value: formData[field.name] || '', onChange: handleInputChange })))),
        React.createElement("button", { type: "submit" }, "Search")));
};
