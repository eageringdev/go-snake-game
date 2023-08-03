import * as app from "./app";

export interface Constant {
  app: app.AppConstant;
}

export const constant: Constant = {
  app: app.appConstant,
};
