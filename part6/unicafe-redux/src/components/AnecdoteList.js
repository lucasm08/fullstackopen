import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnnecdote } from '../reducers/anecdoteReducer';
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
  const dispatch = useDispatch();
  const annecdotes = useSelector((state) => state.anecdotes);
  return (
    <div>
      {lodash.orderBy(annecdotes, ['votes'], ['desc']).map((annecdote) => (
        <Annecdote
          key={annecdote.id}
          annecdote={annecdote}
          handleClick={() => dispatch(voteAnnecdote(annecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnnecdoteList;
