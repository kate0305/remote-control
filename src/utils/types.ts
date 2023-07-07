export type Data = {
  id: number;
  type: string;
  data: string;
};

export type RegReq = {
  name: string;
  password: string;
};

export type RegRes = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type UpdateWinRes = {
  name: string;
  wins: number;
};

export type AddToRoomReq = {
  indexRoom: number;
};

export type CreateGameRes = {
  idGame: number;
  idPlayer: number;
};

export type UpdateRoomRes = {
  roomId: number;
  roomUsers: {
    name: string;
    index: number;
  }[];
};

export type ShipsDataReq = {
  gameId: number;
  ships: Ships[];
  indexPlayer: number;
};

export type Ships = {
  position: ShipsPosition;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type ShipsPosition = {
  x: number,
  y: number,
};

export type AttackDataReq = {
  gameId: number,
  x: number,
  y: number,
  indexPlayer: number,
};

export type Res = {
  name: string;
  password: string;
};

export type DataTypes = {
  reg: RegReq;
  create_room: string;
  add_user_to_room: AddToRoomReq;
};

export type User  = {
  login: string;
  password: string;
}
