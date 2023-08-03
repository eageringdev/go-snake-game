import {
  SET_ALL_SNAKES,
  UPDATE_SNAKE,
  INITIALIZE_ALL_BIDS_LIST,
  SHIFT_FINISHED_CARD,
  SET_CURRENT_BIDDING_SNAKE_ID,
  StoreAction,
} from "../types";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../../types";

export const setAllSnakesAction: (
  snakes: Array<SnakeCardData>
) => StoreAction = (snakes) => {
  return {
    payload: snakes,
    type: SET_ALL_SNAKES,
  };
};

export const initializeAllBidsListAction: (
  allBidsList: Array<Array<number>>
) => StoreAction = (allBidsList) => {
  return {
    payload: allBidsList,
    type: INITIALIZE_ALL_BIDS_LIST,
  };
};

export const updateSnakeAction: (
  snakeUpdate: SnakeCardUpdate
) => StoreAction = (snakeUpdate) => {
  return {
    payload: snakeUpdate,
    type: UPDATE_SNAKE,
  };
};

export const shiftFinishedCardAction: (currentCardId: string) => StoreAction = (
  currentCardId
) => {
  return {
    payload: currentCardId,
    type: SHIFT_FINISHED_CARD,
  };
};

export const setCurrentBiddingSnakeId: (id: string) => StoreAction = (id) => {
  return {
    payload: id,
    type: SET_CURRENT_BIDDING_SNAKE_ID,
  };
};
