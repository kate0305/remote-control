export const parseCommand = (data: string) => {
  const cmdParts = data.split(' ');
  console.log(cmdParts);
  const cmd = cmdParts[0];
  const direction = cmdParts[0].split('_')[1];
  console.log(direction);
  const number: number = +cmdParts[1];
  const length: number = +cmdParts[2];
  return { cmd, direction, number, length };
};

export const handleErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return String(err);
};
