import { RegReq } from '../utils/types.js';
import { users } from '../db/db.js';
import { User } from './user.entity.js';
import { WebSocket } from 'ws';

export const mapUsers: Map<WebSocket, number> = new Map();

const validateUser = ({ name, password }: RegReq, ws: WebSocket) => {
  const existUserName = users.find((user) => user.login === name);
  if (!mapUsers.has(ws) && !existUserName) {
    if (typeof name === 'string' && typeof password === 'string' && name.length > 4 && password.length > 4) return true;
  } else {
    return false;
  }
};

const handleResponse = (name: string, id: number, error: boolean, errorText: string, ws: WebSocket) => {
  const dataAnswer = JSON.stringify({
    name: name,
    index: id,
    error: error,
    errorText: errorText,
  });
  const answer = {
    type: 'reg',
    data: dataAnswer,
    id: 0,
  };
  ws.send(JSON.stringify(answer));
};

export const createUser = ({ name, password }: RegReq, ws: WebSocket) => {
  if (validateUser({ name, password }, ws)) {
    const newUser = new User(name, password);
    mapUsers.set(ws, newUser.id);
    users.push(newUser);
    handleResponse(name, newUser.id, false, '', ws);
  } else {
    handleResponse(name, 0, true, 'Such user already exists!', ws);
  }
};
