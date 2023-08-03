import { useEffect } from "react";

// import scss
import "./index.scss";

// import types
import { SnakeCardData } from "../../types";

// import redux
import store from "../../store";
import { connect } from "react-redux";
import { shiftFinishedCardAction } from "../../store/actions/SnakeCardActions";

// import constants
import { constant } from "../../constants";
import clone from "clone";

interface BidFinishProps {
  finishedCards: Array<SnakeCardData> | undefined;
  shiftFinishedCardAction: (currentCardId: string) => void;
}

const BidFinish = ({
  finishedCards,
  shiftFinishedCardAction,
}: BidFinishProps) => {
  const currentCard: SnakeCardData | undefined =
    finishedCards != undefined && finishedCards.length > 0
      ? finishedCards[0]
      : undefined;
  const bids: Array<number> = currentCard?.bids || [];

  useEffect(() => {
    setTimeout(() => {
      if (currentCard) {
        shiftFinishedCardAction(currentCard.id);
      }
    }, constant.app.finishedBidDuration);
  }, [currentCard]);

  return (
    <>
      {currentCard ? (
        <div className="bid-finish-container">
          <div className="bid-finish-modal">
            <div>Bidding finished!!!</div>
            <div className="mt-2 mt-md-4">
              Snake highest bid was{" "}
              <span className="fw-bold">
                {bids.length > 0 ? Math.max(...bids) : 0}
              </span>
            </div>
            <div className="mt-2 mt-md-4">
              The second to last highest bid was{" "}
              <span className="fw-bold">
                {bids.length > 1 ? clone(bids).sort()[bids.length - 2] : 0}
              </span>
            </div>
            <div className="mt-2 mt-md-4">
              Congratulations to the lucky winner of snake id{" "}
              <span className="fw-bold">{currentCard.id}!</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  finishedCards: state.snakeCards.finishedSnakeCards,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  shiftFinishedCardAction: (currentCardId: string) =>
    dispatch(shiftFinishedCardAction(currentCardId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BidFinish);
