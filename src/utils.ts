export const parseCommand = (data: string) => {
  const cmdParts = data.split(' ');
  const cmd = cmdParts[0];
  const direction = cmdParts[0].split('_')[1];
  const number: number = +cmdParts[1];
  return { cmd, direction, number };
};
