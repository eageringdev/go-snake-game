import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

// import bootstrap
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// import store
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
