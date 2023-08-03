// reducer actions
export const SET_ALL_SNAKES: string = "SET_ALL_SNAKES";
export const UPDATE_SNAKE: string = "UPDATE_SNAKE";
export const INITIALIZE_ALL_BIDS_LIST: string = "INITIALIZE_ALL_BIDS_LIST";
export const SHIFT_FINISHED_CARD: string = "SHIFT_FINISHED_CARD";
export const SET_CURRENT_BIDDING_SNAKE_ID: string =
  "SET_CURRENT_BIDDING_SNAKE_ID";

// types
export interface StoreAction {
  type: string;
  payload: any;
}
