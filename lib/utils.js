"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTransformResponse = defaultTransformResponse;
exports.createSearchParams = createSearchParams;
function defaultTransformResponse(data) {
    return {
        data: Array.isArray(data) ? data : data.data || [],
        totalCount: data.totalCount || data.total || (Array.isArray(data) ? data.length : 0),
        page: data.page,
        pageSize: data.pageSize,
    };
}
function createSearchParams(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams;
}
