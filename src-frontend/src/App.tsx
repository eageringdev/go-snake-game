import { useState, useEffect } from "react";

// import prop-types
import PropTypes from "prop-types";

// import types
import { SnakeCardData, SnakeCardUpdate } from "./types";

// import redux
import store from "./store";
import { connect } from "react-redux";
import {
  setAllSnakesAction,
  initializeAllBidsListAction,
  updateSnakeAction,
  setCurrentBiddingSnakeId,
} from "./store/actions/SnakeCardActions";

// import scss
import "./App.scss";

// import constants
import { constant } from "./constants";

// import websockets
import * as Websocket from "websocket";

// import utils
import { getAllSnakes, getAllSnakesBids } from "./utils/snakeCards";

// import layouts
import Header from "./layouts/Header";
import MainContent from "./layouts/MainContent";

// import components
import BidFinish from "./components/BidFinish";

let socketConnectTrying: boolean = false;

interface AppProps {
  setAllSnakesAction: (snakes: Array<SnakeCardData>) => void;
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) => void;
  updateSnakeAction: (snakeupdate: SnakeCardUpdate) => void;
  setCurrentBiddingSnakeId: (id: string) => void;
}

const App = ({
  setAllSnakesAction,
  initializeAllBidsListAction,
  updateSnakeAction,
  setCurrentBiddingSnakeId,
}: AppProps) => {
  const [socket, setSocket] = useState<Websocket.w3cwebsocket | null>(null);
  const [socketConnecting, setSocketConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!socketConnectTrying && !socketConnecting && !socket) {
      socketConnectTrying = true;
      initData();
      setSocketConnecting(true);
      initSocket();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const initData = () => {
    getAllSnakes()
      .then((res) => {
        setAllSnakesAction(res);
        getAllSnakesBids(res.map((e) => e.id))
          .then((allBidsList) => {
            initializeAllBidsListAction(allBidsList);
          })
          .catch((err) => {
            console.log("error while fetching all snakes bids data: ", err);
          });
      })
      .catch((err) => {
        console.log("error while fetching all snakes data: ", err);
      });
  };

  const initSocket = () => {
    const newSocket = new Websocket.w3cwebsocket(constant.app.socketRequestUrl);
    newSocket.onopen = () => {
      setSocketConnecting(false);
      console.log("Socket Connected!");
      setError("");
      setSocket(newSocket);
      socketConnectTrying = false;

      newSocket.onclose = () => {
        console.log("Socket is Closed!!!");
        setError("Socket is Closed!!!");
        setSocket(null);
      };
      newSocket.onmessage = (msg: Websocket.IMessageEvent) => {
        const data: SnakeCardUpdate = JSON.parse(msg.data.toString());
        console.log(data);
        updateSnakeAction(data);
        if (data.stage == 1 && data.bid > 0) {
          setCurrentBiddingSnakeId(data.id);
        } else {
          setCurrentBiddingSnakeId("");
        }
      };
    };

    newSocket.onerror = () => {
      setSocketConnecting(false);
      console.log("Socket Connection Error!!!");
      setError("Socket Connection Error!!!");
      setSocket(null);
      socketConnectTrying = true;
    };
  };

  const onRetry = () => {
    socketConnectTrying = true;
    setSocketConnecting(true);
    initData();
    initSocket();
  };

  return (
    <div className="App">
      <Header />
      {error.length > 0 ? (
        <div className="text-center">
          <h4 className="text-white">{error}</h4>
          <button
            onClick={onRetry}
            className={
              "btn btn-warning mt-2 w-25 fw-bold " +
              (socketConnecting ? "disabled" : "")
            }
          >
            {socketConnecting ? (
              <div className="text-center">
                <div className="spinner-border spinner-border-sm"></div>
              </div>
            ) : (
              "Retry"
            )}
          </button>
        </div>
      ) : (
        <>
          <MainContent />
          <BidFinish />
        </>
      )}
    </div>
  );
};

// prop-types
App.propTypes = {
  setAllSnakesAction: PropTypes.func.isRequired,
  initializeAllBidsListAction: PropTypes.func.isRequired,
  updateSnakeAction: PropTypes.func.isRequired,
  setCurrentBiddingSnakeId: PropTypes.func.isRequired,
};

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({});
const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setAllSnakesAction: (snakes: Array<SnakeCardData>) =>
    dispatch(setAllSnakesAction(snakes)),
  initializeAllBidsListAction: (allBidsList: Array<Array<number>>) =>
    dispatch(initializeAllBidsListAction(allBidsList)),
  updateSnakeAction: (snakeUpdate: SnakeCardUpdate) =>
    dispatch(updateSnakeAction(snakeUpdate)),
  setCurrentBiddingSnakeId: (id: string) =>
    dispatch(setCurrentBiddingSnakeId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
