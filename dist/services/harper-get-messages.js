"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function harperGetMessages(room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw)
        return null;
    let data = JSON.stringify({
        operation: 'sql',
        sql: `SELECT * FROM sparkles.messages WHERE room = '${room}' LIMIT 100`,
    });
    let config = {
        method: 'post',
        url: dbUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: dbPw,
        },
        data: data,
    };
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(config)
            .then(function (response) {
            resolve(JSON.stringify(response.data));
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.default = harperGetMessages;
