import WebSocket from 'ws';
import { wss } from '../web_socket_server/index.js';
import { NewUser } from '../utils/types.js';

export class Database {
  users: NewUser[] = [];
  mapUsers: Map<WebSocket, number> = new Map();
}

export const clients = wss.clients;
export const users: NewUser[] = [];
