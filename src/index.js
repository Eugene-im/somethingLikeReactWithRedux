import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

let renderApp = (state) => {
  // debugger;
  ReactDOM.render(
    <App2
      state={state}
      store={store}
      dispatch={store.dispatch.bind(store)}
    />,
    document.getElementById("root")
  );
};

renderApp(store.getState());
store.subscribe(() => {
  let state = store.getState();
  renderApp(state);
});


reportWebVitals();
