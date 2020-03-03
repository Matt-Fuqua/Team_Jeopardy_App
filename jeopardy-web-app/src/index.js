import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
import './index.css';
import "./styles.scss";
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { compose, createStore } from "redux";
// import reducers from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers());

ReactDOM.render(
// <Provider store={store}>
  <App />,
// </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
