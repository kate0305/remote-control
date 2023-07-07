import { Data } from './types.js';

export const parseData = (data: string) => {
  if (!data) throw new Error('Data is empty');
  const dataParsed: Data = JSON.parse(data);
  const cmd = dataParsed.type;
  if (cmd === 'create_room') {
    return { cmd };
  } else {
    const dataNestedParsed = getParsedNestedDate(dataParsed.data);
    return { cmd, dataNestedParsed };
  }
};

export const handleErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return String(err);
};

const getParsedNestedDate = (data: string) => {
  if (!data) throw new Error('Data is empty');
  const dataParsed = JSON.parse(data);
  return dataParsed;
};



