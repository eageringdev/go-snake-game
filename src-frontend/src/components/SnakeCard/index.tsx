// import scss
import "./index.scss";

// import redux
import store from "../../store";
import { connect } from "react-redux";

// import utils
import { getHighestBid, getSnakeTVL } from "../../utils/snakeCards";

interface SnakeCardProps {
  id: string;
  stage: number;
  bids: Array<number>;
  hasInitialized: boolean;
  currentBiddingSnakeId: string;
}

const SnakeCard = ({
  id,
  stage,
  bids,
  hasInitialized,
  currentBiddingSnakeId,
}: SnakeCardProps) => {
  return (
    <>
      {currentBiddingSnakeId === id ? (
        <div className="selected-snake-container">
          <div className="snake-card ms-2">
            <div className="snake-card-avatar">Picture of a snake Here</div>
            <div className="snake-card-content">
              <div className="mt-2">{id}</div>
              {!hasInitialized && (
                <div className="mt-3 text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
              {hasInitialized && (
                <>
                  <div className="mt-2">{getSnakeTVL(bids)}</div>
                  <div className="mt-2">{getHighestBid(bids)}</div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="snake-card ms-2">
          <div className="snake-card-avatar">Picture of a snake Here</div>
          <div className="snake-card-content">
            <div className="mt-2">{id}</div>
            {!hasInitialized && (
              <div className="mt-3 text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            )}
            {hasInitialized && (
              <>
                <div className="mt-2">{getSnakeTVL(bids)}</div>
                <div className="mt-2">{getHighestBid(bids)}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  currentBiddingSnakeId: state.snakeCards.currentBiddingSnakeId,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SnakeCard);
