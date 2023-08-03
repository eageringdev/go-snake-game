// import scss
import "./index.scss";

// import prop-types

// import types
import { SnakeCardData } from "../../types";

// import redux
import store from "../../store";
import { connect } from "react-redux";

// import components
import SnakeCard from "../../components/SnakeCard";

// import utils
import clone from "clone";

interface MainContentProps {
  snakeCards: Array<SnakeCardData> | undefined;
  currentBiddingSnakeId: string;
}

const MainContent = ({
  snakeCards,
  currentBiddingSnakeId,
}: MainContentProps) => {
  let refinedCards: Array<SnakeCardData> = [];
  if (snakeCards) {
    refinedCards = clone(snakeCards);
    if (currentBiddingSnakeId && currentBiddingSnakeId.length > 0) {
      let foundIndex = snakeCards.findIndex(
        (e) => e.id == currentBiddingSnakeId
      );
      if (foundIndex >= 0) {
        let selectedCard: SnakeCardData = refinedCards.splice(foundIndex, 1)[0];
        refinedCards.splice(
          Math.floor(refinedCards.length / 2),
          0,
          selectedCard
        );
      }
    }
  }
  return (
    <div className="main-content">
      <div className="ms-auto"></div>
      {refinedCards.map((snakeCard) => (
        <SnakeCard key={snakeCard.id} {...snakeCard} />
      ))}
      <div className="me-auto"></div>
    </div>
  );
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  snakeCards: state.snakeCards.cardsData,
  currentBiddingSnakeId: state.snakeCards.currentBiddingSnakeId,
});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
