"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function leaveRoom(userID, chatRoomUsers) {
    return chatRoomUsers.filter((user) => user.id != userID);
}
exports.default = leaveRoom;
