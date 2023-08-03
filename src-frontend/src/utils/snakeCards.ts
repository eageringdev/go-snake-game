import axios from "axios";

// import types
import { SnakeCardData, SnakeCardUpdate } from "../types";

// import constants
import { constant } from "../constants";

const getAllSnakes: () => Promise<Array<SnakeCardData>> = () => {
  return new Promise<Array<SnakeCardData>>((resolve, reject) => {
    axios
      .get<Array<SnakeCardUpdate>>(constant.app.apiUrl + "snakes")
      .then((res) => {
        resolve(
          res.data.map((e) => ({
            id: e.id,
            stage: e.stage,
            bids: [],
            hasInitialized: false,
          }))
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllSnakesBids: (
  idList: Array<string>
) => Promise<Array<Array<number>>> = (idList) => {
  let promises: Promise<Array<number>>[] = [];
  for (let i = 0; i < idList.length; i++) {
    const id = idList[i];
    promises.push(
      new Promise<Array<number>>((resolve, reject) => {
        axios
          .get<Array<number>>(constant.app.apiUrl + `bids?snake-id=${id}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      })
    );
  }
  return Promise.all(promises);
};

const getSnakeTVL: (bids: Array<number>) => number = (bids) => {
  return bids.reduce((sum, cur) => sum + cur, 0);
};

const getHighestBid: (bids: Array<number>) => number = (bids) => {
  if (bids.length === 0) {
    return 0;
  } else {
    return Math.max(...bids);
  }
};

export { getAllSnakes, getAllSnakesBids, getSnakeTVL, getHighestBid };
