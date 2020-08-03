import { createStore } from 'redux';
import annecdoteReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(annecdoteReducer, composeWithDevTools());

export default store;
