import { createStore, combineReducers } from 'redux';
import annecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: annecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
