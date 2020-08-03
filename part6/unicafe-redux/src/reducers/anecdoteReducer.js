const annecdoteReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case 'NEW_ANNECDOTE':
      return [...state, action.data];
    case 'INIT_ANNECDOTES':
      return action.data;
    case 'VOTE_ANNECDOTE': {
      const id = action.data.id;
      const annecdoteToChange = state.find((a) => a.id === id);
      const changedAnnecdote = {
        ...annecdoteToChange,
        votes: annecdoteToChange.votes + 1,
      };
      return state.map((annecdote) =>
        annecdote.id !== id ? annecdote : changedAnnecdote
      );
    }
    default:
      return state;
  }
};

export const createAnnecdote = (data) => {
  return {
    type: 'NEW_ANNECDOTE',
    data: data,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANNECDOTES',
    data: anecdotes,
  };
};

export const voteAnnecdote = (id) => {
  return {
    type: 'VOTE_ANNECDOTE',
    data: { id },
  };
};

export default annecdoteReducer;
