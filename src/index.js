import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

let renderApp = (state)=>{
  // debugger;
  ReactDOM.render(
    <React.StrictMode>
    <App store={state} dispatch={store.dispatch}/>
  </React.StrictMode>,
  document.getElementById('root')
  );
}

renderApp(store);
store.subscribe(renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
