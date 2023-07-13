import { WebSocket } from 'ws';
import {
  UserInRoom,
  ShipsDataReq,
  AttackDataReq,
  UserDataForGame,
  Room,
  ShipsPosition,
  RandomAttackReq,
} from '../utils/types.js';

const games = new Map<number, UserDataForGame[]>();
const dataUserAttack = new Map<number, AttackInfo>();

type AttackInfo = {
  position: ShipsPosition;
  status: string | undefined;
};

export const createGame = (room: Room) => {
  const idGame = Date.now();
  room.roomUsers.forEach((user) => {
    const game = createGameResponse(room?.roomUsers, user.index, idGame);
    user.ws.send(JSON.stringify(game));
    console.log(`Response: ${JSON.stringify(game)}`);
  });
};

const createGameResponse = (roomUsers: UserInRoom[], userId: number, idGame: number) => {
  const usersForAnswer = roomUsers.find((user) => user.index == userId);

  const data = {
    idGame: idGame,
    idPlayer: usersForAnswer?.index,
  };

  const dataAnswer = JSON.stringify(data);
  const answer = {
    type: 'create_game',
    data: dataAnswer,
    id: 0,
  };
  return answer;
};

export const addShips = (data: ShipsDataReq, ws: WebSocket) => {
  const currentGame = games.get(data.gameId);

  if (currentGame) {
    currentGame.push({ userId: data.indexPlayer, ws: ws, userShips: data.ships, isTurn: false });
  } else {
    games.set(data.gameId, [{ userId: data.indexPlayer, ws: ws, userShips: data.ships, isTurn: true }]);
  }
  const readyForGame = currentGame?.length === 2;
  if (readyForGame) startGame(currentGame);
};

const startGame = (game: UserDataForGame[]) => {
  const usersWs = game?.map((user) => user.ws);

  usersWs?.forEach((ws) => {
    const users = game?.find((user) => user.ws === ws);
    const dataAnswer = JSON.stringify({
      ships: users?.userShips,
      currentPlayerIndex: users?.userId,
    });

    const answer = {
      type: 'start_game',
      data: dataAnswer,
      id: 0,
    };
    ws.send(JSON.stringify(answer));
    console.log(`Response: ${JSON.stringify(answer)}`);
  });

  setTurn(game, usersWs);
};

export const getAttackData = (data: AttackDataReq, ws: WebSocket, type: string) => {
  if (type === 'randomAttack') {
    handleRandomAttack(data, ws);
  }
  const game = games.get(data.gameId);
  const user = game?.find((user) => user.userId !== data.indexPlayer);
  const ships = user?.userShips.map((ship) => ship.position);
  const info: AttackInfo = {
    position: {
      x: data.x,
      y: data.y,
    },
    status: '',
  };
  dataUserAttack.set(data.indexPlayer, info);
  attackResponse(data.indexPlayer, ws);
  // console.log('attackResponse', attackResponse(data.indexPlayer, ws));
};

const attackResponse = (id: number, ws: WebSocket) => {
  const data = dataUserAttack.get(id);
  const dataAnswer = JSON.stringify({
    position: data?.position,
    currentPlayer: id,
    status: data?.status,
  });

  const answer = {
    type: 'attack',
    data: dataAnswer,
    id: 0,
  };
  console.log(answer);
  ws.send(JSON.stringify(answer));
  console.log(`Response: ${JSON.stringify(answer)}`);
};

const setTurn = (game: UserDataForGame[], users: WebSocket[]) => {
  const userWhoseTurnId = game?.find((user) => user.isTurn === true);
  const dataTurn = JSON.stringify({ currentPlayer: userWhoseTurnId?.userId });
  const answerTurn = {
    type: 'turn',
    data: dataTurn,
    id: 0,
  };
  users?.forEach((ws) => ws.send(JSON.stringify(answerTurn)));
};

export const handleRandomAttack = (data: RandomAttackReq, ws: WebSocket) => {
  const getPosition = () => Math.floor(Math.random() * 9);
  const info: AttackInfo = {
    position: {
      x: getPosition(),
      y: getPosition(),
    },
    status: '',
  };
  dataUserAttack.set(data.indexPlayer, info);
  attackResponse(data.indexPlayer, ws);
};
