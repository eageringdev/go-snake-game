import { combineReducers } from "redux";

//import reducers
import SnakeCardReducer, { SnakeCardState } from "./SnakeCardReducer";

export interface AppState {
  snakeCards: SnakeCardState;
}

export default combineReducers({
  snakeCards: SnakeCardReducer,
});
