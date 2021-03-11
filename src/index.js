import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
