import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnnecdote } from '../reducers/anecdoteReducer';
import anecdotesServices from '../services/anecdotes';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.annecdote.value;
    event.target.annecdote.value = '';
    const newAnecdote = await anecdotesServices.createNew(content);
    dispatch(createAnnecdote(newAnecdote));
  };

  return (
    <form onSubmit={addAnnecdote}>
      <input name="annecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
