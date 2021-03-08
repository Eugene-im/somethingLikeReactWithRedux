import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
