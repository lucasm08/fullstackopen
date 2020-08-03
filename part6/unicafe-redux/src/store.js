import { createStore, combineReducers, applyMiddleware } from 'redux';
import annecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: annecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
