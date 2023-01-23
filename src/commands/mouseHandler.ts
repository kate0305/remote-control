import { left, right, up, down, mouse, Button } from '@nut-tree/nut-js';
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

export const getRectangle = async (width: number, length: number) => {
  mouse.config.mouseSpeed = 150;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(length));
  await mouse.move(down(width));
  await mouse.move(left(length));
  await mouse.move(up(width));
  await mouse.releaseButton(Button.LEFT);
  return `rectangle has width: ${width}px and length: ${length}px`;
};

export const getSquare = async (width: number) => {
  mouse.config.mouseSpeed = 150;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(width));
  await mouse.move(left(width));
  await mouse.move(up(width));
  await mouse.releaseButton(Button.LEFT);
  return `Square has width: ${width}px`;
};
