import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import Notifcation from './Notifcation';
import lodash from 'lodash';

const Annecdote = ({ annecdote, handleClick }) => {
  return (
    <div>
      {annecdote.content} <br />
      has {annecdote.votes} <button onClick={handleClick}>vote</button>
    </div>
  );
};

const AnnecdoteList = () => {
  const handleVote = (anecdote) => {
    dispatch(voteAnnecdote(anecdote.id));
    const message = `you voted '${anecdote.content}'`;

    dispatch(notificationChange(message));
    setTimeout(() => {
      dispatch(notificationChange(''));
    }, 5000);
  };

  const dispatch = useDispatch();
  const annecdotes = useSelector((state) => state.anecdotes);
  return (
    <div>
      <Notifcation />
      {lodash.orderBy(annecdotes, ['votes'], ['desc']).map((annecdote) => (
        <Annecdote
          key={annecdote.id}
          annecdote={annecdote}
          handleClick={() => handleVote(annecdote)}
        />
      ))}
    </div>
  );
};

export default AnnecdoteList;
