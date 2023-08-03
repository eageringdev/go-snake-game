import {
  SET_ALL_SNAKES,
  UPDATE_SNAKE,
  INITIALIZE_ALL_BIDS_LIST,
  SHIFT_FINISHED_CARD,
  SET_CURRENT_BIDDING_SNAKE_ID,
  StoreAction,
} from "../types";

// import utils
import clone from "clone";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../../types";

export interface SnakeCardState {
  cardsData: Array<SnakeCardData>;
  finishedSnakeCards: Array<SnakeCardData>;
  currentBiddingSnakeId: string;
}

const initialState: SnakeCardState = {
  cardsData: [],
  finishedSnakeCards: [],
  currentBiddingSnakeId: "",
};

const SnakeCardReducer: (
  state: SnakeCardState,
  action: StoreAction
) => SnakeCardState = (
  state: SnakeCardState = initialState,
  action: StoreAction
) => {
  switch (action.type) {
    case SET_ALL_SNAKES: {
      return {
        ...state,
        cardsData: clone(action.payload),
      };
    }
    case UPDATE_SNAKE: {
      const updatePayload: SnakeCardUpdate = action.payload;
      let foundIndex = state.cardsData.findIndex(
        (e) => e.id === updatePayload.id
      );

      let newCardsData: Array<SnakeCardData> = clone(state.cardsData);
      // stage 1
      if (updatePayload.stage === 1) {
        // case: bid in stage 1
        if (foundIndex >= 0) {
          newCardsData[foundIndex].stage = 1;
          newCardsData[foundIndex].bids.push(updatePayload.bid);
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
        // case: move from stage 3 to newly created stage 1
        else {
          let previousId: string = updatePayload.previousId;
          let previousIndex = newCardsData.findIndex(
            (e) => e.id === previousId
          );
          let newFinishedSnakeCards: Array<SnakeCardData> = clone(
            state.finishedSnakeCards
          );
          if (previousIndex >= 0) {
            let previousCard: SnakeCardData = clone(
              newCardsData[previousIndex]
            );
            newFinishedSnakeCards.push(previousCard);
            newCardsData.splice(previousIndex, 1, {
              id: updatePayload.id,
              stage: 1,
              bids: [],
              hasInitialized: true,
            });
          }
          return {
            ...state,
            finishedSnakeCards: newFinishedSnakeCards,
            cardsData: newCardsData,
          };
        }
      }
      // stage 2
      else if (updatePayload.stage === 2) {
        //case: move from stage 1 to stage 2
        if (updatePayload.bid === 0) {
          if (foundIndex >= 0) {
            newCardsData[foundIndex].stage = updatePayload.stage;
          }
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
        // case: withdraw bid in stage 2
        else {
          if (foundIndex >= 0) {
            newCardsData[foundIndex].stage = updatePayload.stage;
            let bidFoundIndex = newCardsData[foundIndex].bids.findIndex(
              (e) => e === updatePayload.bid
            );
            if (bidFoundIndex >= 0) {
              newCardsData[foundIndex].bids = clone(
                newCardsData[foundIndex].bids
              );
              newCardsData[foundIndex].bids[bidFoundIndex] = 0;
            }
          }
          return {
            ...state,
            cardsData: newCardsData,
          };
        }
      }
      // stage 3
      else if (updatePayload.stage === 3) {
        if (foundIndex < 0) {
          return { ...state };
        }
        // case: move from stage 2 to stage 3
        newCardsData[foundIndex].stage = 3;
        return {
          ...state,
          cardsData: newCardsData,
        };
      } else {
        return { ...state };
      }
    }
    case INITIALIZE_ALL_BIDS_LIST: {
      return {
        currentBiddingSnakeId: "",
        finishedSnakeCards: [],
        cardsData: state.cardsData.map((card, index) => ({
          id: card.id,
          stage: card.stage,
          bids: clone(action.payload[index]),
          hasInitialized: true,
        })),
      };
    }
    case SHIFT_FINISHED_CARD: {
      let newFinishedSnakeCards: Array<SnakeCardData> = clone(
        state.finishedSnakeCards
      );
      let foundIndex = newFinishedSnakeCards.findIndex(
        (e) => e.id === action.payload
      );
      if (foundIndex >= 0) {
        newFinishedSnakeCards.splice(foundIndex, 1);
        return {
          ...state,
          finishedSnakeCards: newFinishedSnakeCards,
        };
      } else {
        return { ...state };
      }
    }
    case SET_CURRENT_BIDDING_SNAKE_ID: {
      return {
        ...state,
        currentBiddingSnakeId: action.payload,
      };
    }
    default:
      return initialState;
  }
};

export default SnakeCardReducer;
