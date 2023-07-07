import { handleErrorMessage, parseData } from './utils/utils.js';
import WebSocket from 'ws';
import { createUser } from './user/create-user.js';

export const requestHandler = (data: string, ws: WebSocket) => {
  try {
    const { cmd, dataNestedParsed } = parseData(data);

    switch (cmd) {
      case 'reg':
        createUser(dataNestedParsed, ws);
        break;

      // case 'create_room':
      //   createRoom(ws);
      //   break;

      // case 'add_user_to_room':
      //   addUserToRoom(dataNestedParsed, ws);
      //   break;

      // case 'add_ships':
      //   addShips(dataNestedParsed, ws);
      //   break;

      // case 'attack':
      //   getAttackData(dataNestedParsed);
      //   break;

      // case 'randomAttack':
      //   handleRandomAttack(dataNestedParsed);
      //   break;

      default:
        console.log('Unknown request!');
        break;
    }
    console.log(`Received request: ${cmd}, received data: ${dataNestedParsed}`);
  } catch (err) {
    const errMessage = handleErrorMessage(err);
    console.log(errMessage);
  }
};
