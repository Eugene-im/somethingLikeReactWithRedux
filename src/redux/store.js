import {combineReducers, createStore} from 'redux';
import matrixReducer from './matrixReducer';

let reducers = combineReducers({matrixPage:matrixReducer})

let store = createStore(reducers);

export default store;