import { handleErrorMessage, parseData } from './utils/utils.js';
import { WebSocket } from 'ws';
import { createUser } from './user/create-user.js';
import { createRoom, addUserToRoom, updateRoom } from './room/room-handler.js';
import { addShips, getAttackData, handleRandomAttack } from './game/game-handler.js';

export const requestHandler = (data: string, ws: WebSocket) => {
  try {
    const { cmd, dataNestedParsed } = parseData(data);

    switch (cmd) {
      case 'reg':
        createUser(dataNestedParsed, ws);
        updateRoom();
        break;

      case 'create_room':
        createRoom(ws);
        break;

      case 'add_user_to_room':
        addUserToRoom(dataNestedParsed, ws);
        break;

      case 'add_ships':
        addShips(dataNestedParsed, ws);
        break;

      case 'attack':
        getAttackData(dataNestedParsed, ws, cmd);
        break;

      case 'randomAttack':
        getAttackData(dataNestedParsed, ws, cmd);
        break;

      default:
        console.log('Unknown request!');
        break;
    }
    console.log(`Received request: ${cmd}, received data: ${JSON.stringify(dataNestedParsed)}`);
  } catch (err) {
    const errMessage = handleErrorMessage(err);
    console.log(errMessage);
  }
};
