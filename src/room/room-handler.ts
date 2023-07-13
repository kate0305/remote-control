import { clients, users } from '../db/db.js';
import { WebSocket } from 'ws';
import { mapUsers } from '../user/create-user.js';
import { AddToRoomReq, Room } from '../utils/types.js';
import { createGame } from '../game/game-handler.js';

export const rooms = new Map<number, Room>();

const getUser = (ws: WebSocket) => {
  const userId = mapUsers.get(ws);
  const userData = users.find((user) => user.id === userId);
  return { userId, userData };
};

export const createRoom = (ws: WebSocket) => {
  const { userId, userData } = getUser(ws);
  if (userId && userData) {
    const firstPlayer = { index: userId, name: userData.login, ws: ws };
    const roomId = Date.now();
    const newRoom: Room = { roomId: roomId, roomUsers: [firstPlayer] };
    rooms.set(roomId, newRoom);

    clients.forEach((ws) => {
      const response = updateRoom();
      ws.send(JSON.stringify(response));
      console.log(`Response: ${JSON.stringify(response)}`);
    });
  } else {
    throw new Error('Such user not exist!');
  }
};

export const updateRoom = () => {
  const data = [...rooms.values()].map((room) => {
    return {
      roomId: room.roomId,
      roomUsers: room.roomUsers.map((user) => ({ index: user.index, name: user.name })),
    };
  });
  const dataAnswer = JSON.stringify(data);
  const answer = {
    type: 'update_room',
    data: dataAnswer,
    id: 0,
  };
  clients.forEach((ws) => {
    ws.send(JSON.stringify(answer));
    console.log(`Response: ${JSON.stringify(answer)}`);
  });
};

export const addUserToRoom = (data: AddToRoomReq, ws: WebSocket) => {
  const { userId, userData } = getUser(ws);
  const getRoom = rooms.get(data.indexRoom);
  const sameUser = getRoom?.roomUsers.find((user) => user.index === userId);
  if (sameUser) throw new Error('It is your room!');
  if (userId && userData && getRoom) {
    const secondPlayer = { index: userId, name: userData.login, ws: ws };
    getRoom.roomUsers.push(secondPlayer);
    createGame(getRoom);
    rooms.delete(data.indexRoom);
  } else {
    throw new Error('User not found!');
  }
  updateRoom();
};
