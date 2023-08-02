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
exports.addUser = exports.getParticipantByUsername = exports.getUsers = void 0;
const knexConnection_ts_1 = __importDefault(require("./knexConnection.ts"));
function getUsers(db = knexConnection_ts_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db('users').select('*');
    });
}
exports.getUsers = getUsers;
function getParticipantByUsername(username, db = knexConnection_ts_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        const [user] = yield db('users').where({ username: username }).returning('*');
        return user;
    });
}
exports.getParticipantByUsername = getParticipantByUsername;
function addUser(newUser, db = knexConnection_ts_1.default) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, bio, image } = newUser;
        yield db('users').where('username', username).update({
            username,
            bio,
            image,
        });
        return newUser;
    });
}
exports.addUser = addUser;
