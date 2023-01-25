import { getDown, getLeft, getPosition, getRight, getUp, getRectangle, getSquare } from './mouseHandler.js';
import { handleErrorMessage, parseCommand } from '../utils.js';

export const commandHandler = async (data: string): Promise<void | string> => {
  try {
    const { cmd, direction, number, length } = parseCommand(data);
    let result = '';
    console.log(`Received command: ${cmd}`);
    switch (direction) {
      case 'left':
        await getLeft(number);
        result = data;
        break;
      case 'right':
        await getRight(number);
        result = data;
        break;
      case 'up':
        await getUp(number);
        result = data;
        break;
      case 'down':
        await getDown(number);
        result = data;
        break;
      case 'position':
        result = await getPosition();
        break;
      case 'rectangle':
        result = await getRectangle(number, length);
        break;
      case 'square':
        result = await getSquare(number);
        break;

      default:
        break;
    }
    return result;
  } catch (err) {
    const errMessage = handleErrorMessage(err);
    console.log(errMessage);
  }
};
