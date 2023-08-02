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
exports.getMsgsByUsername = exports.getMsgs = void 0;
const knexConnection_js_1 = __importDefault(require("./knexConnection.ts"));
function getMsgs(db = knexConnection_js_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield (0, knexConnection_js_1.default)('msg').where('*').returning('*');
            return messages;
        }
        catch (error) {
            throw new Error('Error fetching messages: ' + error.message);
        }
    });
}
exports.getMsgs = getMsgs;
function getMsgsByUsername(username, db = knexConnection_js_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        const [userMsgs] = yield (0, knexConnection_js_1.default)('msgs')
            .where({ username: username })
            .returning('msg');
        return userMsgs;
    });
}
exports.getMsgsByUsername = getMsgsByUsername;
