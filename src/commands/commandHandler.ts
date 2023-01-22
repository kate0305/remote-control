import { getDown, getLeft, getPosition, getRight, getUp } from './mouseHandler.js';
import { parseCommand } from '../utils.js';

export const commandHandler = async (data: string): Promise<string> => {
  const { cmd, direction, number } = parseCommand(data);
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
    default:
      break;
  }
  return result;
};
