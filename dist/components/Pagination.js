import React from 'react';
export const Pagination = ({ currentPage, totalPages, onPageChange, }) => {
    return (React.createElement("div", null, Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (React.createElement("button", { key: page, onClick: () => onPageChange(page), disabled: page === currentPage }, page)))));
};
