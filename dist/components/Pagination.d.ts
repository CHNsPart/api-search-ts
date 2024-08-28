import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const Pagination: React.FC<PaginationProps>;
export {};
