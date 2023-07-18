import { users } from '../db/db.js';
import { rooms, updateRoom } from '../room/room-handler.js';
import { mapUsers } from '../user/create-user.js';
import { Data } from './types.js';
import { WebSocket } from 'ws';

export const parseData = (data: string) => {
  if (!data) throw new Error('Data is empty');
  const dataParsed: Data = JSON.parse(data);
  const cmd = dataParsed.type;
  if (cmd === 'create_room') {
    return { cmd };
  } else {
    const dataNestedParsed = getParsedNestedDate(dataParsed.data);
    return { cmd, dataNestedParsed };
  }
};

export const handleErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return String(err);
};

const getParsedNestedDate = (data: string) => {
  if (!data) throw new Error('Data is empty');
  const dataParsed = JSON.parse(data);
  return dataParsed;
};

export const handleCloseWs = (ws: WebSocket) => {
  const userId = mapUsers.get(ws);
  const user = users.find(user => user.id === userId);
  const room = [...rooms.values()].find(room => room.roomUsers.find(user => user.index === userId));
  if (room?.roomUsers.length === 1) {
    rooms.delete(room.roomId);
    updateRoom();
  } 
  console.log(`User with login ${user?.login} left the game`);
};
