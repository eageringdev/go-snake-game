export interface AppConstant {
  userName: string;
  socketRequestUrl: string;
  apiUrl: string;
  finishedBidDuration: number;
}

export const appConstant: AppConstant = {
  userName: "Arnold Wang",
  socketRequestUrl: "ws://localhost:8080/api/updates",
  apiUrl: "http://localhost:8080/api/",
  finishedBidDuration: 2000,
};
