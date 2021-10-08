import { GameOverEnum } from './enum';

export const setGameOver = (points, highScore) => {
  return {
    type: GameOverEnum.SET_GAME_OVER,
    points,
    highScore,
  };
};

export const clearGameOver = () => {
  return {
    type: GameOverEnum.CLEAR_GAME_OVER,
  };
};
