"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchConnect = searchConnect;
exports.createSearchConnector = createSearchConnector;
exports.withPagination = withPagination;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
function searchConnect(params, config, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const axiosConfig = Object.assign(Object.assign({}, config), { url: config.endpoint });
            if (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'GET') {
                axiosConfig.params = (0, utils_1.createSearchParams)(params);
            }
            else {
                axiosConfig.data = params;
            }
            const response = yield (0, axios_1.default)(axiosConfig);
            const transformResponse = (options === null || options === void 0 ? void 0 : options.transformResponse) || utils_1.defaultTransformResponse;
            const result = transformResponse(response.data);
            if (options === null || options === void 0 ? void 0 : options.onSuccess) {
                options.onSuccess(result);
            }
            return result;
        }
        catch (error) {
            if (options === null || options === void 0 ? void 0 : options.onError) {
                options.onError(error);
            }
            throw error;
        }
    });
}
function createSearchConnector(defaultConfig, defaultOptions) {
    return (params, configOverrides, optionsOverrides) => {
        const mergedConfig = Object.assign(Object.assign({}, defaultConfig), configOverrides);
        const mergedOptions = Object.assign(Object.assign({}, defaultOptions), optionsOverrides);
        return searchConnect(params, mergedConfig, mergedOptions);
    };
}
function withPagination(searchFn) {
    return (params_1, ...args_1) => __awaiter(this, [params_1, ...args_1], void 0, function* (params, paginationOptions = {}) {
        const { page = 1, pageSize = 10 } = paginationOptions;
        const paginatedParams = Object.assign(Object.assign({}, params), { page,
            pageSize });
        return searchFn(paginatedParams);
    });
}
