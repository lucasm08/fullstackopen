import anecdotesService from '../services/anecdotes';

const annecdoteReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case 'NEW_ANNECDOTE':
      return [...state, action.data];
    case 'INIT_ANNECDOTES':
      return action.data;
    case 'VOTE_ANNECDOTE': {
      return state.map((annecdote) =>
        annecdote.id !== action.data.id ? annecdote : action.data
      );
    }
    default:
      return state;
  }
};

export const createAnnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesService.createNew(content);
    dispatch({
      type: 'NEW_ANNECDOTE',
      data: newAnecdotes,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANNECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnnecdote = (data, id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(data, id);
    dispatch({
      type: 'VOTE_ANNECDOTE',
      data: updatedAnecdote,
    });
  };
};

export default annecdoteReducer;
