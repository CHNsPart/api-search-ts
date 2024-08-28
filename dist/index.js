'use strict';

var React = require('react');
var axios = require('axios');

const SearchForm = ({ onSearch, fields }) => {
    const [formData, setFormData] = React.useState({});
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

function SearchResults({ results, renderItem }) {
    return (React.createElement("div", null, results.map((item, index) => (React.createElement("div", { key: index }, renderItem(item))))));
}

const Pagination = ({ currentPage, totalPages, onPageChange, }) => {
    return (React.createElement("div", null, Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (React.createElement("button", { key: page, onClick: () => onPageChange(page), disabled: page === currentPage }, page)))));
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function searchConnect(params, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { endpoint } = config, axiosConfig = __rest(config, ["endpoint"]);
        const response = yield axios.request(Object.assign(Object.assign({}, axiosConfig), { url: endpoint, params }));
        return {
            data: response.data.data || response.data,
            totalCount: response.data.totalCount || response.data.length,
            page: response.data.page || 1,
            pageSize: response.data.pageSize || response.data.length,
        };
    });
}

function useSearchConnect(config) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [results, setResults] = React.useState(null);
    const search = React.useCallback((params) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        try {
            const result = yield searchConnect(params, config);
            setResults(result);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }), [config]);
    return { search, loading, error, results };
}

exports.Pagination = Pagination;
exports.SearchForm = SearchForm;
exports.SearchResults = SearchResults;
exports.searchConnect = searchConnect;
exports.useSearchConnect = useSearchConnect;
//# sourceMappingURL=index.js.map
