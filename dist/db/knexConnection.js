"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_js_1 = __importDefault(require("./knexfile.js"));
const knex_1 = __importDefault(require("knex"));
const environment = (process.env.NODE_ENV || 'development');
const config = knexfile_js_1.default[environment];
const connection = (0, knex_1.default)(config);
exports.default = connection;
