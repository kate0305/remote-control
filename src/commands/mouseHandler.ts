import { left, right, up, down, mouse } from '@nut-tree/nut-js';
import { MouseCommandHandler, MousePositionHandler } from '../types.js';

export const getLeft: MouseCommandHandler = (number) => {
  return mouse.move(left(number));
};

export const getRight: MouseCommandHandler = (number) => {
  return mouse.move(right(number));
};

export const getUp: MouseCommandHandler = (number) => {
  return mouse.move(up(number));
};

export const getDown: MouseCommandHandler = (number) => {
  return mouse.move(down(number));
};

export const getPosition: MousePositionHandler = async () => {
 const position = await mouse.getPosition();
 return `mouse_position ${position.x},${position.y}`;
};
