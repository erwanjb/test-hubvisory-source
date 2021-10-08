import { GameOverEnum } from './enum';

interface Auth {
  active: object | null;
}
const initialState: Auth = { active: null };

const activeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GameOverEnum.SET_GAME_OVER:
      return { active: { highScore: action.highScore, points: action.points } };
    case GameOverEnum.CLEAR_GAME_OVER:
      return { active: null };
    default:
      return { ...state };
  }
};

export default activeReducer;
